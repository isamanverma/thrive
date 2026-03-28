import type {
  DraggedItem,
  Dish,
  DropZone,
  MealPlanItem,
  MealTypeCapitalized,
  WeeklyMeals,
} from "./types";

import { MealSlotCard } from "./MealSlotCard";
import { Plus, Coffee, UtensilsCrossed, Cookie, Utensils } from "lucide-react";
import React from "react";

interface MealTypeRowProps {
  mealType: MealTypeCapitalized;
  weeklyMeals: WeeklyMeals;
  draggedItem: DraggedItem | null;
  activeDropZone: DropZone | null;
  todayIndex: number;
  onSlotClick: (mealType: string, dayIndex: number) => void;
  onEmptySlotClick: (mealType: string, dayIndex: number) => void;
}

const mealTypeStyles: Record<
  MealTypeCapitalized,
  {
    bg: string;
    accentBg: string;
    accentText: string;
    accentBorder: string;
    icon: React.ElementType;
  }
> = {
  Breakfast: {
    bg: "bg-orange-500/5",
    accentBg: "bg-orange-500/10",
    accentText: "text-orange-600",
    accentBorder: "border-orange-500/20",
    icon: Coffee,
  },
  Lunch: {
    bg: "bg-blue-500/5",
    accentBg: "bg-blue-500/10",
    accentText: "text-blue-600",
    accentBorder: "border-blue-500/20",
    icon: UtensilsCrossed,
  },
  Snack: {
    bg: "bg-orange-500/5",
    accentBg: "bg-orange-500/10",
    accentText: "text-orange-600",
    accentBorder: "border-orange-500/20",
    icon: Cookie,
  },
  Dinner: {
    bg: "bg-red-500/5",
    accentBg: "bg-red-500/10",
    accentText: "text-red-600",
    accentBorder: "border-red-500/20",
    icon: Utensils,
  },
};

function MealTypeRowInner({
  mealType,
  weeklyMeals,
  todayIndex,
  onSlotClick,
  onEmptySlotClick,
}: MealTypeRowProps) {
  const styles = mealTypeStyles[mealType];
  const Icon = styles.icon;
  const mealKey = mealType.toLowerCase() as keyof (typeof weeklyMeals)[0];

  return (
    <div
      className={`grid grid-cols-[40px_repeat(7,1fr)] gap-x-2 ${styles.bg} rounded-xl h-full min-h-0 py-1.5 items-stretch`}
    >
      {/* Meal type marker — icon only */}
      <div className="flex items-center justify-center h-full">
        <Icon className={`w-4 h-4 ${styles.accentText}`} />
      </div>

      {/* Day cells */}
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
        const dayMeals = weeklyMeals[index];
        const meal = dayMeals?.[mealKey] as MealPlanItem | undefined;
        const dishes: Dish[] = meal?.dishes || [];

        return (
          <div
            key={`${mealType.toLowerCase()}-${index}`}
            className="h-full min-h-0 overflow-hidden"
          >
            {dishes.length > 0 ? (
              <MealSlotCard
                dishes={dishes}
                mealType={mealType}
                dayIndex={index}
                onClick={() => onSlotClick(mealType, index)}
                isSquare
              />
            ) : (
              <button
                type="button"
                onClick={() => onEmptySlotClick(mealType, index)}
                className={`w-full h-full min-h-0 rounded-xl border-2 border-dashed ${styles.accentBorder} flex items-center justify-center p-3 text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground/70`}
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export const MealTypeRow = React.memo(MealTypeRowInner);
