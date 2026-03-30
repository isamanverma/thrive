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
  todayInCurrentWeek: number | null;
  weekStartDay: number;
  onSlotClick: (mealType: string, dayIndex: number) => void;
  onEmptySlotClick: (mealType: string, dayIndex: number) => void;
}

export const WeeklyMealGrid = React.memo(function WeeklyMealGrid({
  weeklyMeals,
  draggedItem,
  activeDropZone,
  currentDayIndex,
  todayInCurrentWeek,
  weekStartDay,
  onSlotClick,
  onEmptySlotClick,
}: WeeklyMealGridProps) {
  const mealTypes: MealTypeCapitalized[] = [
    "Breakfast",
    "Lunch",
    "Snack",
    "Dinner",
  ];

  const adjustedDayIndex = (currentDayIndex - weekStartDay + 7) % 7;

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayHeaders = Array.from({ length: 7 }, (_, i) => dayNames[(weekStartDay + i) % 7]);

  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      {/* Day headers — label spacer + 7 day columns */}
      <div className="grid grid-cols-[40px_repeat(7,1fr)] gap-x-2">
        <div /> {/* empty label spacer */}
        {dayHeaders.map((day, index) => (
          <div
            key={day}
            className={`py-2 text-center text-xs font-semibold transition-colors rounded-lg ${
              todayInCurrentWeek !== null && index === todayInCurrentWeek
                ? "bg-primary/10 text-primary ring-2 ring-primary/30"
                : "text-foreground"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Meal type rows */}
      <div
        className="grid grid-rows-4 gap-y-2 mt-1 flex-1 min-h-0"
        style={{ gridTemplateRows: "1fr 1fr 1fr 1fr" }}
      >
        {mealTypes.map((mealType) => (
          <MealTypeRow
            key={mealType}
            mealType={mealType}
            weeklyMeals={weeklyMeals}
            draggedItem={draggedItem}
            activeDropZone={activeDropZone}
            todayIndex={adjustedDayIndex}
            todayInCurrentWeek={todayInCurrentWeek}
            onSlotClick={onSlotClick}
            onEmptySlotClick={onEmptySlotClick}
          />
        ))}
      </div>
    </div>
  );
});
