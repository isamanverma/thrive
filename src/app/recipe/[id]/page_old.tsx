"use client";

import { ArrowLeft, CalendarPlus, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
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
        console.log("Extended ingredients:", data.extendedIngredients);
        console.log("Analyzed instructions:", data.analyzedInstructions);
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
    // TODO: Implement save to favorites
    console.log("Save to favorites:", recipeId);
  };

  const handleAddToMealPlan = async () => {
    // TODO: Implement add to meal plan
    console.log("Add to meal plan:", recipeId);
  };

  if (loading) {
    return <RecipePageSkeleton />;
  }

  if (error || !recipe) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
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
      </div>
    );
  }

  const calories = getNutrient("Calories");
  const protein = getNutrient("Protein");
  const carbs = getNutrient("Carbohydrates");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-gray-900">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                  fill="currentColor"
                ></path>
              </svg>
              <h1 className="text-2xl font-bold">Thrive</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/recipe-explorer"
                className="text-sm font-medium text-gray-600 hover:text-green-600"
              >
                Recipes
              </Link>
              <Link
                href="/meal-plans"
                className="text-sm font-medium text-gray-600 hover:text-green-600"
              >
                Meal Plans
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-green-600"
              >
                Community
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 pr-3 py-2 text-sm text-gray-900 focus:border-green-600 focus:ring-green-600"
                placeholder="Search"
                type="text"
              />
            </div>
            <button className="rounded-full p-2 text-gray-600 hover:bg-green-100 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <div className="h-10 w-10 rounded-full bg-cover bg-center bg-gray-300"></div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="flex items-center space-x-2 text-sm" role="list">
              <li>
                <Link
                  href="/recipe-explorer"
                  className="font-medium text-gray-600 hover:text-gray-900"
                >
                  Recipes
                </Link>
              </li>
              <li>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                </svg>
              </li>
              <li>
                <span className="font-medium text-gray-900">
                  {recipe.title}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left Column - Recipe Info */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <h2 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900">
                {recipe.title}
              </h2>

              {/* Recipe Summary */}
              <p className="mb-6 text-lg text-gray-600">
                {recipe.summary?.replace(/<[^>]*>/g, "").slice(0, 200) +
                  "..." ||
                  "A refreshing and healthy recipe packed with flavor, perfect for a light meal or side dish."}
              </p>

              {/* Recipe Image */}
              <div className="mb-8 overflow-hidden rounded-2xl">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Nutrition & Info Card */}
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
                  <div>
                    <span className="text-sm font-medium text-green-800">
                      Meal Type
                    </span>
                    <p className="text-lg font-bold text-green-700">
                      {getMealType(recipe.dishTypes || [])}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-800">
                      Calories
                    </span>
                    <p className="text-lg font-bold text-green-700">
                      {calories
                        ? `${Math.round(calories.amount)} kcal`
                        : "350 kcal"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-800">
                      Protein
                    </span>
                    <p className="text-lg font-bold text-green-700">
                      {protein ? `${Math.round(protein.amount)}g` : "15g"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-800">
                      Carbs
                    </span>
                    <p className="text-lg font-bold text-green-700">
                      {carbs ? `${Math.round(carbs.amount)}g` : "45g"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Actions
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={handleSaveToFavorites}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    <Heart className="w-5 h-5" />
                    Save to Favorites
                  </button>
                  <button
                    onClick={handleAddToMealPlan}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-600 bg-green-50 px-5 py-3 text-base font-semibold text-green-600 shadow-sm transition-colors hover:bg-green-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    <CalendarPlus className="w-5 h-5" />
                    Add to Meal Plan
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Ingredients & Instructions */}
          <div className="lg:col-span-3">
            {/* Ingredients */}
            <div className="mb-12">
              <h3 className="mb-6 text-3xl font-bold text-gray-900">
                Ingredients
              </h3>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                {recipe.extendedIngredients &&
                recipe.extendedIngredients.length > 0 ? (
                  recipe.extendedIngredients.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="mb-2 h-24 w-24 rounded-full bg-gray-100 p-2">
                        <Image
                          src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                          alt={ingredient.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="font-medium text-sm text-gray-600">
                        {ingredient.original}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 text-center py-8">
                    <p className="text-gray-500">
                      No ingredients available for this recipe.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-12">
              <h3 className="mb-6 text-3xl font-bold text-gray-900">
                Preparation
              </h3>
              <div className="prose prose-lg max-w-none text-gray-600">
                {recipe.analyzedInstructions &&
                recipe.analyzedInstructions.length > 0 &&
                recipe.analyzedInstructions[0]?.steps ? (
                  <ol className="list-decimal space-y-6 pl-6">
                    {recipe.analyzedInstructions[0].steps.map((step) => (
                      <li key={step.number} className="leading-relaxed">
                        <strong className="text-gray-900">
                          {step.step.split(":")[0]}:
                        </strong>{" "}
                        {step.step.split(":").slice(1).join(":") || step.step}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No detailed instructions available for this recipe.
                    </p>
                    {recipe.sourceUrl && (
                      <Link
                        href={recipe.sourceUrl}
                        target="_blank"
                        className="text-green-600 hover:text-green-700 underline mt-2 inline-block"
                      >
                        View original recipe
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Recipe Videos */}
            {videos.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 text-3xl font-bold text-gray-900">
                  Watch Recipe Video
                </h3>
                <div className="aspect-video overflow-hidden rounded-xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videos[0].youTubeId}`}
                    title={videos[0].title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
              <Link
                href="#"
                className="text-base text-gray-600 hover:text-gray-900"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-base text-gray-600 hover:text-gray-900"
              >
                Contact
              </Link>
              <Link
                href="#"
                className="text-base text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-base text-gray-600 hover:text-gray-900"
              >
                Terms of Service
              </Link>
            </nav>
            <div className="flex justify-center space-x-6 md:order-last">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">Twitter</span>
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">Instagram</span>
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clipRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-2a7 7 0 110 14 7 7 0 010-14zm4.5-1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">Facebook</span>
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clipRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          <p className="mt-8 text-center text-base text-gray-600">
            © 2024 Thrive. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function RecipePageSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3 mb-8" />
            <Skeleton className="aspect-video w-full rounded-2xl mb-8" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <div className="lg:col-span-3">
            <Skeleton className="h-8 w-1/3 mb-6" />
            <div className="grid grid-cols-2 gap-4 mb-12 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="h-24 w-24 rounded-full mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
            <Skeleton className="h-8 w-1/4 mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
