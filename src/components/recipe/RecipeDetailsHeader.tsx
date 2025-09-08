"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecipeDetailsHeaderProps {
  recipe: {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
    dishTypes: string[];
    cuisines?: string[];
    diets?: string[];
    nutrition: {
      nutrients: Array<{
        name: string;
        amount: number;
        unit: string;
      }>;
    };
    summary: string;
  };
}

export function RecipeDetailsHeader({ recipe }: RecipeDetailsHeaderProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveToFavorites = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save functionality
  };

  const handleAddToMealPlan = () => {
    // TODO: Implement add to meal plan functionality
  };

  const getNutrient = (name: string) => {
    return recipe?.nutrition?.nutrients?.find((n) => n.name === name);
  };

  const calories = getNutrient("Calories");
  const protein = getNutrient("Protein");
  const carbs = getNutrient("Carbohydrates");

  const mealType =
    recipe.dishTypes && recipe.dishTypes.length > 0
      ? recipe.dishTypes[0].charAt(0).toUpperCase() +
        recipe.dishTypes[0].slice(1)
      : "Lunch/Dinner";

  const sanitizedSummary = recipe.summary
    ? recipe.summary.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 200) + "..."
    : "A refreshing and healthy recipe perfect for a light lunch or side dish.";

  return (
    <div className="sticky top-28">
      <h2 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900">
        {recipe.title}
      </h2>
      <p className="mb-6 text-lg text-gray-600">{sanitizedSummary}</p>

      <div className="mb-8 overflow-hidden rounded-2xl">
        <Image
          alt={recipe.title}
          className="h-auto w-full object-cover"
          src={recipe.image}
          width={600}
          height={400}
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3";
          }}
        />
      </div>

      <div className="rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
          <div>
            <span className="text-sm font-medium text-green-800">
              Meal Type
            </span>
            <p className="text-lg font-bold text-green-700">{mealType}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-green-800">Calories</span>
            <p className="text-lg font-bold text-green-700">
              {calories ? Math.round(calories.amount) : "350"} kcal
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-green-800">Protein</span>
            <p className="text-lg font-bold text-green-700">
              {protein ? Math.round(protein.amount) : "15"}g
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-green-800">Carbs</span>
            <p className="text-lg font-bold text-green-700">
              {carbs ? Math.round(carbs.amount) : "45"}g
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-2xl font-bold text-gray-900">Actions</h3>
        <div className="space-y-4">
          <Button
            onClick={handleSaveToFavorites}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            Save to Favorites
          </Button>
          <Button
            onClick={handleAddToMealPlan}
            variant="outline"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-600 bg-green-50 px-5 py-3 text-base font-semibold text-green-600 shadow-sm transition-colors hover:bg-green-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <CalendarPlus className="h-5 w-5" />
            Add to Meal Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
