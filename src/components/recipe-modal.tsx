"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Clock, Heart, Users, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  dishTypes: string[];
  nutrition: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
  extendedIngredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
    image: string;
    original: string;
  }>;
  analyzedInstructions: Array<{
    steps: Array<{
      number: number;
      step: string;
    }>;
  }>;
  summary: string;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
}

interface RecipeModalProps {
  recipeId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RecipeModal({ recipeId, isOpen, onClose }: RecipeModalProps) {
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getIngredientImageUrl = (ingredient: {
    name: string;
    image?: string;
  }) => {
    if (ingredient.image) {
      if (ingredient.image.startsWith("http")) {
        return ingredient.image;
      }
      return `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`;
    }

    const cleanName =
      ingredient.name?.toLowerCase().replace(/[^a-z0-9]/g, "-") || "ingredient";
    return `https://spoonacular.com/cdn/ingredients_100x100/${cleanName}.jpg`;
  };

  useEffect(() => {
    if (!recipeId || !isOpen) return;

    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch recipe: ${response.statusText}`);
        }

        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch recipe"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId, isOpen]);

  const handleClose = useCallback(() => {
    setRecipe(null);
    setError(null);
    onClose();
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const getMealType = (dishTypes: string[]) => {
    if (dishTypes.some((type) => type.toLowerCase().includes("breakfast")))
      return "Breakfast";
    if (dishTypes.some((type) => type.toLowerCase().includes("lunch")))
      return "Lunch";
    if (dishTypes.some((type) => type.toLowerCase().includes("dinner")))
      return "Dinner";
    if (dishTypes.some((type) => type.toLowerCase().includes("snack")))
      return "Snack";
    return "Main Course";
  };

  const getNutrient = (name: string) => {
    return recipe?.nutrition?.nutrients?.find((n) => n.name === name);
  };

  const handleSaveToFavorites = async () => {
    console.log("Save to favorites:", recipeId);
  };

  const handleAddToMealPlan = async () => {
    console.log("Add to meal plan:", recipeId);
  };

  const calories = recipe ? getNutrient("Calories") : null;
  const protein = recipe ? getNutrient("Protein") : null;
  const carbs = recipe ? getNutrient("Carbohydrates") : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {loading ? (
                <RecipeModalSkeleton onClose={handleClose} />
              ) : error || !recipe ? (
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Recipe Not Found
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {error || "The recipe you're looking for doesn't exist."}
                  </p>
                  <Button onClick={handleClose} variant="outline">
                    Close
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col h-full min-h-0">
                  {/* Header with Back Button - Fixed */}
                  <div className="relative flex-shrink-0">
                    <div className="aspect-[2/1] relative overflow-hidden">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://via.placeholder.com/800x400?text=Recipe+Image";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Close button in top right */}
                      <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>

                      {/* Title */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <h1 className="text-3xl font-bold text-white mb-2">
                          {recipe.title}
                        </h1>
                        <div className="flex items-center gap-6 text-white/90">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {recipe.readyInMinutes} min
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">
                              {recipe.servings} servings
                            </span>
                          </div>
                          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                            {getMealType(recipe.dishTypes)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content - Scrollable */}
                  <div className="flex-1 overflow-y-auto p-6 min-h-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Content */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* Nutrition Info */}
                        {(calories || protein || carbs) && (
                          <Card>
                            <CardContent className="p-6">
                              <h3 className="text-lg font-semibold mb-4">
                                Nutrition Information
                              </h3>
                              <div className="grid grid-cols-3 gap-4 text-center">
                                {calories && (
                                  <div className="p-3 bg-orange-50 rounded-lg">
                                    <div className="text-2xl font-bold text-orange-600">
                                      {Math.round(calories.amount)}
                                    </div>
                                    <div className="text-sm text-orange-600">
                                      Calories
                                    </div>
                                  </div>
                                )}
                                {protein && (
                                  <div className="p-3 bg-blue-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">
                                      {Math.round(protein.amount)}g
                                    </div>
                                    <div className="text-sm text-blue-600">
                                      Protein
                                    </div>
                                  </div>
                                )}
                                {carbs && (
                                  <div className="p-3 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                      {Math.round(carbs.amount)}g
                                    </div>
                                    <div className="text-sm text-green-600">
                                      Carbs
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* Summary */}
                        {recipe.summary && (
                          <Card>
                            <CardContent className="p-6">
                              <h3 className="text-lg font-semibold mb-4">
                                Description
                              </h3>
                              <div
                                className="text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html: recipe.summary,
                                }}
                              />
                            </CardContent>
                          </Card>
                        )}

                        {/* Instructions */}
                        {recipe.analyzedInstructions &&
                          recipe.analyzedInstructions.length > 0 && (
                            <Card>
                              <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                  Instructions
                                </h3>
                                <div className="space-y-4">
                                  {recipe.analyzedInstructions[0].steps.map(
                                    (step) => (
                                      <div
                                        key={step.number}
                                        className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                                      >
                                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                          {step.number}
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                          {step.step}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          )}
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-6">
                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <Button
                            onClick={handleSaveToFavorites}
                            className="w-full bg-red-500 hover:bg-red-600"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Save to Favorites
                          </Button>
                          <Button
                            onClick={handleAddToMealPlan}
                            variant="outline"
                            className="w-full"
                          >
                            <CalendarPlus className="w-4 h-4 mr-2" />
                            Add to Meal Plan
                          </Button>
                        </div>

                        {/* Ingredients */}
                        {recipe.extendedIngredients &&
                          recipe.extendedIngredients.length > 0 && (
                            <Card>
                              <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                  Ingredients
                                </h3>
                                <div className="space-y-3">
                                  {recipe.extendedIngredients.map(
                                    (ingredient) => (
                                      <div
                                        key={ingredient.id}
                                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                      >
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                                          <Image
                                            src={getIngredientImageUrl(
                                              ingredient
                                            )}
                                            alt={ingredient.name}
                                            width={24}
                                            height={24}
                                            className="object-cover"
                                            onError={(e) => {
                                              const target =
                                                e.target as HTMLImageElement;
                                              if (
                                                !target.src.includes(
                                                  "placeholder"
                                                )
                                              ) {
                                                const altName =
                                                  ingredient.name
                                                    ?.toLowerCase()
                                                    .replace(/\s+/g, "-")
                                                    .replace(
                                                      /[^a-z0-9-]/g,
                                                      ""
                                                    ) || "ingredient";
                                                target.src = `https://spoonacular.com/cdn/ingredients_100x100/${altName}.png`;

                                                target.onerror = () => {
                                                  target.src =
                                                    "https://via.placeholder.com/32x32/f3f4f6/9ca3af?text=🥘";
                                                };
                                              }
                                            }}
                                          />
                                        </div>
                                        <div className="flex-1">
                                          <div className="text-sm font-medium text-gray-900">
                                            {ingredient.name}
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            {ingredient.amount}{" "}
                                            {ingredient.unit}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function RecipeModalSkeleton({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header Skeleton - Fixed */}
      <div className="relative flex-shrink-0">
        <div className="aspect-[2/1] bg-gray-200 animate-pulse relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="h-8 bg-white/20 rounded w-3/4 mb-2" />
            <div className="h-4 bg-white/20 rounded w-1/2" />
          </div>
        </div>
      </div>

      {/* Content Skeleton - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
