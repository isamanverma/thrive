import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

interface MealPlanRequest {
  startDate: string;
  diet?: string;
  intolerances?: string;
  targetCalories?: number;
  excludeIngredients?: string;
  includeIngredients?: string;
}

interface SpoonacularMealPlan {
  meals: Array<{
    id: number;
    imageType: string;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
  }>;
  nutrients: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
}

interface SpoonacularWeeklyMealPlan {
  week: {
    monday: SpoonacularMealPlan;
    tuesday: SpoonacularMealPlan;
    wednesday: SpoonacularMealPlan;
    thursday: SpoonacularMealPlan;
    friday: SpoonacularMealPlan;
    saturday: SpoonacularMealPlan;
    sunday: SpoonacularMealPlan;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: MealPlanRequest = await request.json();
    const {
      startDate,
      diet,
      intolerances,
      targetCalories,
      excludeIngredients,
      includeIngredients,
    } = body;

    if (!startDate) {
      return NextResponse.json(
        { error: "Start date is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.SPOONACULAR_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Spoonacular API key not configured" },
        { status: 500 },
      );
    }

    // Get user preferences from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { diet_preference: true },
    });

    // Build Spoonacular meal plan API URL
    const params = new URLSearchParams({
      apiKey,
      timeFrame: "week",
    });

    if (diet || (user && user.diet_preference)) {
      params.append("diet", diet || user!.diet_preference!);
    }
    if (intolerances) params.append("exclude", intolerances);
    if (targetCalories)
      params.append("targetCalories", targetCalories.toString());
    if (excludeIngredients)
      params.append("excludeIngredients", excludeIngredients);
    if (includeIngredients)
      params.append("includeIngredients", includeIngredients);

    const spoonacularUrl = `https://api.spoonacular.com/mealplanner/generate?${params.toString()}`;

    const response = await fetch(spoonacularUrl);

    if (!response.ok) {
      console.error(
        "Spoonacular API error:",
        response.status,
        response.statusText,
      );
      return NextResponse.json(
        { error: "Failed to generate meal plan from Spoonacular" },
        { status: response.status },
      );
    }

    const mealPlanData: SpoonacularWeeklyMealPlan = await response.json();

    // Calculate end date (7 days from start)
    const startDateObj = new Date(startDate);
    const endDate = new Date(startDateObj);
    endDate.setDate(endDate.getDate() + 6);

    // Resolve internal DB user ID for meal plan creation
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    if (!dbUser) {
      return NextResponse.json(
        {
          error:
            "User not found in database. Please complete onboarding first.",
        },
        { status: 404 },
      );
    }

    // Create meal plan in database
    const mealPlan = await prisma.mealPlan.create({
      data: {
        userId: dbUser.id,
        startDate: startDateObj,
        endDate: endDate,
        constraints: {
          diet,
          intolerances,
          targetCalories,
          excludeIngredients,
          includeIngredients,
        },
      },
    });

    // Collect all recipe IDs to fetch nutrition in bulk
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    const allRecipeIds: number[] = [];
    for (const dayName of days) {
      const dayMeals =
        mealPlanData.week[dayName as keyof typeof mealPlanData.week];
      if (dayMeals?.meals) {
        for (const meal of dayMeals.meals) {
          allRecipeIds.push(meal.id);
        }
      }
    }

    // Fetch per-recipe nutrition from Spoonacular in bulk
    const nutritionMap = new Map<number, unknown>();
    if (allRecipeIds.length > 0) {
      try {
        const bulkUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=${allRecipeIds.join(",")}&includeNutrition=true&apiKey=${apiKey}`;
        const bulkResponse = await fetch(bulkUrl);
        if (bulkResponse.ok) {
          const bulkData = await bulkResponse.json();
          for (const recipe of bulkData) {
            nutritionMap.set(recipe.id, recipe.nutrition || null);
          }
        }
      } catch (bulkError) {
        console.error("Error fetching bulk nutrition:", bulkError);
        // Continue without nutrition data
      }
    }

    // Transform and save meal plan items
    const mealPlanItems = [];

    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
      const dayName = days[dayIndex] as keyof typeof mealPlanData.week;
      const dayMeals = mealPlanData.week[dayName];

      if (dayMeals && dayMeals.meals) {
        // Spoonacular returns all meals for the day, we'll assign them to breakfast, lunch, dinner
        const mealTypes = ["breakfast", "lunch", "dinner"];

        for (
          let mealIndex = 0;
          mealIndex < Math.min(dayMeals.meals.length, 3);
          mealIndex++
        ) {
          const meal = dayMeals.meals[mealIndex];
          const mealType = mealTypes[mealIndex];

          const mealPlanItem = await prisma.mealPlanItem.create({
            data: {
              mealPlanId: mealPlan.id,
              sourceId: meal.id.toString(),
              dayOfWeek: dayIndex + 1, // 1-7 for Monday-Sunday
              mealType: mealType,
            },
          });

          mealPlanItems.push({
            ...mealPlanItem,
            recipe: {
              id: meal.id,
              title: meal.title,
              readyInMinutes: meal.readyInMinutes,
              servings: meal.servings,
              sourceUrl: meal.sourceUrl,
            },
          });

          // Cache recipe data for future use
          try {
            const recipeNutrition = nutritionMap.get(meal.id) || undefined;
            await prisma.recipe.upsert({
              where: { id: `spoonacular-${meal.id}` },
              update: {
                title: meal.title,
                totalTime: meal.readyInMinutes,
                servings: meal.servings,
                sourceId: meal.id.toString(),
                sourceType: "SPOONACULAR",
                nutrition: recipeNutrition as object | undefined,
                updatedAt: new Date(),
              },
              create: {
                id: `spoonacular-${meal.id}`,
                title: meal.title,
                totalTime: meal.readyInMinutes,
                servings: meal.servings,
                sourceId: meal.id.toString(),
                sourceType: "SPOONACULAR",
                nutrition: recipeNutrition as object | undefined,
                isPublic: true,
                savedCount: 0,
              },
            });
          } catch (cacheError) {
            console.error("Error caching meal plan recipe:", cacheError);
            // Continue without caching
          }
        }
      }
    }

    return NextResponse.json({
      id: mealPlan.id,
      startDate: mealPlan.startDate,
      endDate: mealPlan.endDate,
      constraints: mealPlan.constraints,
      items: mealPlanItems,
      nutrition: mealPlanData.week,
    });
  } catch (error) {
    console.error("Meal plan generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userInDb = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    if (!userInDb) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's meal plans
    const mealPlans = await prisma.mealPlan.findMany({
      where: { userId: userInDb.id },
      include: {
        mealPlanItems: {
          include: {
            cachedRecipe: {
              select: {
                sourceId: true,
                title: true,
                imageUrl: true,
                totalTime: true,
                servings: true,
              },
            },
          },
          orderBy: [{ dayOfWeek: "asc" }, { mealType: "asc" }],
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ mealPlans });
  } catch (error) {
    console.error("Get meal plans error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
