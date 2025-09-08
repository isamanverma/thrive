import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs/server';
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

    // First check if we have this recipe cached in our database
    const cachedRecipe = await prisma.recipe.findUnique({
      where: { spoonacularId: Number(recipeId) },
    });

    if (cachedRecipe) {
      return NextResponse.json({
        id: cachedRecipe.spoonacularId,
        title: cachedRecipe.title,
        summary: cachedRecipe.summary,
        image: cachedRecipe.imageUrl,
        fallbackImage: cachedRecipe.fallbackImageUrl,
        readyInMinutes: cachedRecipe.readyInMinutes,
        servings: cachedRecipe.servings,
        cuisines: cachedRecipe.cuisines,
        dishTypes: cachedRecipe.dishTypes,
        diets: cachedRecipe.diets,
        extendedIngredients: cachedRecipe.ingredients || [],
        analyzedInstructions: cachedRecipe.instructions || [],
        nutrition: cachedRecipe.nutrition,
        isCached: true,
      });
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

    // Cache the recipe in our database for future requests
    try {
      await prisma.recipe.upsert({
        where: { spoonacularId: spoonacularData.id },
        update: {
          title: spoonacularData.title,
          summary: spoonacularData.summary,
          imageUrl: spoonacularData.image,
          readyInMinutes: spoonacularData.readyInMinutes,
          servings: spoonacularData.servings,
          cuisines: spoonacularData.cuisines || [],
          dishTypes: spoonacularData.dishTypes || [],
          diets: spoonacularData.diets || [],
          ingredients: spoonacularData.extendedIngredients || [],
          instructions: spoonacularData.analyzedInstructions || [],
          nutrition: spoonacularData.nutrition || undefined,
          updatedAt: new Date(),
        },
        create: {
          spoonacularId: spoonacularData.id,
          title: spoonacularData.title,
          summary: spoonacularData.summary,
          imageUrl: spoonacularData.image,
          readyInMinutes: spoonacularData.readyInMinutes,
          servings: spoonacularData.servings,
          cuisines: spoonacularData.cuisines || [],
          dishTypes: spoonacularData.dishTypes || [],
          diets: spoonacularData.diets || [],
          ingredients: spoonacularData.extendedIngredients || [],
          instructions: spoonacularData.analyzedInstructions || [],
          nutrition: spoonacularData.nutrition || undefined,
        },
      });
    } catch (dbError) {
      console.error('Error caching recipe:', dbError);
      // Continue without caching if there's a DB error
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
