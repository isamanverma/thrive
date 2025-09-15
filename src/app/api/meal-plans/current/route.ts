import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from '@/lib/prisma';

interface MealItem {
  id: number;
  name: string;
  calories: number;
  image?: string;
  description?: string;
  nutrition?: unknown;
}

type _WeeklyMeals = Record<number, Record<string, MealItem>>;

// GET: Load current user's active meal plan
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get current week's meal plan (Monday to Sunday)
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    // Get Monday as start of week (0=Sunday, 1=Monday)
    const mondayOffset = currentDate.getDay() === 0 ? -6 : 1 - currentDate.getDay();
    startOfWeek.setDate(currentDate.getDate() + mondayOffset);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Try to find existing meal plan for current week
    let mealPlan = await prisma.mealPlan.findFirst({
      where: {
        userId: user.id,
        startDate: {
          lte: endOfWeek,
        },
        endDate: {
          gte: startOfWeek,
        },
      },
      include: {
        mealPlanItems: {
          include: {
            cachedRecipe: true,
          },
        },
      },
    });

    // If no meal plan exists, create an empty one
    if (!mealPlan) {
      mealPlan = await prisma.mealPlan.create({
        data: {
          userId: user.id,
          startDate: startOfWeek,
          endDate: endOfWeek,
        },
        include: {
          mealPlanItems: {
            include: {
              cachedRecipe: true,
            },
          },
        },
      });
    }

    // Transform to frontend format
    // Frontend uses 0=Monday, 1=Tuesday, ... 6=Sunday
    const weeklyMeals: Record<number, Record<string, MealItem>> = {};
    
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      weeklyMeals[dayIndex] = {};
    }

    mealPlan.mealPlanItems.forEach((item) => {
      // Database dayOfWeek: 1=Monday, 2=Tuesday, ... 7=Sunday  
      // Frontend dayIndex: 0=Monday, 1=Tuesday, ... 6=Sunday
      const dayIndex = item.dayOfWeek - 1; // Convert 1-7 to 0-6
      const mealType = item.mealType.toLowerCase();
      
      if (item.cachedRecipe && dayIndex >= 0 && dayIndex < 7) {
  const rawNutrition = item.cachedRecipe.nutrition as unknown | null;

        // Resolve calories from various nutrition shapes:
        // - { calories: number }
        // - { nutrients: [{ name: 'Calories', amount: number, unit: 'kcal' }, ...] }
        let calories = 0;
        if (rawNutrition && typeof rawNutrition === "object") {
          const rn = rawNutrition as { [k: string]: unknown };
          if (typeof rn.calories === "number") {
            calories = rn.calories as number;
          } else if (Array.isArray(rn.nutrients)) {
            const nutrients = rn.nutrients as unknown[];
            const found = nutrients.find((n) => {
              if (!n || typeof n !== "object") return false;
              const obj = n as { name?: unknown; amount?: unknown };
              return typeof obj.name === "string" && (obj.name as string).toLowerCase().includes("calorie") && typeof obj.amount === "number";
            });
            if (found) calories = (found as { amount: number }).amount;
          }
        }

        weeklyMeals[dayIndex][mealType] = {
          id: parseInt(item.cachedRecipe.sourceId || item.cachedRecipe.id),
          name: item.cachedRecipe.title,
          calories: Math.round(calories) || 0,
          image: item.cachedRecipe.imageUrl || item.cachedRecipe.fallbackImageUrl || "",
          description: item.cachedRecipe.description || "",
          nutrition: item.cachedRecipe.nutrition || undefined,
        };
      }
    });

    return NextResponse.json({
      mealPlanId: mealPlan.id,
      weeklyMeals,
      startDate: mealPlan.startDate,
      endDate: mealPlan.endDate,
    });
    
  } catch (error) {
    console.error("Error loading meal plan:", error);
    return NextResponse.json(
      { error: "Failed to load meal plan" },
      { status: 500 }
    );
  }
}

