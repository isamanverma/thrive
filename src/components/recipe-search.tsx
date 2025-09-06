"use client";

import { Bookmark, ChefHat, Clock, Heart, Search, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recipe, addUserRecipe, searchRecipes } from "@/lib/api";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface RecipeSearchProps {
  className?: string;
}

export function RecipeSearch({ className }: RecipeSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await searchRecipes({
        q: searchQuery,
        number: 12,
        offset: 0,
      });

      setRecipes(response.results);
      setTotalResults(response.totalResults);
    } catch (error) {
      console.error("Search error:", error);
      alert("Failed to search recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLikeRecipe = async (recipeId: number) => {
    try {
      await addUserRecipe(recipeId, "liked");
      alert("Recipe added to your liked recipes!");
    } catch (error) {
      console.error("Like error:", error);
      alert("Failed to like recipe. Please try again.");
    }
  };

  const handleSaveRecipe = async (recipeId: number) => {
    try {
      await addUserRecipe(recipeId, "saved");
      alert("Recipe saved to your collection!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save recipe. Please try again.");
    }
  };

  const handleCookRecipe = async (recipeId: number) => {
    try {
      await addUserRecipe(recipeId, "cooked");
      alert("Recipe marked as cooked!");
    } catch (error) {
      console.error("Cook error:", error);
      alert("Failed to mark recipe as cooked. Please try again.");
    }
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search for recipes... (e.g., 'pasta', 'chicken curry', 'vegetarian')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 pr-24 h-12 text-base border-2 focus:border-green-500 transition-colors"
          />
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700"
            size="sm"
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {totalResults > 0 && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg inline-block">
            Found{" "}
            <span className="font-semibold text-foreground">
              {totalResults}
            </span>{" "}
            recipes
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-card shadow-md"
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://via.placeholder.com/300x200?text=Recipe+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2 group-hover:text-green-600 transition-colors">
                {recipe.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                {recipe.summary?.replace(/<[^>]*>/g, "") ||
                  "Delicious recipe to try!"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.readyInMinutes || 30} min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings || 4} servings</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {recipe.diets?.slice(0, 2).map((diet) => (
                  <span
                    key={diet}
                    className="px-2.5 py-1 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 rounded-full text-xs font-medium"
                  >
                    {diet}
                  </span>
                ))}
                {recipe.cuisines?.slice(0, 1).map((cuisine) => (
                  <span
                    key={cuisine}
                    className="px-2.5 py-1 border border-border rounded-full text-xs font-medium bg-background"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`/recipes/${recipe.id}`, "_blank")}
                  className="hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors"
                >
                  View Recipe
                </Button>

                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikeRecipe(recipe.id)}
                    className="p-2 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSaveRecipe(recipe.id)}
                    className="p-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCookRecipe(recipe.id)}
                    className="p-2 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <ChefHat className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden border-0 shadow-md">
              <div className="aspect-video bg-muted animate-pulse" />
              <CardHeader className="space-y-3">
                <div className="h-5 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-3 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-8 w-20 bg-muted rounded animate-pulse" />
                  <div className="flex gap-1">
                    <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                    <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                    <div className="h-8 w-8 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading &&
        recipes.length === 0 &&
        totalResults === 0 &&
        searchQuery && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground">
              Try searching with different keywords or check your spelling.
            </p>
          </div>
        )}
    </div>
  );
}
