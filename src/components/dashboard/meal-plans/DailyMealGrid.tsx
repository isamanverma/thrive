import type { MealPlanItem, MealTypeCapitalized, WeeklyMeals } from "./types";

import { MealPlanCard } from "@/components/dashboard/MealPlanCard";
import { Plus } from "lucide-react";
import React from "react";

interface DailyMealGridProps {
  sampleMeals: {
    breakfast: MealPlanItem[];
    lunch: MealPlanItem[];
    snack: MealPlanItem[];
    dinner: MealPlanItem[];
  };
  weeklyMeals?: WeeklyMeals;
  onRecipeClick: (
    recipe: MealPlanItem,
    mealType: string,
    dayIndex?: number
  ) => void;
  onEmptySlotClick?: (mealType: string, dayIndex: number) => void;
  currentDayIndex?: number;
}

export function DailyMealGrid({
  sampleMeals,
  weeklyMeals,
  onRecipeClick,
  onEmptySlotClick,
  currentDayIndex = 0,
}: DailyMealGridProps) {
  const mealTypes: MealTypeCapitalized[] = [
    "Breakfast",
    "Lunch",
    "Snack",
    "Dinner",
  ];

  // Convert JS getDay() (0 = Sun) to Mon-first index used across grid (0 = Mon)
  const adjustedDayIndex = (currentDayIndex - 1 + 7) % 7;

  const getMealForType = (
    mealType: MealTypeCapitalized
  ): MealPlanItem | undefined => {
    const key = mealType.toLowerCase() as keyof typeof sampleMeals;
    const dayMeals = weeklyMeals?.[adjustedDayIndex];
    // If a weeklyMeals entry exists for this day, prefer it (it may be intentionally empty)
    if (dayMeals) {
      const typed = dayMeals as Partial<Record<string, MealPlanItem>>;
      return typed[key as string] as MealPlanItem | undefined;
    }
    // Fallback to the first sample meal
    return sampleMeals[key][0];
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 px-3 py-1 text-sm font-medium">
          Today
        </span>
        <span className="text-sm text-gray-600">Showing meals for today</span>
      </div>

      <div
        className="grid grid-cols-4 gap-6"
        style={{ gridAutoRows: "minmax(12rem, auto)" }}
      >
        {mealTypes.map((type) => {
          const meal = getMealForType(type);

          if (!meal) {
            return (
              <button
                key={type}
                type="button"
                onClick={() =>
                  onEmptySlotClick && onEmptySlotClick(type, adjustedDayIndex)
                }
                className="group relative bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 h-full flex items-center justify-center text-gray-500 text-sm"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-25/--not-real text-green-700">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span>Drop {type.toLowerCase()} here</span>
                </div>

                {/* Tooltip */}
                <span className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                  Add {type.toLowerCase()}
                </span>
              </button>
            );
          }

          return (
            <MealPlanCard
              key={meal.id}
              meal={meal}
              mealType={type}
              dayIndex={adjustedDayIndex}
              showMealTypeLabel={true}
              onCardClick={onRecipeClick}
            />
          );
        })}
      </div>
    </div>
  );
}
