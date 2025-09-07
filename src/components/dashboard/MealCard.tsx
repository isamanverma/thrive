"use client";

import { Bookmark, Check, Repeat } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MagicCard } from "@/components/magicui/magic-card";

export interface Meal {
  id: string;
  name: string;
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  image: string;
  completed?: boolean;
  ingredients?: string[];
}

interface MealCardProps {
  meal: Meal;
  onToggleComplete?: (id: string) => void;
  onRepeat?: (id: string) => void;
  onSave?: (id: string) => void;
  showIngredients?: boolean;
}

export function MealCard({
  meal,
  onToggleComplete,
  onRepeat,
  onSave,
  showIngredients = false,
}: MealCardProps) {
  return (
    <MagicCard className="bg-gray-50 p-4 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{meal.name}</h4>
          <p className="text-sm text-gray-500">{meal.type}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 rounded-full ${
              meal.completed
                ? "bg-green-100 text-green-600 hover:bg-green-200"
                : "hover:bg-gray-200"
            }`}
            onClick={() => onToggleComplete?.(meal.id)}
          >
            <Check className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 rounded-full hover:bg-gray-200"
            onClick={() => onRepeat?.(meal.id)}
          >
            <Repeat className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 rounded-full hover:bg-gray-200"
            onClick={() => onSave?.(meal.id)}
          >
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {showIngredients && meal.ingredients && meal.ingredients.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm font-semibold mb-2">Ingredients:</p>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {meal.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </MagicCard>
  );
}
