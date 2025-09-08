"use client";

import { ArrowUpDown, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

        <div className="space-y-6 mt-2">
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

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
