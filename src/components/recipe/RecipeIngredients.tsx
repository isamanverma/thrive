"use client";

import Image from "next/image";

interface RecipeIngredientsProps {
  ingredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
    image?: string;
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

  const getIngredientImageUrl = (ingredient: {
    name: string;
    image?: string;
  }) => {
    // If ingredient has an image property from the database, use it
    if (ingredient.image) {
      // Handle both full URLs and just filenames
      if (ingredient.image.startsWith("http")) {
        return ingredient.image;
      }
      // Use Spoonacular CDN with the stored image filename
      return `https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`;
    }

    // Fallback: try to generate image URL from ingredient name
    const cleanName =
      ingredient.name?.toLowerCase().replace(/[^a-z0-9]/g, "-") || "ingredient";
    return `https://img.spoonacular.com/ingredients_100x100/${cleanName}.jpg`;
  };

  return (
    <div className="mb-12">
      <h3 className="mb-6 text-3xl font-bold text-gray-900">Ingredients</h3>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id || index}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-2 h-24 w-24 rounded-full bg-gray-100 p-2 overflow-hidden">
              <div className="h-full w-full relative">
                <Image
                  src={getIngredientImageUrl(ingredient)}
                  alt={ingredient.name}
                  fill
                  className="object-contain rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Try alternative URL formats if the first one fails
                    if (!target.src.includes("placeholder")) {
                      // Try different file extensions
                      if (target.src.includes(".jpg")) {
                        target.src = target.src.replace(".jpg", ".png");
                      } else if (target.src.includes(".png")) {
                        // If both jpg and png fail, use a generic food placeholder
                        target.src =
                          "https://via.placeholder.com/100x100/f3f4f6/9ca3af?text=🥘";
                      }
                    }
                  }}
                />
              </div>
            </div>
            <span className="font-medium text-sm text-gray-600 text-center">
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
