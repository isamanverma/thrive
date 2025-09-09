export interface MealPlanItem {
  id: number;
  name: string;
  calories: number;
  image: string;
  description: string;
}

export interface WeeklyMeals {
  [dayIndex: number]: {
    breakfast: MealPlanItem;
    lunch: MealPlanItem;
    snack: MealPlanItem;
    dinner: MealPlanItem;
  };
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