// POST: Save/update current user's meal plan state
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { weeklyMeals, startDate, endDate } = body;

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse dates - if not provided, calculate current week
    let mealPlanStartDate: Date;
    let mealPlanEndDate: Date;

    if (startDate && endDate) {
      mealPlanStartDate = new Date(startDate);
      mealPlanEndDate = new Date(endDate);
    } else {
      // Calculate current week (Monday to Sunday)
      const currentDate = new Date();
      mealPlanStartDate = new Date(currentDate);
      const mondayOffset = currentDate.getDay() === 0 ? -6 : 1 - currentDate.getDay();
      mealPlanStartDate.setDate(currentDate.getDate() + mondayOffset);
      mealPlanStartDate.setHours(0, 0, 0, 0);

      mealPlanEndDate = new Date(mealPlanStartDate);
      mealPlanEndDate.setDate(mealPlanStartDate.getDate() + 6);
      mealPlanEndDate.setHours(23, 59, 59, 999);
    }

    // Find or create meal plan for the current week
    let mealPlan = await prisma.mealPlan.findFirst({
      where: {
        userId: user.id,
        startDate: {
          lte: mealPlanEndDate,
        },
        endDate: {
          gte: mealPlanStartDate,
        },
      },
    });

    if (!mealPlan) {
      mealPlan = await prisma.mealPlan.create({
        data: {
          userId: user.id,
          startDate: mealPlanStartDate,
          endDate: mealPlanEndDate,
        },
      });
    }

    // Clear existing meal plan items for this week
    await prisma.mealPlanItem.deleteMany({
      where: {
        mealPlanId: mealPlan.id,
      },
    });

    // Create new meal plan items from weeklyMeals
    const mealPlanItems = [];
    
    for (const [dayIndexStr, dayMeals] of Object.entries(weeklyMeals)) {
      const dayIndex = parseInt(dayIndexStr);
      // Frontend dayIndex: 0=Monday, 1=Tuesday, ... 6=Sunday
      // Database dayOfWeek: 1=Monday, 2=Tuesday, ... 7=Sunday
      const dayOfWeek = dayIndex + 1; // Convert 0-6 to 1-7
      
      if (dayOfWeek < 1 || dayOfWeek > 7) continue; // Skip invalid days
      
      for (const [mealType, meal] of Object.entries(dayMeals as Record<string, MealItem>)) {
        if (meal && meal.id && meal.name) {
          // Try to find or create recipe in database
          let recipe = await prisma.recipe.findFirst({
            where: {
              OR: [
                { sourceId: meal.id.toString() },
                { id: meal.id.toString() },
              ],
            },
          });

          // If recipe doesn't exist, create it
          if (!recipe) {
            recipe = await prisma.recipe.create({
              data: {
                title: meal.name,
                description: meal.description || null,
                imageUrl: meal.image || null,
                sourceType: "EXTERNAL_API",
                sourceId: meal.id.toString(),
                nutrition: meal.calories ? { calories: meal.calories } : undefined,
                isPublic: true,
              },
            });
          }

          mealPlanItems.push({
            mealPlanId: mealPlan.id,
            dayOfWeek,
            mealType: mealType.toLowerCase(),
            cachedRecipeId: recipe.id,
            sourceId: meal.id.toString(),
          });
        }
      }
    }

    // Bulk create meal plan items
    if (mealPlanItems.length > 0) {
      await prisma.mealPlanItem.createMany({
        data: mealPlanItems,
      });
    }

    return NextResponse.json({
      success: true,
      mealPlanId: mealPlan.id,
      itemsCreated: mealPlanItems.length,
      weekRange: {
        startDate: mealPlan.startDate,
        endDate: mealPlan.endDate,
      },
    });
    
  } catch (error) {
    console.error("Error saving meal plan:", error);
    return NextResponse.json(
      { error: "Failed to save meal plan" },
      { status: 500 }
    );
  }
}