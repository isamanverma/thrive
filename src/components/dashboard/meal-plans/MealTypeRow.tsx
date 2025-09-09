import type {
  DraggedItem,
  DropZone,
  MealPlanItem,
  MealTypeCapitalized,
  WeeklyMeals,
} from "./types";

import { MealPlanCard } from "@/components/dashboard/MealPlanCard";
import React from "react";
import { motion } from "framer-motion";

interface MealTypeRowProps {
  mealType: MealTypeCapitalized;
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
}

const mealTypeStyles = {
  Breakfast: {
    bg: "bg-orange-50",
    indicatorBg: "bg-orange-100",
    indicatorDot: "bg-orange-500",
    dropZone: "from-orange-100 to-orange-200 ring-orange-300",
    hover: "hover:bg-orange-50/30",
    shadow: "0 8px 25px rgba(255, 165, 0, 0.3)",
  },
  Lunch: {
    bg: "bg-blue-50",
    indicatorBg: "bg-blue-100",
    indicatorDot: "bg-blue-500",
    dropZone: "from-blue-100 to-blue-200 ring-blue-300",
    hover: "hover:bg-blue-50/30",
    shadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
  },
  Snack: {
    bg: "bg-purple-50",
    indicatorBg: "bg-purple-100",
    indicatorDot: "bg-purple-500",
    dropZone: "from-purple-100 to-purple-200 ring-purple-300",
    hover: "hover:bg-purple-50/30",
    shadow: "0 8px 25px rgba(147, 51, 234, 0.3)",
  },
  Dinner: {
    bg: "bg-red-50",
    indicatorBg: "bg-red-100",
    indicatorDot: "bg-red-500",
    dropZone: "from-red-100 to-red-200 ring-red-300",
    hover: "hover:bg-red-50/30",
    shadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
  },
};

export function MealTypeRow({
  mealType,
  weeklyMeals,
  draggedItem,
  activeDropZone,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onRecipeClick,
}: MealTypeRowProps) {
  const styles = mealTypeStyles[mealType];
  const mealKey = mealType.toLowerCase() as keyof (typeof weeklyMeals)[0];

  return (
    <motion.div
      className={`${styles.bg} border-b`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: "80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        }}
      >
        <div
          className={`p-2 flex items-center justify-center ${styles.indicatorBg}`}
        >
          <div className={`w-3 h-3 ${styles.indicatorDot} rounded-full`}></div>
        </div>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
          const dayMeals = weeklyMeals[index];
          const meal = dayMeals?.[mealKey];
          const isDropZone =
            activeDropZone?.mealType === mealType &&
            activeDropZone?.dayIndex === index;

          return (
            <motion.div
              key={`${mealType.toLowerCase()}-${index}`}
              className={`p-3 transition-all duration-300 rounded-lg relative ${
                isDropZone
                  ? `bg-gradient-to-r ${styles.dropZone} ring-4 ring-opacity-60 shadow-lg`
                  : styles.hover
              }`}
              onDragOver={(e) => onDragOver(e, mealType, index)}
              onDragLeave={onDragLeave}
              onDrop={(e) => onDrop(e, mealType, index)}
              layout
              animate={
                isDropZone
                  ? {
                      scale: 1.05,
                      boxShadow: styles.shadow,
                      transition: {
                        duration: 0.2,
                        ease: "easeOut",
                      },
                    }
                  : {
                      scale: 1,
                      boxShadow: "none",
                    }
              }
            >
              {meal ? (
                <MealPlanCard
                  meal={meal}
                  mealType={mealType}
                  dayIndex={index}
                  isDraggable={true}
                  showMealTypeLabel={false}
                  onCardClick={onRecipeClick}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  isDragging={
                    draggedItem?.dayIndex === index &&
                    draggedItem?.mealType === mealType
                  }
                />
              ) : (
                <div className="bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 h-24 flex items-center justify-center text-gray-500 text-sm">
                  Drop {mealType.toLowerCase()} here
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
