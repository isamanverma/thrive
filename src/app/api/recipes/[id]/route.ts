import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs/server';
import { logTelemetry } from '@/lib/telemetry';
import { prisma } from '@/lib/prisma';

interface SpoonacularRecipeDetail {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  extendedIngredients: Array<{
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
      us: {
        amount: number;
        unitShort: string;
        unitLong: string;
      };
      metric: {
        amount: number;
        unitShort: string;
        unitLong: string;
      };
    };
  }>;
  analyzedInstructions: Array<{
    name: string;
    steps: Array<{
      number: number;
      step: string;
      ingredients: Array<{
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }>;
      equipment: Array<{
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }>;
    }>;
  }>;
  nutrition?: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds: number;
    }>;
  };
}

// Helper function to transform Spoonacular ingredients to detailed records
function transformIngredients(extendedIngredients: SpoonacularRecipeDetail['extendedIngredients']) {
  return extendedIngredients.map(ingredient => ({
    ingredientId: ingredient.id,
    name: ingredient.name,
    amount: ingredient.amount,
    unit: ingredient.unit,
    original: ingredient.original,
    image: ingredient.image, // Store the image filename
  }));
}

// Helper function to transform Spoonacular instructions to string array  
function transformInstructions(analyzedInstructions: SpoonacularRecipeDetail['analyzedInstructions']): string[] {
  if (!analyzedInstructions || analyzedInstructions.length === 0) {
    return [];
  }
  
  const allSteps: string[] = [];
  analyzedInstructions.forEach(instruction => {
    instruction.steps.forEach(step => {
      allSteps.push(step.step);
    });
  });
  
  return allSteps;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Allow public access to recipes - authentication is optional
    const { userId } = await auth();
    console.log('Auth userId:', userId || 'Anonymous user');

    const { id } = await params;
    const recipeId = id;
    
    if (!recipeId || isNaN(Number(recipeId))) {
      return NextResponse.json(
        { error: 'Valid recipe ID is required' },
        { status: 400 }
      );
    }

    // Cache TTL (seconds) from environment (default 24h)
    const TTL_SECONDS = Number(process.env.RECIPE_CACHE_TTL_SECONDS || 86400);

    // First check if we have this recipe cached in our database
    const cachedRecipe = await prisma.recipe.findFirst({
      where: {
        sourceId: recipeId.toString(),
        sourceType: 'SPOONACULAR',
      },
      include: { ingredients: true },
    });

    if (cachedRecipe) {
      const updatedAt = cachedRecipe.updatedAt || cachedRecipe.createdAt || new Date(0);
      const ageSeconds = (Date.now() - new Date(updatedAt).getTime()) / 1000;
      if (ageSeconds < TTL_SECONDS) {
        logTelemetry('recipe_cache_hit', { recipeId, ageSeconds });
        return NextResponse.json({
          id: Number(cachedRecipe.sourceId),
          title: cachedRecipe.title,
          summary: cachedRecipe.description,
          image: cachedRecipe.imageUrl,
          fallbackImage: cachedRecipe.fallbackImageUrl,
          readyInMinutes: cachedRecipe.totalTime,
          servings: cachedRecipe.servings,
          cuisines: [cachedRecipe.cuisine].filter(Boolean),
          dishTypes: [cachedRecipe.mealType].filter(Boolean),
          diets: cachedRecipe.tags || [],
          extendedIngredients: (cachedRecipe.ingredients || []).map((ing) => ({
            id: ing.ingredientId,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            original: ing.original,
            image: ing.image,
          })),
          analyzedInstructions: cachedRecipe.instructions || [],
          nutrition: cachedRecipe.nutrition,
          isCached: true,
        });
      } else {
        logTelemetry('recipe_cache_stale', { recipeId, ageSeconds });
      }
    }

    // If not cached, fetch from Spoonacular API
    const apiKey = process.env.SPOONACULAR_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Spoonacular API key not configured' },
        { status: 500 }
      );
    }

  const spoonacularUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`;

    const response = await fetch(spoonacularUrl);
    
    if (!response.ok) {
      console.error('Spoonacular API error:', response.status, response.statusText);
      
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Recipe not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch recipe details from Spoonacular' },
        { status: response.status }
      );
    }

    const spoonacularData: SpoonacularRecipeDetail = await response.json();

    // Transform and structure the data
    const transformedRecipe = {
      id: spoonacularData.id,
      title: spoonacularData.title,
      summary: spoonacularData.summary,
      image: spoonacularData.image,
      readyInMinutes: spoonacularData.readyInMinutes,
      servings: spoonacularData.servings,
      cuisines: spoonacularData.cuisines || [],
      dishTypes: spoonacularData.dishTypes || [],
      diets: spoonacularData.diets || [],
      extendedIngredients: spoonacularData.extendedIngredients || [],
      analyzedInstructions: spoonacularData.analyzedInstructions || [],
      nutrition: spoonacularData.nutrition,
      isCached: false,
    };

    // Upsert with idempotency: use a unique id like 'spoonacular-<id>' in the recipe.id field
    try {
      await prisma.recipe.upsert({
        where: { id: `spoonacular-${spoonacularData.id}` },
        update: {
          title: spoonacularData.title,
          description: spoonacularData.summary,
          imageUrl: spoonacularData.image,
          totalTime: spoonacularData.readyInMinutes,
          servings: spoonacularData.servings,
          cuisine: spoonacularData.cuisines?.[0] || null,
          mealType: spoonacularData.dishTypes?.[0] || null,
          tags: spoonacularData.diets || [],
          rawApiResponse: JSON.stringify(spoonacularData),
          cacheTtlSeconds: Number(process.env.RECIPE_CACHE_TTL_SECONDS || 86400),
          // Replace ingredients atomically
          ingredients: {
            deleteMany: {},
            create: transformIngredients(spoonacularData.extendedIngredients || []),
          },
          instructions: transformInstructions(spoonacularData.analyzedInstructions || []),
          nutrition: spoonacularData.nutrition || undefined,
          sourceType: 'SPOONACULAR',
          sourceId: spoonacularData.id.toString(),
          sourceUrl: `https://spoonacular.com/recipes/${spoonacularData.id}`,
          updatedAt: new Date(),
        },
        create: {
          id: `spoonacular-${spoonacularData.id}`,
          title: spoonacularData.title,
          description: spoonacularData.summary,
          imageUrl: spoonacularData.image,
          totalTime: spoonacularData.readyInMinutes,
          servings: spoonacularData.servings,
          cuisine: spoonacularData.cuisines?.[0] || null,
          mealType: spoonacularData.dishTypes?.[0] || null,
          tags: spoonacularData.diets || [],
          rawApiResponse: JSON.stringify(spoonacularData),
          cacheTtlSeconds: Number(process.env.RECIPE_CACHE_TTL_SECONDS || 86400),
          ingredients: {
            create: transformIngredients(spoonacularData.extendedIngredients || []),
          },
          instructions: transformInstructions(spoonacularData.analyzedInstructions || []),
          nutrition: spoonacularData.nutrition || undefined,
          sourceType: 'SPOONACULAR',
          sourceId: spoonacularData.id.toString(),
          sourceUrl: `https://spoonacular.com/recipes/${spoonacularData.id}`,
          isPublic: true,
          savedCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      logTelemetry('recipe_cache_upsert', { recipeId: spoonacularData.id });
    } catch (dbError) {
      logTelemetry('recipe_cache_error', { recipeId: spoonacularData.id, message: (dbError as Error).message });
    }

    return NextResponse.json(transformedRecipe);

  } catch (error) {
    console.error('Recipe details error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
