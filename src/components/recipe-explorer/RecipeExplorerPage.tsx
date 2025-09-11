"use client";

import { Recipe, addUserRecipe, searchRecipes } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";

import { CategoryFilters } from "@/components/recipe-explorer/CategoryFilters";
import { LoadMoreButton } from "@/components/recipe-explorer/LoadMoreButton";
import { PersonalizedBanner } from "@/components/recipe-explorer/PersonalizedBanner";
import { RecipeCard } from "@/components/recipe-explorer/RecipeCard";
import { RecipeExplorerHeader } from "@/components/recipe-explorer/RecipeExplorerHeader";
import { RecipeModal } from "@/components/recipe-explorer/RecipeModal";
import { SkeletonLoader } from "@/components/recipe-explorer/SkeletonLoader";
import { toast } from "sonner";

// Sample featured recipes for initial display
const FEATURED_RECIPES: Recipe[] = [
  {
    id: 1001,
    title: "Mediterranean Quinoa Salad",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    readyInMinutes: 25,
    servings: 4,
    diets: ["Vegetarian", "Gluten Free"],
    cuisines: ["Mediterranean"],
    dishTypes: ["lunch", "dinner"],
    summary:
      "A fresh and healthy quinoa salad with Mediterranean flavors, perfect for lunch or dinner.",
  },
  {
    id: 1002,
    title: "Spicy Thai Peanut Noodles",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
    readyInMinutes: 20,
    servings: 3,
    diets: ["Vegan"],
    cuisines: ["Thai"],
    dishTypes: ["lunch", "dinner"],
    summary:
      "Delicious and spicy noodles with a rich peanut sauce and fresh vegetables.",
  },
  {
    id: 1003,
    title: "Creamy Avocado Pasta",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
    readyInMinutes: 15,
    servings: 2,
    diets: ["Vegetarian"],
    cuisines: ["Italian"],
    dishTypes: ["lunch", "dinner"],
    summary:
      "Quick and easy pasta with a creamy avocado sauce that's both healthy and delicious.",
  },
  {
    id: 1004,
    title: "Lemon Herb Roasted Chicken",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    readyInMinutes: 45,
    servings: 6,
    diets: ["Gluten Free"],
    cuisines: ["American"],
    dishTypes: ["dinner"],
    summary:
      "Perfectly roasted chicken with aromatic herbs and fresh lemon for a family meal.",
  },
];

