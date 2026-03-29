import type {
  Dish,
  MealPlanItem,
  MealTypeCapitalized,
  WeeklyMeals,
} from "./types";

import {
  Coffee,
  UtensilsCrossed,
  Cookie,
  Utensils,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import React, { useState } from "react";
import { MealItem } from "./MealItem";
import { cn } from "@/lib/utils";

interface DailyMealGridProps {
  weeklyMeals: WeeklyMeals;
  onSlotClick: (mealType: string, dayIndex: number) => void;
  onEmptySlotClick: (mealType: string, dayIndex: number) => void;
  currentDayIndex?: number;
}

const mealTypeConfig: Record<
  MealTypeCapitalized,
  {
    dot: string;
    label: string;
    hoverBg: string;
    icon: React.ElementType;
  }
> = {
  Breakfast: {
    dot: "bg-orange-400",
    label: "text-orange-600 dark:text-orange-400",
    hoverBg: "hover:bg-orange-500/5",
    icon: Coffee,
  },
  Lunch: {
    dot: "bg-blue-400",
    label: "text-blue-600 dark:text-blue-400",
    hoverBg: "hover:bg-blue-500/5",
    icon: UtensilsCrossed,
  },
  Snack: {
    dot: "bg-amber-400",
    label: "text-amber-600 dark:text-amber-400",
    hoverBg: "hover:bg-amber-500/5",
    icon: Cookie,
  },
  Dinner: {
    dot: "bg-rose-400",
    label: "text-rose-600 dark:text-rose-400",
    hoverBg: "hover:bg-rose-500/5",
    icon: Utensils,
  },
};

function MealSectionHeader({
  type,
  totalCalories,
  itemCount,
  config,
  onClick,
}: {
  type: MealTypeCapitalized;
  totalCalories: number;
  itemCount: number;
  config: (typeof mealTypeConfig)[MealTypeCapitalized];
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 w-full py-3 px-2.5 rounded-lg transition-colors cursor-pointer group",
        config.hoverBg,
      )}
    >
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full shrink-0 border-2 border-background",
          config.dot,
        )}
      />
      <span className={cn("text-[13px] font-semibold", config.label)}>
        {type}
      </span>
      <span className="text-[12px] text-muted-foreground tabular-nums">
        · {totalCalories} kcal
        {itemCount > 0 && (
          <>
            {" "}
            · {itemCount} {itemCount === 1 ? "item" : "items"}
          </>
        )}
      </span>
      <Plus className="ml-auto h-3.5 w-3.5 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

function CollapsibleMealItems({
  dishes,
  type,
  dayIndex,
  onSlotClick,
}: {
  dishes: Dish[];
  type: MealTypeCapitalized;
  dayIndex: number;
  onSlotClick: (mealType: string, dayIndex: number) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const COLLAPSE_THRESHOLD = 5;
  const shouldCollapse = dishes.length > COLLAPSE_THRESHOLD;
  const visibleDishes =
    shouldCollapse && !expanded ? dishes.slice(0, COLLAPSE_THRESHOLD) : dishes;

  return (
    <div className="pl-5 pb-1 space-y-0.5">
      {visibleDishes.map((dish, index) => (
        <MealItem key={`${dish.recipeId}-${dish.name}-${index}`} dish={dish} />
      ))}
      {shouldCollapse && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="flex items-center gap-1 py-1.5 px-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              Show {dishes.length - COLLAPSE_THRESHOLD} more
            </>
          )}
        </button>
      )}
    </div>
  );
}

export function DailyMealGrid({
  weeklyMeals,
  onSlotClick,
  onEmptySlotClick,
  currentDayIndex = 0,
}: DailyMealGridProps) {
  const mealTypes: MealTypeCapitalized[] = [
    "Breakfast",
    "Lunch",
    "Snack",
    "Dinner",
  ];

  const adjustedDayIndex = (currentDayIndex - 1 + 7) % 7;

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Meal flow with timeline spine */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[13px] top-4 bottom-4 w-px bg-border/80" />

        <div className="space-y-3">
          {mealTypes.map((type, mealIdx) => {
            const key = type.toLowerCase() as keyof (typeof weeklyMeals)[0];
            const meal = weeklyMeals[adjustedDayIndex]?.[key] as
              | MealPlanItem
              | undefined;
            const dishes: Dish[] = meal?.dishes || [];
            const config = mealTypeConfig[type];
            const totalCalories = dishes.reduce(
              (sum, dish) => sum + (dish.calories || 0),
              0,
            );

            return (
              <div key={type} className="relative">
                {dishes.length === 0 ? (
                  <button
                    type="button"
                    onClick={() => onEmptySlotClick(type, adjustedDayIndex)}
                    className={cn(
                      "relative flex items-center gap-2 w-full py-3 px-2.5 rounded-lg transition-colors cursor-pointer",
                      config.hoverBg,
                      "border border-dashed border-border/40",
                    )}
                  >
                    <span
                      className={cn(
                        "h-2.5 w-2.5 rounded-full shrink-0 border-2 border-dashed",
                        type === "Breakfast" && "border-orange-400/50",
                        type === "Lunch" && "border-blue-400/50",
                        type === "Snack" && "border-amber-400/50",
                        type === "Dinner" && "border-rose-400/50",
                      )}
                    />
                    <span className="text-[13px] text-muted-foreground">
                      {type}
                    </span>
                    <Plus className="ml-1 h-3 w-3 text-muted-foreground/40" />
                    <span className="text-[12px] text-muted-foreground/60">
                      Add dishes
                    </span>
                  </button>
                ) : (
                  <div>
                    <MealSectionHeader
                      type={type}
                      totalCalories={totalCalories}
                      itemCount={dishes.length}
                      config={config}
                      onClick={() => onSlotClick(type, adjustedDayIndex)}
                    />
                    <CollapsibleMealItems
                      dishes={dishes}
                      type={type}
                      dayIndex={adjustedDayIndex}
                      onSlotClick={onSlotClick}
                    />
                  </div>
                )}

                {/* Thin separator between meals (not after last) */}
                {mealIdx < mealTypes.length - 1 && (
                  <div className="ml-4 border-b border-border/20" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
