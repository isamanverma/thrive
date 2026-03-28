"use client";

import { ArrowUpDown, Heart, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MealPlanItem } from "./MealPlanCard";
import { useState } from "react";

interface MealDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: MealPlanItem | null;
  mealType: string;
  dayIndex?: number;
  onSwapClick: (mealType: string, dayIndex?: number) => void;
  onDelete: () => void;
}

const getMealTypeStyles = (mealType: string) => {
  const styles = {
    Breakfast:
      "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700",
    Lunch:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700",
    Snack:
      "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700",
    Dinner:
      "bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700",
  };
  return styles[mealType as keyof typeof styles] || styles.Lunch;
};

export function MealDetailModal({
  isOpen,
  onClose,
  meal,
  mealType,
  dayIndex,
  onSwapClick,
  onDelete,
}: MealDetailModalProps) {
  // Strip simple HTML tags and collapse whitespace for nicer display
  const stripHtml = (input?: string) => {
    if (!input) return "";
    const noTags = input.replace(/<[^>]*>/g, "");
    return noTags
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
  };

  const [expanded, setExpanded] = useState(false);

  if (!meal) return null;

  // Extract macros (protein, carbs, fat) from possible nutrition shapes
  const getMacro = (name: string): { amount: number; unit?: string } | null => {
    const nut = (meal as unknown as { nutrition?: unknown })
      .nutrition as unknown;
    if (!nut || typeof nut !== "object") return null;
    // Check normalized calories style: { calories: number }
    // Also support nutrients array: [{ name: 'Protein', amount: 10, unit: 'g' }, ...]
    if (Array.isArray((nut as { nutrients?: unknown }).nutrients)) {
      const nutrients = (nut as { nutrients?: unknown }).nutrients as unknown[];
      for (const n of nutrients) {
        if (!n || typeof n !== "object") continue;
        const obj = n as { name?: unknown; amount?: unknown; unit?: unknown };
        if (
          typeof obj.name === "string" &&
          obj.name.toLowerCase() === name.toLowerCase() &&
          typeof obj.amount === "number"
        ) {
          return {
            amount: obj.amount,
            unit: typeof obj.unit === "string" ? obj.unit : undefined,
          };
        }
      }
    }

    // If meal has a flattened nutrition like { protein: 10, carbs: 20, fat: 5 }
    const lower = name.toLowerCase();
    const maybe = nut as { [k: string]: unknown };
    if (typeof maybe[lower] === "number")
      return { amount: maybe[lower] as number };

    return null;
  };

  const protein = getMacro("Protein");
  const carbs =
    getMacro("Carbohydrates") || getMacro("Carb") || getMacro("Carbs");
  const fat = getMacro("Fat");

  const handleSwapClick = () => {
    onSwapClick(mealType, dayIndex);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Keep the DialogContent itself overflow-hidden to avoid double scrollbars
          and move the scrollable area to an inner wrapper that can be sized
          relative to the available modal height. */}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden overflow-x-hidden">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center">
              <span
                className={`text-sm px-3 py-1 rounded-md font-medium border ${getMealTypeStyles(mealType)}`}
              >
                {mealType}
              </span>
            </div>

            <DialogTitle className="text-left text-xl font-bold ml-3 flex-1">
              {meal.name}
            </DialogTitle>

            {/* Removed header delete button - it's placed near calories below to avoid collision with close control */}
          </div>
        </DialogHeader>

        {/* Inner scroll container: only this element scrolls when content
      exceeds the modal max height. The max height is slightly smaller
      than the modal to account for padding/header. */}
        <div className="space-y-6 mt-2 overflow-y-auto overflow-x-hidden max-h-[82vh] min-w-0">
          {/* Image */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={meal.image || "/placeholder.svg"}
              alt={meal.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Calories and nutrition info */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">
                  Calories per serving
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {meal.calories}
                  </span>
                  <span className="text-sm text-muted-foreground">kcal</span>
                </div>
              </div>
              {/* Macro chips: show only if value exists */}
              <div className="flex items-center gap-2 ml-4">
                {protein && (
                  <span className="inline-flex items-center text-xs font-medium text-green-800 bg-green-50 border border-green-100 px-2 py-1 rounded-full">
                    <span className="font-semibold mr-1">Protein</span>
                    {Math.round(protein.amount)}
                    {protein.unit ? ` ${protein.unit}` : ""}
                  </span>
                )}
                {carbs && (
                  <span className="inline-flex items-center text-xs font-medium text-blue-800 bg-blue-50 border border-blue-100 px-2 py-1 rounded-full">
                    <span className="font-semibold mr-1">Carbs</span>
                    {Math.round(carbs.amount)}
                    {carbs.unit ? ` ${carbs.unit}` : ""}
                  </span>
                )}
                {fat && (
                  <span className="inline-flex items-center text-xs font-medium text-amber-800 bg-amber-50 border border-amber-100 px-2 py-1 rounded-full">
                    <span className="font-semibold mr-1">Fat</span>
                    {Math.round(fat.amount)}
                    {fat.unit ? ` ${fat.unit}` : ""}
                  </span>
                )}
              </div>

              <div className="flex items-center">
                <button
                  aria-label="Delete meal"
                  onClick={() => onDelete()}
                  className="inline-flex items-center justify-center p-2 rounded-md bg-red-50 border border-red-200 text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              About this meal
            </h3>
            <p
              className={`text-foreground leading-relaxed ${expanded ? "" : "line-clamp-4"}`}
            >
              {stripHtml(meal.description)}
            </p>
            {stripHtml(meal.description).length > 240 && (
              <div className="mt-2">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setExpanded((s) => !s)}
                >
                  {expanded ? "Show less" : "Read more"}
                </button>
              </div>
            )}
          </div>

          {/* Action buttons are placed in the DialogFooter so they stay
        visible and don't get cropped by the scrollable content. */}
        </div>

        <DialogFooter className="mt-4">
          <div className="flex w-full flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 hover:border-orange-300"
              onClick={handleSwapClick}
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Swap Meal
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300"
            >
              <Heart className="w-4 h-4 mr-2" />
              Add to Favorites
            </Button>
            <Button
              className="flex-1"
              onClick={async () => {
                if (meal?.id) {
                  try {
                    // Warm cache by calling the API route
                    await fetch(`/api/recipes/${meal.id}`, { method: "GET" });
                  } catch {
                    // Ignore network errors, navigation will still proceed
                  }
                  // Navigate to recipe page
                  window.location.href = `/recipe/${meal.id}`;
                }
              }}
            >
              View Full Recipe
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
