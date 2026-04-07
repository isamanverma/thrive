import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

interface DishPayload {
  recipeId: string;
  sourceId?: string;
  name: string;
  calories: number;
  image?: string;
  description?: string;
  quantity: number;
  unit: string;
  nutrition?: unknown;
}

interface MealItem {
  id: number;
  name: string;
  calories: number;
  image?: string;
  description?: string;
  nutrition?: unknown;
  dishes?: DishPayload[];
}

type _WeeklyMeals = Record<number, Record<string, MealItem>>;

function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function resolveCalories(nutrition: unknown): number {
  if (!nutrition || typeof nutrition !== "object") return 0;
  const rn = nutrition as { [k: string]: unknown };
  if (typeof rn.calories === "number") return rn.calories as number;
  if (Array.isArray(rn.nutrients)) {
    const found = (rn.nutrients as unknown[]).find((n) => {
      if (!n || typeof n !== "object") return false;
      const obj = n as { name?: unknown; amount?: unknown };
      return (
        typeof obj.name === "string" &&
        (obj.name as string).toLowerCase().includes("calorie") &&
        typeof obj.amount === "number"
      );
    });
    if (found) return (found as { amount: number }).amount;
  }
  return 0;
}

// GET: Load current user's active meal plan
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
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

    // Allow the client to request a specific week via ?date=YYYY-MM-DD
    const url = new URL(request.url);
    const dateParam = url.searchParams.get("date");
    const currentDate = dateParam ? parseDate(dateParam) : new Date();
    const weekStartDay = Number(url.searchParams.get("weekStartDay") ?? 1) || 1;

    // Get week range for the target date based on user's weekStartDay
    const startOfWeek = new Date(currentDate);
    const offset = (currentDate.getDay() - weekStartDay + 7) % 7;
    startOfWeek.setDate(currentDate.getDate() - offset);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Try to find existing meal plan for current week
    let mealPlan = await prisma.mealPlan.findFirst({
      where: {
        userId: user.id,
        startDate: { lte: endOfWeek },
        endDate: { gte: startOfWeek },
      },
      include: {
        mealPlanItems: {
          include: {
            cachedRecipe: true,
            dishes: {
              include: { recipe: true },
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });

    // If found, return cached data immediately without transformation delays
    if (mealPlan) {
      const weeklyMeals: Record<number, Record<string, MealItem>> = {};

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        weeklyMeals[dayIndex] = {};
      }

      mealPlan.mealPlanItems.forEach((item) => {
        const dayIndex = item.dayOfWeek - 1;
        const mealType = item.mealType.toLowerCase();

        if (dayIndex < 0 || dayIndex >= 7) return;

        const dishes: DishPayload[] = item.dishes.map((dish) => {
          const calories = resolveCalories(dish.recipe.nutrition);
          return {
            recipeId: dish.recipeId,
            sourceId: dish.recipe.sourceId || undefined,
            name: dish.recipe.title,
            calories: Math.round(calories * dish.quantity) || 0,
            image: dish.recipe.imageUrl || dish.recipe.fallbackImageUrl || "",
            description: dish.recipe.description || "",
            quantity: dish.quantity,
            unit: dish.unit,
            nutrition: dish.recipe.nutrition || undefined,
          };
        });

        if (dishes.length === 0 && item.cachedRecipe) {
          const calories = resolveCalories(item.cachedRecipe.nutrition);
          dishes.push({
            recipeId: item.cachedRecipe.id,
            sourceId: item.cachedRecipe.sourceId || undefined,
            name: item.cachedRecipe.title,
            calories: Math.round(calories) || 0,
            image:
              item.cachedRecipe.imageUrl ||
              item.cachedRecipe.fallbackImageUrl ||
              "",
            description: item.cachedRecipe.description || "",
            quantity: 1,
            unit: "serving",
            nutrition: item.cachedRecipe.nutrition || undefined,
          });
        }

        const totalCalories = dishes.reduce(
          (sum, d) => sum + (d.calories || 0),
          0,
        );
        const firstName = dishes[0]?.name || "";
        const firstImage = dishes[0]?.image || "";

        weeklyMeals[dayIndex][mealType] = {
          id: parseInt(item.cachedRecipe?.sourceId || item.id),
          name:
            dishes.length > 1
              ? `${firstName} +${dishes.length - 1}`
              : firstName,
          calories: totalCalories,
          image: firstImage,
          description: dishes[0]?.description || "",
          dishes,
        };
      });

      return NextResponse.json({
        mealPlanId: mealPlan.id,
        weeklyMeals,
        startDate: mealPlan.startDate,
        endDate: mealPlan.endDate,
      });
    }

    // If no meal plan exists, create an empty one and return
    if (!mealPlan) {
      await prisma.mealPlan.create({
        data: {
          userId: user.id,
          startDate: startOfWeek,
          endDate: endOfWeek,
        },
      });
      return NextResponse.json({
        mealPlanId: null,
        weeklyMeals: {},
        startDate: startOfWeek.toISOString(),
        endDate: endOfWeek.toISOString(),
      });
    }
  } catch (error) {
    console.error("Error loading meal plan:", error);
    return NextResponse.json(
      { error: "Failed to load meal plan" },
      { status: 500 },
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

    // Parse dates
    let mealPlanStartDate: Date;
    let mealPlanEndDate: Date;

    if (startDate && endDate) {
      mealPlanStartDate = new Date(startDate);
      mealPlanEndDate = new Date(endDate);
    } else {
      const currentDate = new Date();
      mealPlanStartDate = new Date(currentDate);
      const mondayOffset =
        currentDate.getDay() === 0 ? -6 : 1 - currentDate.getDay();
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
        startDate: { lte: mealPlanEndDate },
        endDate: { gte: mealPlanStartDate },
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

    const safeWeeklyMeals = weeklyMeals || {};
    const hasAnyMeals = Object.values(safeWeeklyMeals).some(
      (day) => day && Object.keys(day as Record<string, unknown>).length > 0,
    );

    if (hasAnyMeals) {
      // Delete existing dishes first, then items
      const existingItems = await prisma.mealPlanItem.findMany({
        where: { mealPlanId: mealPlan.id },
        select: { id: true },
      });
      if (existingItems.length > 0) {
        await prisma.mealDish.deleteMany({
          where: { mealPlanItemId: { in: existingItems.map((i) => i.id) } },
        });
      }
      await prisma.mealPlanItem.deleteMany({
        where: { mealPlanId: mealPlan.id },
      });
    }

    // Create new meal plan items from weeklyMeals
    for (const [dayIndexStr, dayMeals] of Object.entries(safeWeeklyMeals)) {
      const dayIndex = parseInt(dayIndexStr);
      const dayOfWeek = dayIndex + 1;

      if (dayOfWeek < 1 || dayOfWeek > 7) continue;

      for (const [mealType, meal] of Object.entries(
        dayMeals as Record<string, MealItem>,
      )) {
        if (!meal || !meal.name) continue;

        // Find or create a recipe for the slot's primary reference
        let recipe = await prisma.recipe.findFirst({
          where: {
            OR: [
              { sourceId: meal.id?.toString() },
              { id: meal.id?.toString() },
            ],
          },
        });

        if (!recipe && meal.name) {
          recipe = await prisma.recipe.create({
            data: {
              title: meal.name,
              description: meal.description || null,
              imageUrl: meal.image || null,
              sourceType: "EXTERNAL_API",
              sourceId: meal.id?.toString() || null,
              nutrition:
                (meal.nutrition as object) ||
                (meal.calories ? { calories: meal.calories } : undefined),
              isPublic: true,
            },
          });
        }

        if (!recipe) continue;

        // Create the MealPlanItem
        const mealPlanItem = await prisma.mealPlanItem.create({
          data: {
            mealPlanId: mealPlan.id,
            dayOfWeek,
            mealType: mealType.toLowerCase(),
            cachedRecipeId: recipe.id,
            sourceId: meal.id?.toString() || null,
          },
        });

        // Create dishes if provided
        const dishes = meal.dishes || [];
        if (dishes.length > 0) {
          for (let i = 0; i < dishes.length; i++) {
            const dish = dishes[i];
            // Find or create recipe for dish
            let dishRecipe = await prisma.recipe.findFirst({
              where: {
                OR: [{ sourceId: dish.recipeId }, { id: dish.recipeId }],
              },
            });

            if (!dishRecipe) {
              dishRecipe = await prisma.recipe.create({
                data: {
                  title: dish.name,
                  description: dish.description || null,
                  imageUrl: dish.image || null,
                  sourceType: "EXTERNAL_API",
                  sourceId: dish.recipeId,
                  nutrition:
                    (dish.nutrition as object) ||
                    (dish.calories ? { calories: dish.calories } : undefined),
                  isPublic: true,
                },
              });
            }

            await prisma.mealDish.create({
              data: {
                mealPlanItemId: mealPlanItem.id,
                recipeId: dishRecipe.id,
                quantity: dish.quantity || 1,
                unit: dish.unit || "serving",
                order: i,
              },
            });
          }
        } else {
          // No dishes array — create a single dish from the primary recipe
          await prisma.mealDish.create({
            data: {
              mealPlanItemId: mealPlanItem.id,
              recipeId: recipe.id,
              quantity: 1,
              unit: "serving",
              order: 0,
            },
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      mealPlanId: mealPlan.id,
      weekRange: {
        startDate: mealPlan.startDate,
        endDate: mealPlan.endDate,
      },
    });
  } catch (error) {
    console.error("Error saving meal plan:", error);
    return NextResponse.json(
      { error: "Failed to save meal plan" },
      { status: 500 },
    );
  }
}
