"use client";

import { ArrowUpDown, Heart } from "lucide-react";
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

interface MealDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: MealPlanItem | null;
  mealType: string;
  dayIndex?: number;
  onSwapClick: (mealType: string, dayIndex?: number) => void;
}

const getMealTypeStyles = (mealType: string) => {
  const styles = {
    Breakfast: "bg-orange-100 text-orange-700 border-orange-200",
    Lunch: "bg-blue-100 text-blue-700 border-blue-200",
    Snack: "bg-purple-100 text-purple-700 border-purple-200",
    Dinner: "bg-red-100 text-red-700 border-red-200",
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
}: MealDetailModalProps) {
  if (!meal) return null;

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
          <div className="flex items-center gap-3">
            <span
              className={`text-sm px-3 py-1 rounded-md font-medium border ${getMealTypeStyles(mealType)}`}
            >
              {mealType}
            </span>
          </div>
          <DialogTitle className="text-left text-xl font-bold">
            {meal.name}
          </DialogTitle>
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
              className="object-cover"
            />
          </div>

          {/* Calories and nutrition info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-600">
                  Calories per serving
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {meal.calories}
                  </span>
                  <span className="text-sm text-gray-500">kcal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              About this meal
            </h3>
            <p className="text-gray-700 leading-relaxed">{meal.description}</p>
          </div>

          {/* Action buttons are placed in the DialogFooter so they stay
        visible and don't get cropped by the scrollable content. */}
        </div>

        <DialogFooter className="mt-4">
          <div className="flex w-full flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300"
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
            <Button className="flex-1">View Full Recipe</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
