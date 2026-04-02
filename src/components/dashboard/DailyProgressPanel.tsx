"use client";

import { Check, Circle } from "lucide-react";
import { CalorieRing } from "./CalorieRing";

interface DailyProgressPanelProps {
  caloriesConsumed: number;
  caloriesTarget: number;
  meals: { type: string; completed: boolean }[];
  exerciseDuration: number;
  exerciseCompleted: number;
  exerciseTotal: number;
}

const mealTypeOrder = ["Breakfast", "Lunch", "Dinner", "Snack"];

export function DailyProgressPanel({
  caloriesConsumed,
  caloriesTarget,
  meals,
  exerciseDuration,
  exerciseCompleted,
  exerciseTotal,
}: DailyProgressPanelProps) {
  const completedMeals = meals.filter((m) => m.completed).length;
  const totalMeals = meals.length;
  const exerciseProgress =
    exerciseTotal > 0 ? (exerciseCompleted / exerciseTotal) * 100 : 0;

  return (
    <div className="border-t border-b py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
        {/* Calories */}
        <div className="flex items-center gap-6 px-4 py-3 md:py-0">
          <CalorieRing consumed={caloriesConsumed} target={caloriesTarget} />
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Calories</span>
            <span className="text-xs text-muted-foreground mt-1">kcal</span>
          </div>
        </div>

        {/* Meals */}
        <div className="flex flex-col gap-3 px-4 py-3 md:py-0">
          <div>
            <span className="text-sm text-muted-foreground">Meals</span>
            <p className="text-lg font-semibold tabular-nums">
              {completedMeals} of {totalMeals} completed
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {mealTypeOrder.map((type) => {
              const meal = meals.find((m) => m.type === type);
              const isCompleted = meal?.completed ?? false;
              return (
                <div key={type} className="flex items-center gap-1.5">
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5 text-amber-500" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-muted-foreground/40" />
                  )}
                  <span className="text-xs text-muted-foreground">{type}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exercise */}
        <div className="flex flex-col gap-3 px-4 py-3 md:py-0">
          <div>
            <span className="text-sm text-muted-foreground">Exercise</span>
            <p className="text-lg font-semibold tabular-nums">
              {exerciseCompleted} of {exerciseTotal} done
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">
              {exerciseDuration} min planned
            </span>
            <div className="w-full bg-amber-500/20 rounded-full h-1.5">
              <div
                className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${exerciseProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
