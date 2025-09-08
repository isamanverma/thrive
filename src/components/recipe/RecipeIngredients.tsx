"use client";

import Image from "next/image";

interface RecipeIngredientsProps {
  ingredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
    image: string;
    original: string;
  }>;
}

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  if (!ingredients || ingredients.length === 0) {
    return (
      <div className="mb-12">
        <h3 className="mb-6 text-3xl font-bold text-gray-900">Ingredients</h3>
        <div className="text-center py-6">
          <p className="text-gray-500">
            No ingredients available for this recipe.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h3 className="mb-6 text-3xl font-bold text-gray-900">Ingredients</h3>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id || index}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-2 h-24 w-24 rounded-full bg-gray-100 p-2">
              <div className="h-full w-full relative">
                <Image
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image || "ingredient.png"}`}
                  alt={ingredient.name}
                  fill
                  className="object-contain rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/100?text=🥘";
                  }}
                />
              </div>
            </div>
            <span className="font-medium text-sm text-gray-600">
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
