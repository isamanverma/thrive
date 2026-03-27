"use client";

import { GripVertical } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export interface MealPlanItem {
  id: number;
  name: string;
  calories?: number;
  image?: string;
  description?: string;
  nutrition?: unknown;
}

interface MealPlanCardProps {
  meal: MealPlanItem;
  mealType: "Breakfast" | "Lunch" | "Snack" | "Dinner";
  dayIndex?: number;
  isDraggable?: boolean;
  showMealTypeLabel?: boolean;
  onCardClick: (
    meal: MealPlanItem,
    mealType: string,
    dayIndex?: number,
  ) => void;
  onDragStart?: (
    e: React.DragEvent,
    meal: MealPlanItem,
    mealType: string,
    dayIndex: number,
  ) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}

const getMealTypeStyles = (mealType: string) => {
  // Use simple semantic classes so we can control saturation and borders from CSS.
  const styles = {
    Breakfast: "meal-type meal-type--breakfast",
    Lunch: "meal-type meal-type--lunch",
    Snack: "meal-type meal-type--snack",
    Dinner: "meal-type meal-type--dinner",
  } as const;
  return styles[mealType as keyof typeof styles] || styles.Lunch;
};

function MealPlanCardInner({
  meal,
  mealType,
  dayIndex,
  isDraggable = false,
  showMealTypeLabel = true,
  onCardClick,
  onDragStart,
  onDragEnd,
  isDragging = false,
}: MealPlanCardProps) {
  // Diagnostics: lightweight render counter & props snapshot (browser-only)
  try {
    // Count renders to help diagnose excessive re-renders
    console.count && console.count("[mealPlan] MealPlanCard render");
    // Small debug payload to avoid heavy logs
    console.debug &&
      console.debug("[mealPlan] MealPlanCard props", {
        id: meal?.id,
        mealType,
        dayIndex,
        isDragging,
      });
  } catch (e) {
    /* ignore logging errors in older browsers */
  }
  // Resolve calories from several possible shapes:
  // - meal.calories (normalized)
  // - meal.nutrition.calories
  // - meal.nutrition.nutrients.find(n => n.name === 'Calories')?.amount
  const resolveCalories = (m: MealPlanItem): number | null => {
    if (!m) return null;
    if (typeof m.calories === "number" && m.calories > 0) return m.calories;
    const nut = m.nutrition;
    if (!nut) return null;
    if (
      typeof (nut as { calories?: number }).calories === "number" &&
      (nut as { calories?: number }).calories! > 0
    ) {
      return (nut as { calories?: number }).calories!;
    }

    // Spoonacular style: nutrients array with name 'Calories'
    const maybeNutrients = (nut as { nutrients?: Array<unknown> }).nutrients;
    if (Array.isArray(maybeNutrients)) {
      for (const n of maybeNutrients) {
        if (n && typeof n === "object") {
          const obj = n as { name?: unknown; amount?: unknown };
          if (
            typeof obj.name === "string" &&
            obj.name.toLowerCase() === "calories" &&
            typeof obj.amount === "number"
          ) {
            return obj.amount;
          }
        }
      }
    }

    return null;
  };

  const caloriesValue = resolveCalories(meal);
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCardClick(meal, mealType, dayIndex);
  };

  return (
    <motion.div
      layout
      layoutId={`meal-${meal.id}-${mealType}-${dayIndex ?? "slot"}`}
      whileHover={{
        scale: 1.02,
        y: -2,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      animate={{
        opacity: isDragging ? 0.7 : 1,
        scale: isDragging ? 0.98 : 1,
        rotate: isDragging ? 2 : 0,
      }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 500,
          damping: 30,
          duration: 0.6,
        },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        rotate: { duration: 0.3 },
      }}
      className="w-full h-full"
    >
      <div
        className={`bg-card rounded-xl border overflow-hidden cursor-pointer transition-all duration-200 flex flex-col w-full h-full min-h-[180px] max-h-[260px] ${
          isDraggable ? "cursor-grab active:cursor-grabbing" : ""
        } ${
          isDragging
            ? "border-green-300 shadow-lg shadow-green-100"
            : "border-border hover:border-border"
        }`}
        draggable={isDraggable}
        onDragStart={
          isDraggable && onDragStart && dayIndex !== undefined
            ? (e) => onDragStart(e, meal, mealType, dayIndex)
            : undefined
        }
        onDragEnd={isDraggable && onDragEnd ? () => onDragEnd() : undefined}
        onClick={handleCardClick}
      >
        {/* Header with meal type tag (conditional) */}
        {showMealTypeLabel && (
          <div className="p-2 pb-1 flex-shrink-0">
            <div className="flex items-center justify-between">
              <span
                className={`text-xs px-2 py-1 rounded-md font-medium border ${getMealTypeStyles(mealType)} whitespace-nowrap`}
              >
                {mealType}
              </span>
              {isDraggable && (
                <GripVertical className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          </div>
        )}

        {/* Drag handle for cards without labels */}
        {!showMealTypeLabel && isDraggable && (
          <div className="p-2 pb-1 flex justify-end flex-shrink-0">
            <GripVertical className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          </div>
        )}

        {/* Image (larger) */}
        <div
          className={`px-2 ${!showMealTypeLabel ? "pt-1" : ""} pb-1 flex-shrink-0`}
        >
          <div className="relative w-full h-24 sm:h-28 rounded-md overflow-hidden">
            <Image
              src={meal.image || "/placeholder.svg"}
              alt={meal.name}
              fill
              className="object-cover transition-transform duration-200 hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-2 pb-2 flex-1 overflow-hidden min-h-0 flex flex-col justify-between">
          <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-1">
            {meal.name}
          </h4>

          {/* Calories display (only) */}
          <div className="flex items-center justify-start gap-2">
            <span className="text-xs text-muted-foreground">Calories</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-foreground">
                {typeof caloriesValue === "number" && caloriesValue > 0
                  ? caloriesValue
                  : "—"}
              </span>
              {typeof caloriesValue === "number" && caloriesValue > 0 && (
                <span className="text-xs text-muted-foreground">kcal</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const MealPlanCard = React.memo(MealPlanCardInner);
