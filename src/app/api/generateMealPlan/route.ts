import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: MealPlanRequest = await request.json();
    const { startDate, diet, intolerances, targetCalories, excludeIngredients, includeIngredients } = body;

    if (!startDate) {
      return NextResponse.json(
        { error: 'Start date is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.SPOONACULAR_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Spoonacular API key not configured' },
        { status: 500 }
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
      timeFrame: 'week',
    });

    if (diet || (user && user.diet_preference)) {
      params.append('diet', diet || user!.diet_preference!);
    }
    if (intolerances) params.append('exclude', intolerances);
    if (targetCalories) params.append('targetCalories', targetCalories.toString());
    if (excludeIngredients) params.append('excludeIngredients', excludeIngredients);
    if (includeIngredients) params.append('includeIngredients', includeIngredients);

    const spoonacularUrl = `https://api.spoonacular.com/mealplanner/generate?${params.toString()}`;

    const response = await fetch(spoonacularUrl);
    
    if (!response.ok) {
      console.error('Spoonacular API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to generate meal plan from Spoonacular' },
        { status: response.status }
      );
    }

    const mealPlanData: SpoonacularWeeklyMealPlan = await response.json();

    // Calculate end date (7 days from start)
    const startDateObj = new Date(startDate);
    const endDate = new Date(startDateObj);
    endDate.setDate(endDate.getDate() + 6);

    // Create meal plan in database
    const mealPlan = await prisma.mealPlan.create({
      data: {
        userId: user ? await getUserIdFromClerkId(userId) : '',
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

    // Transform and save meal plan items
    const mealPlanItems = [];
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
      const dayName = days[dayIndex] as keyof typeof mealPlanData.week;
      const dayMeals = mealPlanData.week[dayName];
      
      if (dayMeals && dayMeals.meals) {
        // Spoonacular returns all meals for the day, we'll assign them to breakfast, lunch, dinner
        const mealTypes = ['breakfast', 'lunch', 'dinner'];
        
        for (let mealIndex = 0; mealIndex < Math.min(dayMeals.meals.length, 3); mealIndex++) {
          const meal = dayMeals.meals[mealIndex];
          const mealType = mealTypes[mealIndex];
          
          const mealPlanItem = await prisma.mealPlanItem.create({
            data: {
              mealPlanId: mealPlan.id,
              spoonacularId: meal.id,
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
            await prisma.recipe.upsert({
              where: { spoonacularId: meal.id },
              update: {
                title: meal.title,
                readyInMinutes: meal.readyInMinutes,
                servings: meal.servings,
                updatedAt: new Date(),
              },
              create: {
                spoonacularId: meal.id,
                title: meal.title,
                readyInMinutes: meal.readyInMinutes,
                servings: meal.servings,
                ingredients: [],
                instructions: [],
                cuisines: [],
                dishTypes: [],
                diets: [],
              },
            });
          } catch (cacheError) {
            console.error('Error caching meal plan recipe:', cacheError);
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
    console.error('Meal plan generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to get user ID from Clerk ID
async function getUserIdFromClerkId(clerkId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user.id;
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userInDb = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    if (!userInDb) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get user's meal plans
    const mealPlans = await prisma.mealPlan.findMany({
      where: { userId: userInDb.id },
      include: {
        mealPlanItems: {
          include: {
            cachedRecipe: {
              select: {
                spoonacularId: true,
                title: true,
                imageUrl: true,
                readyInMinutes: true,
                servings: true,
              },
            },
          },
          orderBy: [
            { dayOfWeek: 'asc' },
            { mealType: 'asc' },
          ],
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ mealPlans });

  } catch (error) {
    console.error('Get meal plans error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
