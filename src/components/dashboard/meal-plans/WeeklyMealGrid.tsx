import type {
  DraggedItem,
  DropZone,
  MealPlanItem,
  MealTypeCapitalized,
  WeeklyMeals,
} from "./types";

import { MealTypeRow } from "./MealTypeRow";
import React from "react";
import { motion } from "framer-motion";

interface WeeklyMealGridProps {
  weeklyMeals: WeeklyMeals;
  draggedItem: DraggedItem | null;
  activeDropZone: DropZone | null;
  onDragStart: (
    e: React.DragEvent,
    meal: MealPlanItem,
    mealType: string,
    dayIndex: number
  ) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent, mealType: string, dayIndex: number) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, mealType: string, dayIndex: number) => void;
  onRecipeClick: (
    recipe: MealPlanItem,
    mealType: string,
    dayIndex?: number
  ) => void;
  currentDayIndex: number;
}

export function WeeklyMealGrid({
  weeklyMeals,
  draggedItem,
  activeDropZone,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onRecipeClick,
  currentDayIndex,
}: WeeklyMealGridProps) {
  const mealTypes: MealTypeCapitalized[] = [
    "Breakfast",
    "Lunch",
    "Snack",
    "Dinner",
  ];

  // Ensure currentDayIndex is within the valid range (1-7)
  const adjustedDayIndex = (currentDayIndex - 1 + 7) % 7; // Adjust for 0-based index and wrap around

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Day headers */}
      <div
        className="grid gap-0 bg-gray-50 border-b"
        style={{
          gridTemplateColumns: "80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        }}
      >
        <div className="p-2 text-center text-xs font-medium text-gray-500"></div>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <div
            key={day}
            className={`p-4 text-center font-semibold ${
              index === adjustedDayIndex
                ? "bg-gradient-to-r from-green-200 to-green-400 text-green-900"
                : "text-gray-700"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Meal type rows */}
      {mealTypes.map((mealType) => (
        <MealTypeRow
          key={mealType}
          mealType={mealType}
          weeklyMeals={weeklyMeals}
          draggedItem={draggedItem}
          activeDropZone={activeDropZone}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onRecipeClick={onRecipeClick}
        />
      ))}
    </motion.div>
  );
}
