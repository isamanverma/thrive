"use client";

import { Card, CardContent } from "@/components/ui/card";

import React from "react";

interface RecipeCardProps {
  imageUrl: string;
  category: string;
  title: string;
}

function RecipeCard({ imageUrl, category, title }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow border-0 bg-white group cursor-pointer">
      <div
        className="w-full h-32 sm:h-40 bg-center bg-no-repeat bg-cover group-hover:scale-105 transition-transform duration-200"
        style={{
          backgroundImage: `url("${imageUrl}")`,
        }}
      />
      <CardContent className="p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-green-600 font-medium">
          {category}
        </p>
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mt-1 group-hover:text-green-700 transition-colors">
          {title}
        </h3>
      </CardContent>
    </Card>
  );
}

interface SavedSuggestedRecipesProps {
  recipes: RecipeCardProps[];
}

export function SavedSuggestedRecipes({ recipes }: SavedSuggestedRecipesProps) {
  return (
    <section className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
        Saved &amp; Suggested Recipes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            imageUrl={recipe.imageUrl}
            category={recipe.category}
            title={recipe.title}
          />
        ))}
      </div>
    </section>
  );
}
