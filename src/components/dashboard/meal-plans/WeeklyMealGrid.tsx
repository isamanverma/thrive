import type {
  DraggedItem,
  DropZone,
  MealTypeCapitalized,
  WeeklyMeals,
} from "./types";

import { MealTypeRow } from "./MealTypeRow";
import React from "react";

interface WeeklyMealGridProps {
  weeklyMeals: WeeklyMeals;
  draggedItem: DraggedItem | null;
  activeDropZone: DropZone | null;
  currentDayIndex: number;
  onSlotClick: (mealType: string, dayIndex: number) => void;
  onEmptySlotClick: (mealType: string, dayIndex: number) => void;
}

export const WeeklyMealGrid = React.memo(function WeeklyMealGrid({
  weeklyMeals,
  draggedItem,
  activeDropZone,
  currentDayIndex,
  onSlotClick,
  onEmptySlotClick,
}: WeeklyMealGridProps) {
  const mealTypes: MealTypeCapitalized[] = [
    "Breakfast",
    "Lunch",
    "Snack",
    "Dinner",
  ];

  const adjustedDayIndex = (currentDayIndex - 1 + 7) % 7;

  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      {/* Day headers — label spacer + 7 day columns */}
      <div className="grid grid-cols-[40px_repeat(7,1fr)] gap-x-2">
        <div /> {/* empty label spacer */}
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <div
            key={day}
            className={`py-2 text-center text-xs font-semibold transition-colors rounded-lg ${
              index === adjustedDayIndex
                ? "bg-primary/10 text-primary"
                : "text-foreground"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Meal type rows */}
      <div className="grid grid-rows-4 gap-y-2 mt-1 flex-1 min-h-0 auto-rows-fr">
        {mealTypes.map((mealType) => (
          <MealTypeRow
            key={mealType}
            mealType={mealType}
            weeklyMeals={weeklyMeals}
            draggedItem={draggedItem}
            activeDropZone={activeDropZone}
            todayIndex={adjustedDayIndex}
            onSlotClick={onSlotClick}
            onEmptySlotClick={onEmptySlotClick}
          />
        ))}
      </div>
    </div>
  );
});
