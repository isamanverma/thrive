"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";
import { MealPlanItem } from "./MealPlanCard";

interface MealSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: string;
  availableMeals: MealPlanItem[];
  onMealSelect: (meal: MealPlanItem) => void;
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

export function MealSwapModal({
  isOpen,
  onClose,
  mealType,
  availableMeals,
  onMealSelect,
}: MealSwapModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="space-y-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span
              className={`text-sm px-3 py-1 rounded-md font-medium border ${getMealTypeStyles(mealType)}`}
            >
              {mealType}
            </span>
          </div>
          <DialogTitle className="text-left text-lg">
            Choose a replacement
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {availableMeals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:border-gray-300"
                onClick={() => onMealSelect(meal)}
              >
                {/* Image */}
                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                  <Image
                    src={meal.image || "/placeholder.svg"}
                    alt={meal.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">
                    {meal.name}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {meal.description}
                  </p>

                  {/* Calories */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Calories</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-gray-900">
                        {meal.calories}
                      </span>
                      <span className="text-xs text-gray-500">kcal</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {availableMeals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No alternative meals available for {mealType.toLowerCase()}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
