"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RecipeDetailsHeader } from "@/components/recipe/RecipeDetailsHeader";
import { RecipeIngredients } from "@/components/recipe/RecipeIngredients";
import { RecipeInstructions } from "@/components/recipe/RecipeInstructions";
import { RecipeVideoSection } from "@/components/recipe/RecipeVideoSection";

interface RecipeDetails {
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
  extendedIngredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
    image: string;
    original: string;
  }>;
  analyzedInstructions: Array<{
    name?: string;
    steps: Array<{
      number: number;
      step: string;
      equipment?: Array<{
        id: number;
        name: string;
      }>;
      ingredients?: Array<{
        id: number;
        name: string;
      }>;
    }>;
  }>;
  summary: string;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
}

interface VideoResult {
  title: string;
  youTubeId: string;
  rating: number;
  thumbnail: string;
}

export default function RecipePage() {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.id as string;

  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [videos, setVideos] = useState<VideoResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch recipe: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Recipe data received:", data);
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

    const fetchRecipeVideos = async () => {
      try {
        const response = await fetch(`/api/recipes/${recipeId}/videos`);
        if (response.ok) {
          const data = await response.json();
          setVideos(data.videos || []);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    if (recipeId) {
      fetchRecipeDetails();
      fetchRecipeVideos();
    }
  }, [recipeId]);

  if (loading) {
    return <RecipePageSkeleton />;
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Recipe Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The recipe you're looking for doesn't exist."}
          </p>
          <Button
            onClick={() => router.back()}
            className="bg-green-600 hover:bg-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Simple Back Button Header */}
      <div className="sticky top-0 z-20 w-full bg-white border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left Column - Recipe Header */}
          <div className="lg:col-span-2">
            <RecipeDetailsHeader recipe={recipe} />
          </div>

          {/* Right Column - Ingredients and Instructions */}
          <div className="lg:col-span-3">
            <RecipeIngredients ingredients={recipe.extendedIngredients || []} />
            <RecipeInstructions
              instructions={recipe.analyzedInstructions || []}
              sourceUrl={recipe.sourceUrl}
            />
            {videos.length > 0 && <RecipeVideoSection videos={videos} />}
          </div>
        </div>
      </main>
    </div>
  );
}

function RecipePageSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Back Button Skeleton */}
      <div className="sticky top-0 z-20 w-full bg-white border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <Skeleton className="h-6 w-16" />
        </div>
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />

              <Skeleton className="aspect-square w-full rounded-2xl" />

              <div className="rounded-xl border border-gray-200 p-6">
                <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}>
                      <Skeleton className="mx-auto h-4 w-20 mb-2" />
                      <Skeleton className="mx-auto h-6 w-16" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-6">
                <Skeleton className="h-8 w-32 mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-12">
              <Skeleton className="h-10 w-40 mb-6" />
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center"
                  >
                    <Skeleton className="mb-2 h-24 w-24 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <Skeleton className="h-10 w-40 mb-6" />
              <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-5/6" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-10 w-40 mb-6" />
              <Skeleton className="aspect-video w-full rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
