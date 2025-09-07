// This file contains client-side API functions for the new Spoonacular-based architecture

// User data interface based on your schema
export interface UserData {
  clerkId: string;
  email: string;
  name?: string;
  age?: number;
  weight?: number;
  goals?: string;
  activityLevel?: string;
  height?: number;
  diet_preference?: string;
}

// Nutrition interface
export interface Nutrition {
  nutrients: Array<{
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds?: number;
  }>;
}

// Recipe ingredient interface
export interface RecipeIngredient {
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
}

// Recipe instruction interface
export interface RecipeInstruction {
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
}

// Meal plan constraints interface
export interface MealPlanConstraints {
  diet?: string;
  intolerances?: string;
  targetCalories?: number;
  excludeIngredients?: string;
  includeIngredients?: string;
}

// Recipe search interfaces
export interface RecipeSearchParams {
  q?: string;
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  includeIngredients?: string;
  excludeIngredients?: string;
  maxReadyTime?: number;
  minCalories?: number;
  maxCalories?: number;
  number?: number;
  offset?: number;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  nutrition?: Nutrition;
}

export interface RecipeSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface RecipeDetail extends Recipe {
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  fallbackImage?: string;
  isCached: boolean;
}

// Meal plan interfaces
export interface MealPlanRequest {
  startDate: string;
  diet?: string;
  intolerances?: string;
  targetCalories?: number;
  excludeIngredients?: string;
  includeIngredients?: string;
}

export interface MealPlan {
  id: string;
  startDate: string;
  endDate: string;
  constraints: MealPlanConstraints;
  items: MealPlanItem[];
  nutrition?: Record<string, unknown>;
}

export interface MealPlanItem {
  id: string;
  spoonacularId: number;
  dayOfWeek: number;
  mealType: string;
  recipe?: Recipe;
}

// User recipe interfaces
export interface UserRecipe {
  id: string;
  spoonacularId: number;
  status: 'liked' | 'saved' | 'cooked';
  dateAdded: string;
  cachedRecipe?: Recipe;
}

// === CLIENT-SIDE FUNCTIONS ===

// User functions
export async function createOrUpdateUser(userData: UserData) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to save user data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
}

// Request deduplication cache
const userRequestCache = new Map<string, Promise<UserData | null>>();

export async function getUserByClerkId(clerkId: string): Promise<UserData | null> {
  // Check if we already have a pending request for this user
  if (userRequestCache.has(clerkId)) {
    return userRequestCache.get(clerkId)!;
  }
  
  // Create the request promise
  const requestPromise = getUserByClerkIdInternal(clerkId);
  
  // Cache the promise
  userRequestCache.set(clerkId, requestPromise);
  
  try {
    const result = await requestPromise;
    // Clear cache after successful completion
    userRequestCache.delete(clerkId);
    return result;
  } catch (error) {
    // Clear cache on error too
    userRequestCache.delete(clerkId);
    throw error;
  }
}

async function getUserByClerkIdInternal(clerkId: string, retries = 3): Promise<UserData | null> {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      console.warn('getUserByClerkId called on server side, this should only be used client-side');
      return null;
    }
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(`/api/users?clerkId=${clerkId}`, {
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        
        clearTimeout(timeoutId);
        
        if (response.status === 404) {
          return null; // User doesn't exist
        }
        
        if (!response.ok) {
          const errorText = await response.text();
          
          // Don't retry on client errors (4xx)
          if (response.status >= 400 && response.status < 500 && response.status !== 404) {
            throw new Error(`Client error: ${response.status} ${response.statusText} - ${errorText}`);
          }
          
          // Retry on server errors (5xx) or network issues
          if (attempt === retries) {
            throw new Error(`Failed to fetch user after ${retries} attempts: ${response.status} ${response.statusText} - ${errorText}`);
          }
          
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
          continue;
        }
        
        const data = await response.json();
        return data.exists ? data.user : null;
        
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          if (attempt === retries) {
            throw new Error('Request timed out after multiple attempts');
          }
          continue;
        }
        
        if (attempt === retries) {
          throw error;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    
    // This should never be reached, but TypeScript needs it
    throw new Error('All retry attempts failed');
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the API. Please check your internet connection.');
    }
    throw error;
  }
}

// Recipe search functions
export async function searchRecipes(params: RecipeSearchParams): Promise<RecipeSearchResponse> {
  try {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(`/api/searchRecipe?${searchParams.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to search recipes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
}

export async function getRecipeDetails(recipeId: number): Promise<RecipeDetail> {
  try {
    const response = await fetch(`/api/recipes/${recipeId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipe details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
}

// Meal plan functions
export async function generateMealPlan(params: MealPlanRequest): Promise<MealPlan> {
  try {
    const response = await fetch('/api/generateMealPlan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate meal plan');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw error;
  }
}

export async function getUserMealPlans(): Promise<{ mealPlans: MealPlan[] }> {
  try {
    const response = await fetch('/api/generateMealPlan');
    
    if (!response.ok) {
      throw new Error('Failed to fetch meal plans');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    throw error;
  }
}

// User recipe functions
export async function addUserRecipe(spoonacularId: number, status: 'liked' | 'saved' | 'cooked') {
  try {
    const response = await fetch('/api/user/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spoonacularId, status }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add recipe to user collection');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding user recipe:', error);
    throw error;
  }
}

export async function getUserRecipes(status?: string, limit = 20, offset = 0): Promise<{
  recipes: UserRecipe[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}> {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });
    
    if (status) {
      params.append('status', status);
    }

    const response = await fetch(`/api/user/recipes?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user recipes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    throw error;
  }
}

export async function removeUserRecipe(spoonacularId: number, status: string) {
  try {
    const params = new URLSearchParams({
      spoonacularId: spoonacularId.toString(),
      status,
    });

    const response = await fetch(`/api/user/recipes?${params.toString()}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove recipe from user collection');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error removing user recipe:', error);
    throw error;
  }
}