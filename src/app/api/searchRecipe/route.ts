import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs/server';

interface SpoonacularSearchResponse {
  results: SpoonacularRecipe[];
  offset: number;
  number: number;
  totalResults: number;
}

interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  nutrition?: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
}

export async function GET(request: NextRequest) {
  try {
    // Allow public access to recipe search - authentication is optional
    const { userId } = await auth();
    console.log('Search auth userId:', userId || 'Anonymous user');

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const cuisine = searchParams.get('cuisine');
    const diet = searchParams.get('diet');
    const intolerances = searchParams.get('intolerances');
    const ingredients = searchParams.get('includeIngredients');
    const excludeIngredients = searchParams.get('excludeIngredients');
    const maxReadyTime = searchParams.get('maxReadyTime');
    const minCalories = searchParams.get('minCalories');
    const maxCalories = searchParams.get('maxCalories');
    const number = searchParams.get('number') || '12';
    const offset = searchParams.get('offset') || '0';

    if (!query && !ingredients) {
      return NextResponse.json(
        { error: 'Search query or ingredients are required' },
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

    // Build Spoonacular API URL
    const params = new URLSearchParams({
      apiKey,
      number,
      offset,
      addRecipeInformation: 'true',
      addRecipeNutrition: 'true',
      fillIngredients: 'true',
    });

    if (query) params.append('query', query);
    if (cuisine) params.append('cuisine', cuisine);
    if (diet) params.append('diet', diet);
    if (intolerances) params.append('intolerances', intolerances);
    if (ingredients) params.append('includeIngredients', ingredients);
    if (excludeIngredients) params.append('excludeIngredients', excludeIngredients);
    if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);
    if (minCalories) params.append('minCalories', minCalories);
    if (maxCalories) params.append('maxCalories', maxCalories);

    const spoonacularUrl = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;

    const response = await fetch(spoonacularUrl);
    
    if (!response.ok) {
      console.error('Spoonacular API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch recipes from Spoonacular' },
        { status: response.status }
      );
    }

    const data: SpoonacularSearchResponse = await response.json();

    // Transform the data to match our frontend expectations
    const transformedResults = data.results.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      summary: recipe.summary,
      cuisines: recipe.cuisines || [],
      dishTypes: recipe.dishTypes || [],
      diets: recipe.diets || [],
      nutrition: recipe.nutrition,
    }));

    return NextResponse.json({
      results: transformedResults,
      offset: data.offset,
      number: data.number,
      totalResults: data.totalResults,
    });

  } catch (error) {
    console.error('Recipe search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
