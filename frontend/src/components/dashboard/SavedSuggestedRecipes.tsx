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
    <Card className="overflow-hidden group p-0">
      <div
        className="w-full h-40 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url("${imageUrl}")`,
        }}
      ></div>
      <CardContent className="p-4">
        <p className="text-sm text-gray-500">{category}</p>
        <h3 className="text-base font-semibold text-gray-800 mt-1">{title}</h3>
      </CardContent>
    </Card>
  );
}

interface SavedSuggestedRecipesProps {
  recipes: RecipeCardProps[];
}

export function SavedSuggestedRecipes({ recipes }: SavedSuggestedRecipesProps) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
        Saved &amp; Suggested Recipes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
