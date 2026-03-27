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
  Flame,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface DailyMealGridProps {
  weeklyMeals: WeeklyMeals;
  onSlotClick: (mealType: string, dayIndex: number) => void;
  onEmptySlotClick: (mealType: string, dayIndex: number) => void;
  currentDayIndex?: number;
}

const mealTypeStyles: Record<
  MealTypeCapitalized,
  {
    accentBg: string;
    accentText: string;
    accentBorder: string;
    accentRing: string;
    cardBg: string;
    icon: React.ElementType;
  }
> = {
  Breakfast: {
    accentBg: "bg-orange-500/10",
    accentText: "text-orange-600",
    accentBorder: "border-orange-500/20",
    accentRing: "ring-orange-500/20",
    cardBg: "bg-orange-500/[0.04]",
    icon: Coffee,
  },
  Lunch: {
    accentBg: "bg-blue-500/10",
    accentText: "text-blue-600",
    accentBorder: "border-blue-500/20",
    accentRing: "ring-blue-500/20",
    cardBg: "bg-blue-500/[0.04]",
    icon: UtensilsCrossed,
  },
  Snack: {
    accentBg: "bg-orange-500/10",
    accentText: "text-orange-600",
    accentBorder: "border-orange-500/20",
    accentRing: "ring-orange-500/20",
    cardBg: "bg-orange-500/[0.04]",
    icon: Cookie,
  },
  Dinner: {
    accentBg: "bg-red-500/10",
    accentText: "text-red-600",
    accentBorder: "border-red-500/20",
    accentRing: "ring-red-500/20",
    cardBg: "bg-red-500/[0.04]",
    icon: Utensils,
  },
};

export function DailyMealGrid({
  weeklyMeals,
  onSlotClick,
  onEmptySlotClick,
  currentDayIndex = 0,
}: DailyMealGridProps) {
  const router = useRouter();
  const mealTypes: MealTypeCapitalized[] = [
    "Breakfast",
    "Lunch",
    "Snack",
    "Dinner",
  ];

  const adjustedDayIndex = (currentDayIndex - 1 + 7) % 7;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium">
          Today
        </span>
        <span className="text-sm text-muted-foreground">
          Showing meals for today
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {mealTypes.map((type) => {
          const key = type.toLowerCase() as keyof (typeof weeklyMeals)[0];
          const meal = weeklyMeals[adjustedDayIndex]?.[key] as
            | MealPlanItem
            | undefined;
          const dishes: Dish[] = meal?.dishes || [];
          const styles = mealTypeStyles[type];
          const Icon = styles.icon;
          const totalCalories = dishes.reduce(
            (sum, dish) => sum + (dish.calories || 0),
            0,
          );

          if (dishes.length === 0) {
            return (
              <button
                key={type}
                type="button"
                onClick={() => onEmptySlotClick(type, adjustedDayIndex)}
                className={`relative overflow-hidden rounded-2xl border-2 border-dashed ${styles.accentBorder} ${styles.cardBg} flex min-h-[136px] flex-col items-center justify-center gap-2 px-6 py-5 text-muted-foreground transition-colors hover:bg-muted/20`}
              >
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${styles.accentBg} ${styles.accentText}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {type}
                </span>
                <Plus className="h-5 w-5 text-muted-foreground/50" />
                <p className="text-sm">Add dishes to {type.toLowerCase()}</p>
              </button>
            );
          }

          return (
            <div
              key={type}
              role="button"
              tabIndex={0}
              onClick={() => onSlotClick(type, adjustedDayIndex)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSlotClick(type, adjustedDayIndex);
                }
              }}
              className={`group relative overflow-hidden rounded-2xl border ${styles.accentBorder} ${styles.cardBg} ring-1 ${styles.accentRing} min-h-[176px] p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer`}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${styles.accentBg} ${styles.accentText}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {type}
                </span>
                <div className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                  <Flame className={`h-4 w-4 ${styles.accentText}`} />
                  {totalCalories}
                  <span className="text-xs font-medium text-muted-foreground">
                    kcal
                  </span>
                </div>
              </div>

              <div className="mt-2 flex flex-col gap-2.5">
                {dishes.map((dish, index) => (
                  <button
                    key={`${dish.recipeId}-${dish.name}-${index}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const id = dish.sourceId || dish.recipeId;
                      router.push(`/recipe/${id}`);
                    }}
                    className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/60 p-2.5 transition-colors hover:bg-card cursor-pointer"
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-border/40 bg-muted shrink-0">
                      {dish.image ? (
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                          No img
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {dish.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {dish.quantity} {dish.unit}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-semibold text-foreground">
                        {dish.calories || 0} kcal
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