export function RecipeExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("breakfast");
  const [sortBy, setSortBy] = useState("relevance");
  const [recipes, setRecipes] = useState<Recipe[]>(FEATURED_RECIPES);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<Set<number>>(new Set());

  // Initialize with featured recipes
  useEffect(() => {
    setTotalResults(FEATURED_RECIPES.length);
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      // Reset to featured recipes if no search query
      setRecipes(FEATURED_RECIPES);
      setTotalResults(FEATURED_RECIPES.length);
      setOffset(0);
      setHasMore(false);
      return;
    }

    setLoading(true);
    try {
      const response = await searchRecipes({
        q: searchQuery,
        number: 12,
        offset: 0,
      });

      setRecipes(response.results);
      setTotalResults(response.totalResults);
      setOffset(12);
      setHasMore(response.results.length === 12 && response.totalResults > 12);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const handleLoadMore = useCallback(async () => {
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    try {
      const response = await searchRecipes({
        q: searchQuery,
        number: 12,
        offset,
      });

      setRecipes((prev) => [...prev, ...response.results]);
      setOffset((prev) => prev + 12);
      setHasMore(
        response.results.length === 12 && offset + 12 < response.totalResults
      );
    } catch (error) {
      console.error("Load more error:", error);
      toast.error("Failed to load more recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, offset, loading]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setActiveCategory(category);
      if (searchQuery.trim()) {
        // Re-search with new category
        setRecipes([]);
        setOffset(0);
        handleSearch();
      }
    },
    [searchQuery, handleSearch]
  );

  const handleRegenerate = useCallback(() => {
    // TODO: Integrate with memory to get personalized suggestions
    toast.success("Regenerating personalized suggestions...");

    // For now, shuffle the featured recipes
    const shuffled = [...FEATURED_RECIPES].sort(() => Math.random() - 0.5);
    if (!searchQuery.trim()) {
      setRecipes(shuffled);
    }
  }, [searchQuery]);

  const handleSaveRecipe = useCallback(async (recipeId: number) => {
    try {
      await addUserRecipe(recipeId, "saved");
      setSavedRecipes((prev) => new Set([...prev, recipeId]));
      toast.success("Recipe saved to your collection!");
    } catch (error) {
      console.error("Save error:", error);

      // Show specific error message if user needs to complete onboarding
      if (error instanceof Error && error.message.includes("onboarding")) {
        toast.error(
          "Please complete your profile setup first by visiting the onboarding page."
        );
      } else {
        toast.error("Failed to save recipe. Please try again.");
      }
    }
  }, []);

  const handleViewRecipe = useCallback(
    (recipeId: number) => {
      const recipe = recipes.find((r) => r.id === recipeId);
      if (recipe) {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
      }
    },
    [recipes]
  );

  const handleAddToMealPlan = useCallback(async (recipeId: number) => {
    try {
      await addUserRecipe(recipeId, "liked");
      toast.success("Recipe added to your meal plan!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Add to meal plan error:", error);

      // Show specific error message if user needs to complete onboarding
      if (error instanceof Error && error.message.includes("onboarding")) {
        toast.error(
          "Please complete your profile setup first by visiting the onboarding page."
        );
      } else {
        toast.error("Failed to add recipe to meal plan. Please try again.");
      }
    }
  }, []);

  const handleSaveToFavorites = useCallback(async (recipeId: number) => {
    try {
      await addUserRecipe(recipeId, "liked");
      setSavedRecipes((prev) => new Set([...prev, recipeId]));
      toast.success("Recipe saved to favorites!");
    } catch (error) {
      console.error("Save to favorites error:", error);

      // Show specific error message if user needs to complete onboarding
      if (error instanceof Error && error.message.includes("onboarding")) {
        toast.error(
          "Please complete your profile setup first by visiting the onboarding page."
        );
      } else {
        toast.error("Failed to save recipe to favorites. Please try again.");
      }
    }
  }, []);

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <RecipeExplorerHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
        loading={loading}
      />

      {/* Category Filters */}
      <CategoryFilters
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Personalized Banner */}
      <PersonalizedBanner onRegenerate={handleRegenerate} loading={loading} />

      {/* Search Results Summary */}
      {searchQuery.trim() && totalResults > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg inline-block">
            Found{" "}
            <span className="font-semibold text-gray-800">{totalResults}</span>{" "}
            recipes for &quot;{searchQuery}&quot;
          </p>
        </div>
      )}

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            index={index}
            onSave={handleSaveRecipe}
            onView={handleViewRecipe}
            isSaved={savedRecipes.has(recipe.id)}
          />
        ))}

        {/* Loading Skeletons */}
        {loading && <SkeletonLoader count={8} />}
      </div>

      {/* Empty State */}
      {!loading && recipes.length === 0 && searchQuery.trim() && (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">🍽️</span>
          </div>
          <h3 className="text-base font-semibold mb-1">No recipes found</h3>
          <p className="text-sm text-gray-500">
            Try searching with different keywords or check your spelling.
          </p>
        </div>
      )}

      {/* Load More Button */}
      {!loading && recipes.length > 0 && searchQuery.trim() && (
        <LoadMoreButton
          onLoadMore={handleLoadMore}
          loading={loading}
          hasMore={hasMore}
        />
      )}

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToMealPlan={handleAddToMealPlan}
        onSaveToFavorites={handleSaveToFavorites}
        isSaved={selectedRecipe ? savedRecipes.has(selectedRecipe.id) : false}
      />
    </div>
  );
}
