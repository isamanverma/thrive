"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Search } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { MealPlanItem } from "./MealPlanCard";
import { Skeleton } from "@/components/ui/skeleton";

interface MealSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: string;
  availableMeals: MealPlanItem[];
  onMealSelect: (meal: MealPlanItem) => void;
  isLoading?: boolean;
}

const getMealTypeStyles = (mealType: string) => {
  const styles = {
    Breakfast:
      "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200",
    Lunch: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
    Snack:
      "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
    Dinner: "bg-red-100 text-red-700 border-red-200 hover:bg-red-200",
  };
  return styles[mealType as keyof typeof styles] || styles.Lunch;
};

// Mock ingredients generator based on meal name
const generateIngredients = (mealName: string): string[] => {
  const ingredientMap: Record<string, string[]> = {
    "Greek Yogurt Parfait": [
      "Greek yogurt",
      "Granola",
      "Mixed berries",
      "Honey",
    ],
    "Oatmeal with Berries": ["Rolled oats", "Mixed berries", "Milk", "Honey"],
    "Scrambled Eggs": ["Eggs", "Butter", "Fresh herbs", "Salt & pepper"],
    "Green Smoothie": ["Spinach", "Banana", "Mango", "Coconut water"],
    Pancakes: ["Flour", "Eggs", "Milk", "Baking powder", "Butter"],
    "Grilled Chicken Salad": [
      "Chicken breast",
      "Mixed greens",
      "Cherry tomatoes",
      "Cucumber",
    ],
    "Quinoa Bowl": ["Quinoa", "Roasted vegetables", "Avocado", "Tahini"],
    "Veggie Wrap": ["Tortilla", "Hummus", "Mixed vegetables", "Spinach"],
    "Turkey Sandwich": ["Turkey", "Whole grain bread", "Lettuce", "Tomato"],
    "Caesar Salad": [
      "Romaine lettuce",
      "Parmesan",
      "Croutons",
      "Caesar dressing",
    ],
    "Mixed Nuts": ["Almonds", "Walnuts", "Cashews", "Pecans"],
    "Fruit Bowl": ["Apple", "Orange", "Berries", "Grapes"],
    "Protein Bar": ["Oats", "Protein powder", "Nuts", "Dates"],
    "Hummus & Veggies": ["Hummus", "Carrots", "Cucumber", "Bell peppers"],
    "Yogurt & Berries": [
      "Greek yogurt",
      "Mixed berries",
      "Granola",
      "Chia seeds",
    ],
    "Grilled Salmon": ["Salmon fillet", "Lemon", "Herbs", "Olive oil"],
    "Pasta Primavera": ["Pasta", "Mixed vegetables", "Olive oil", "Parmesan"],
    "Stir Fry": ["Mixed vegetables", "Brown rice", "Soy sauce", "Ginger"],
    "Chicken Curry": ["Chicken", "Coconut milk", "Curry spices", "Rice"],
    "Beef Tacos": ["Ground beef", "Taco shells", "Lettuce", "Cheese", "Salsa"],
  };

  // Return specific ingredients if meal is in map, otherwise generate generic ones
  return (
    ingredientMap[mealName] || [
      "Fresh ingredients",
      "Quality proteins",
      "Healthy fats",
      "Complex carbs",
    ]
  );
};

export function MealSwapModal({
  isOpen,
  onClose,
  mealType,
  availableMeals,
  onMealSelect,
  isLoading = false,
}: MealSwapModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMeals = useMemo(() => {
    if (!searchQuery.trim()) return availableMeals;
    return availableMeals.filter(
      (meal) =>
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [availableMeals, searchQuery]);

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[85vh] flex flex-col">
        <DrawerHeader className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={`${getMealTypeStyles(mealType)} font-medium`}
              >
                {mealType}
              </Badge>
              <DrawerTitle className="text-xl font-semibold text-gray-900">
                Choose a replacement meal
              </DrawerTitle>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={`Search ${mealType.toLowerCase()} options...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="overflow-hidden h-48">
                  <CardContent className="p-0 h-full flex flex-col">
                    <Skeleton className="w-full h-24 rounded-none flex-shrink-0" />
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <Skeleton className="h-3 w-3/4 mb-2" />
                        <Skeleton className="h-2 w-full mb-1" />
                        <Skeleton className="h-2 w-2/3" />
                      </div>
                      <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-100">
                        <Skeleton className="h-2 w-12" />
                        <Skeleton className="h-3 w-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredMeals.length > 0 ? (
            <>
              <div className="text-sm text-gray-600 pt-4 pb-2">
                {filteredMeals.length} meal
                {filteredMeals.length !== 1 ? "s" : ""} available
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pb-4">
                {filteredMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className="group perspective-1000 cursor-pointer"
                    onClick={() => onMealSelect(meal)}
                  >
                    <div className="relative w-full h-48 transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                      {/* Front Side */}
                      <Card className="absolute inset-0 w-full h-full backface-hidden overflow-hidden border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 active:scale-[0.98]">
                        <CardContent className="p-0 h-full flex flex-col">
                          {/* Image */}
                          <div className="relative w-full h-24 overflow-hidden flex-shrink-0">
                            <Image
                              src={meal.image || "/placeholder.svg"}
                              alt={meal.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-3 flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="font-medium text-xs text-gray-900 line-clamp-2 leading-tight mb-1">
                                {meal.name}
                              </h4>
                              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                {meal.description}
                              </p>
                            </div>

                            {/* Calories */}
                            <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100">
                              <span className="text-xs text-gray-500 font-medium">
                                Calories
                              </span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-sm font-bold text-gray-900">
                                  {meal.calories}
                                </span>
                                <span className="text-xs text-gray-500">
                                  kcal
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Back Side - Ingredients */}
                      <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 overflow-hidden border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-md">
                        <CardContent className="p-3 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-xs text-gray-900 line-clamp-1">
                              {meal.name}
                            </h4>
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border-green-200"
                            >
                              Ingredients
                            </Badge>
                          </div>

                          <div className="flex-1 space-y-1">
                            {generateIngredients(meal.name).map(
                              (ingredient, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 text-xs text-gray-700"
                                >
                                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
                                  <span className="line-clamp-1">
                                    {ingredient}
                                  </span>
                                </div>
                              )
                            )}
                          </div>

                          <div className="pt-2 mt-2 border-t border-gray-100">
                            <div className="text-center">
                              <span className="text-xs text-gray-500">
                                Click to select
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ChefHat className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery
                  ? "No meals found"
                  : "No alternative meals available"}
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                {searchQuery
                  ? `No ${mealType.toLowerCase()} options match "${searchQuery}". Try a different search term.`
                  : `There are currently no alternative ${mealType.toLowerCase()} options available.`}
              </p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
