"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Search, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { MealPlanItem } from "./MealPlanCard";
import { Skeleton } from "@/components/ui/skeleton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
  const [hoveredMeal, setHoveredMeal] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredMeals = useMemo(() => {
    if (!searchQuery.trim()) return availableMeals;
    return availableMeals.filter(
      (meal) =>
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        generateIngredients(meal.name).some((ingredient) =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [availableMeals, searchQuery]);

  // Focus search input when drawer opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, meal: MealPlanItem) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onMealSelect(meal);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent
        className="mx-auto max-w-7xl max-h-[90vh] flex flex-col bg-background"
        aria-labelledby="swap-modal-title"
        aria-describedby="swap-modal-description"
      >
        <DrawerHeader className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={`${getMealTypeStyles(mealType)} font-semibold px-3 py-1`}
              >
                <ChefHat className="w-4 h-4 mr-2" aria-hidden="true" />
                {mealType}
              </Badge>
              <DrawerTitle id="swap-modal-title">
                <VisuallyHidden>Swap Meal</VisuallyHidden>
              </DrawerTitle>
            </div>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close meal swap modal"
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>

          <div className="mt-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                aria-hidden="true"
              />
              <Input
                ref={searchInputRef}
                placeholder={`Search ${mealType.toLowerCase()} options...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
                aria-label={`Search ${mealType.toLowerCase()} meal options`}
                aria-describedby="swap-modal-description"
              />
            </div>
            <p id="swap-modal-description" className="sr-only">
              Search and select a {mealType.toLowerCase()} meal to replace the
              current one
            </p>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <BlurFade key={index} delay={index * 0.1} inView>
                  <Card className="overflow-hidden">
                    <Skeleton className="w-full h-48 rounded-none" />
                    <CardContent className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-full mb-1" />
                      <Skeleton className="h-3 w-2/3 mb-3" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </CardContent>
                  </Card>
                </BlurFade>
              ))}
            </div>
          ) : filteredMeals.length > 0 ? (
            <>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  {filteredMeals.length} meal
                  {filteredMeals.length !== 1 ? "s" : ""} available
                </p>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                role="grid"
                aria-label={`Available ${mealType.toLowerCase()} meals`}
              >
                {filteredMeals.map((meal, index) => (
                  <BlurFade key={meal.id} delay={index * 0.05} inView>
                    <Card
                      className="h-full cursor-pointer group relative overflow-hidden hover:shadow-lg transition-all duration-200"
                      role="gridcell"
                      tabIndex={0}
                      onClick={() => onMealSelect(meal)}
                      onKeyDown={(e) => handleKeyDown(e, meal)}
                      onMouseEnter={() => setHoveredMeal(meal.id)}
                      onMouseLeave={() => setHoveredMeal(null)}
                      aria-label={`Select ${meal.name}, ${meal.calories} calories`}
                    >
                      <div className="relative">
                        <div className="w-full h-48 overflow-hidden">
                          <Image
                            src={meal.image || "/placeholder.svg"}
                            alt={meal.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Ingredients overlay */}
                        {hoveredMeal === meal.id && (
                          <div className="absolute inset-0 bg-black/80 flex flex-col justify-center p-4">
                            <h4 className="text-white font-semibold text-sm mb-2">
                              Ingredients
                            </h4>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                              {generateIngredients(meal.name).map(
                                (ingredient, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-2 text-white/90 text-xs"
                                  >
                                    <div className="w-1 h-1 bg-green-400 rounded-full flex-shrink-0" />
                                    <span>{ingredient}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {meal.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {meal.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-xs text-muted-foreground font-medium">
                            Calories
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-bold text-foreground">
                              {meal.calories}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              kcal
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </BlurFade>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <ChefHat className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {searchQuery
                  ? "No meals found"
                  : "No alternative meals available"}
              </h3>
              <p className="text-muted-foreground max-w-md">
                {searchQuery
                  ? `No ${mealType.toLowerCase()} options match "${searchQuery}". Try a different search term.`
                  : `There are currently no alternative ${mealType.toLowerCase()} options available.`}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
