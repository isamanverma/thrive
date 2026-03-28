import type { Dish, MealTypeCapitalized } from "./types";
import { Flame } from "lucide-react";
import React from "react";

interface MealSlotCardProps {
  dishes: Dish[];
  mealType: MealTypeCapitalized;
  dayIndex: number;
  onClick: () => void;
  isSquare?: boolean;
}

const mealTypeAccents: Record<
  MealTypeCapitalized,
  { dot: string; badge: string; border: string }
> = {
  Breakfast: {
    dot: "bg-orange-400",
    badge: "text-orange-600",
    border: "border-orange-500/20",
  },
  Lunch: {
    dot: "bg-blue-400",
    badge: "text-blue-600",
    border: "border-blue-500/20",
  },
  Snack: {
    dot: "bg-orange-400",
    badge: "text-orange-600",
    border: "border-orange-500/20",
  },
  Dinner: {
    dot: "bg-red-400",
    badge: "text-red-600",
    border: "border-red-500/20",
  },
};

function MealSlotCardInner({
  dishes,
  mealType,
  onClick,
  isSquare,
}: MealSlotCardProps) {
  const accents = mealTypeAccents[mealType];
  const totalCalories = dishes.reduce((sum, d) => sum + (d.calories || 0), 0);
  const visibleDishes = dishes.slice(0, 3);
  const remaining = dishes.length - visibleDishes.length;

  const cardClass = isSquare
    ? `border-2 border-dashed ${accents.border} bg-card p-2.5 h-full min-h-0 w-full overflow-hidden flex flex-col justify-between`
    : "border border-border/50 bg-card p-2.5";

  const innerClass = isSquare
    ? "flex flex-col h-full min-h-0"
    : "flex flex-col gap-1.5 flex-1 min-h-0";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl cursor-pointer transition-colors hover:bg-muted/50 text-left self-stretch ${cardClass}`}
    >
      {isSquare ? (
        <div className="flex flex-col h-full min-h-0">
          <div className="flex flex-col gap-0.5 overflow-hidden min-h-0">
            {visibleDishes.map((dish, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${accents.dot} flex-shrink-0`}
                />
                <span className="text-[10px] text-foreground truncate leading-snug">
                  {dish.name}
                </span>
              </div>
            ))}
            {remaining > 0 && (
              <span className="text-[9px] text-muted-foreground">
                +{remaining} more
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 pt-1 mt-auto border-t border-border/30">
            <Flame className={`w-3 h-3 ${accents.badge}`} />
            <span className={`text-[10px] font-semibold ${accents.badge}`}>
              {totalCalories}
            </span>
            <span className="text-[9px] text-muted-foreground">kcal</span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1.5 flex-1 min-h-0">
            {visibleDishes.map((dish, i) => (
              <div key={i} className="flex items-start gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${accents.dot} mt-1.5 flex-shrink-0`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground truncate leading-tight">
                    {dish.name}
                  </p>
                  {dish.quantity !== 1 || dish.unit !== "serving" ? (
                    <p className="text-[10px] text-muted-foreground">
                      {dish.quantity} {dish.unit}
                      {dish.quantity !== 1 ? "s" : ""}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
            {remaining > 0 && (
              <p className="text-[10px] text-muted-foreground pl-3.5">
                +{remaining} more
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 mt-2 border-t border-border/40">
            <span className="text-[10px] text-muted-foreground">
              {dishes.length} dish{dishes.length !== 1 ? "es" : ""}
            </span>
            <div className="flex items-center gap-1">
              <Flame className={`w-3 h-3 ${accents.badge}`} />
              <span className={`text-xs font-semibold ${accents.badge}`}>
                {totalCalories}
              </span>
              <span className="text-[10px] text-muted-foreground">kcal</span>
            </div>
          </div>
        </>
      )}
    </button>
  );
}

export const MealSlotCard = React.memo(MealSlotCardInner);
