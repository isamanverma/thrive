export interface Dish {
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

export interface MealPlanItem {
  id: number;
  name: string;
  calories?: number;
  image?: string;
  description?: string;
  nutrition?: unknown;
  // New: array of dishes for multi-dish support
  dishes?: Dish[];
}

export interface WeeklyMeals {
  // Each day index (0-6) maps to a partial set of meals — some slots may be empty
  [dayIndex: number]: Partial<{
    breakfast: MealPlanItem;
    lunch: MealPlanItem;
    snack: MealPlanItem;
    dinner: MealPlanItem;
  }>;
}

export interface WeeklyStats {
  avgCalories: number;
  avgProtein: number;
  avgCarbs: number;
  avgFat: number;
}

export interface DailyStats {
  totalCalories: number;
  caloriesLeft: number;
  protein: number;
  carbs: number;
  fat: number;
  goal: number;
}

export interface DraggedItem {
  meal: MealPlanItem;
  mealType: string;
  dayIndex: number;
}

export interface DropZone {
  mealType: string;
  dayIndex: number;
}

export type ViewMode = "weekly" | "daily";
export type MealType = "breakfast" | "lunch" | "snack" | "dinner";
export type MealTypeCapitalized = "Breakfast" | "Lunch" | "Snack" | "Dinner";

export const DISH_UNITS = [
  "serving",
  "bowl",
  "cup",
  "piece",
  "plate",
  "glass",
] as const;

export type DishUnit = (typeof DISH_UNITS)[number];
