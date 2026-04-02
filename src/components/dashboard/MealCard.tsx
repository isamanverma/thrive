"use client";

import { Bookmark, Check, Repeat } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface Meal {
  id: string;
  name: string;
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  image: string;
  completed?: boolean;
  spoonacularId?: number;
}

interface MealCardProps {
  meal: Meal;
  onToggleComplete?: (id: string) => void;
  onRepeat?: (id: string) => void;
  onSave?: (id: string) => void;
}

export function MealCard({
  meal,
  onToggleComplete,
  onRepeat,
  onSave,
}: MealCardProps) {
  const router = useRouter();

  const handleMealClick = () => {
    if (meal.spoonacularId) {
      router.push(`/recipe/${meal.spoonacularId}`);
    }
  };

  const isClickable = !!meal.spoonacularId;

  return (
    <div
      className={`flex items-center gap-4 py-3 ${isClickable ? "cursor-pointer" : ""}`}
      onClick={handleMealClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleMealClick();
        }
      }}
    >
      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
        <Image
          src={meal.image}
          alt={meal.name}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4
          className={`font-medium truncate ${meal.completed ? "line-through opacity-50" : ""}`}
        >
          {meal.name}
        </h4>
        <Badge variant="secondary" className="mt-1">
          {meal.type}
        </Badge>
      </div>
      <div
        className="flex items-center gap-1 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-full ${
            meal.completed
              ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
              : "hover:bg-muted"
          }`}
          onClick={() => onToggleComplete?.(meal.id)}
          aria-label="Mark meal complete"
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-muted"
          onClick={() => onRepeat?.(meal.id)}
          aria-label="Repeat meal"
        >
          <Repeat className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-muted"
          onClick={() => onSave?.(meal.id)}
          aria-label="Save meal"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
