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
  dayCount: number;
  currentDate: Date;
  onSlotClick: (mealType: string, dayIndex: number) => void;
  onEmptySlotClick: (mealType: string, dayIndex: number) => void;
}

export const WeeklyMealGrid = React.memo(function WeeklyMealGrid({
  weeklyMeals,
  draggedItem,
  activeDropZone,
  currentDayIndex,
  todayInCurrentWeek,
  dayCount,
  currentDate,
  onSlotClick,
  onEmptySlotClick,
}: WeeklyMealGridProps) {
  const mealTypes: MealTypeCapitalized[] = [
    "Breakfast",
    "Lunch",
    "Snack",
    "Dinner",
  ];

  const adjustedDayIndex = (currentDayIndex) % dayCount;

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayHeaders = Array.from({ length: dayCount }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    return {
      name: dayNames[date.getDay()],
      date: date.getDate(),
    };
  });

  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      {/* Day headers — label spacer + N day columns */}
      <div className="grid gap-x-2" style={{ gridTemplateColumns: `40px repeat(${dayCount}, 1fr)` }}>
        <div /> {/* empty label spacer */}
        {dayHeaders.map((day, index) => (
          <div
            key={`${day.name}-${day.date}-${index}`}
            className={`py-1 text-center transition-colors rounded-lg ${
              todayInCurrentWeek !== null && index === todayInCurrentWeek
                ? "bg-primary/10 text-primary ring-2 ring-primary/30"
                : "text-foreground"
            }`}
          >
            <div className="text-xs font-semibold">{day.name}</div>
            <div className="text-lg font-bold">{day.date}</div>
          </div>
        ))}
      </div>

      {/* Meal type rows */}
      <div
        className="grid gap-y-2 mt-1 flex-1 min-h-0"
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
            dayCount={dayCount}
            onSlotClick={onSlotClick}
            onEmptySlotClick={onEmptySlotClick}
          />
        ))}
      </div>
    </div>
  );
});
