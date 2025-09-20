"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Search, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { MealPlanItem } from "./MealPlanCard";
import { Skeleton } from "@/components/ui/skeleton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { getUserRecipes } from "@/lib/api";
import { logTelemetry } from "@/lib/telemetry";
import { useRouter } from "next/navigation";

interface MealSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: string;
  onMealSelect: (meal: MealPlanItem) => void;
  isLoading?: boolean;
}

/**
 * Spoonacular search result shape (partial)
 */
interface SpoonacularSearchResult {
  id: number;
  title: string;
  image?: string;
  summary?: string;
  nutrition?: {
    nutrients?: Array<{ name?: string; amount?: number; unit?: string }>;
  };
}

interface ExtendedIngredient {
  original?: string;
  name?: string;
}

const getMealTypeStyles = (mealType: string) => {
  const styles = {
    Breakfast:
      "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700 dark:hover:bg-orange-800",
    Lunch:
      "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 dark:hover:bg-blue-800",
    Snack:
      "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700 dark:hover:bg-purple-800",
    Dinner:
      "bg-red-100 text-red-700 border-red-200 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700 dark:hover:bg-red-800",
  };
  return styles[mealType as keyof typeof styles] || styles.Lunch;
};

// Fallback ingredient generator used only when we cannot fetch from API/DB
const generateIngredients = (mealName: string): string[] => {
  const generic = [
    "Fresh ingredients",
    "Quality proteins",
    "Healthy fats",
    "Complex carbs",
  ];
  return mealName ? [mealName, ...generic.slice(0, 3)] : generic;
};

export function MealSwapModal({
  isOpen,
  onClose,
  mealType,
  onMealSelect,
  isLoading = false,
}: MealSwapModalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredMeal, setHoveredMeal] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search / pagination state
  const [searchResults, setSearchResults] = useState<SpoonacularSearchResult[]>(
    []
  );
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(0);
  const pageSize = 10; // default page size
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Cache of fetched ingredients keyed by meal id
  const [ingredientsMap, setIngredientsMap] = useState<
    Record<number, Array<string>>
  >({});

  // Local meals fetched from database (prefer user's saved/cached recipes)
  const [localMeals, setLocalMeals] = useState<MealPlanItem[]>([]);

  // When the drawer opens (and when page changes), load DB-sourced meals
  // using the client API helper getUserRecipes. Skip when searching (search has priority).
  useEffect(() => {
    if (!isOpen) return;
    if (searchQuery.trim()) return; // search has priority

    let cancelled = false;

    const fetchLocalMeals = async (currentPage = 0) => {
      try {
        const offset = currentPage * pageSize;
        // Use client helper which wraps /api/user/recipes
        const json = await getUserRecipes("saved", pageSize, offset);
        const recipesList = (json.recipes || []) as Array<
          Record<string, unknown>
        >;

        const mapped: MealPlanItem[] = recipesList.map((ur) => {
          const urObj = ur as Record<string, unknown>;
          const cr =
            (urObj["cachedRecipe"] as Record<string, unknown> | undefined) ??
            undefined;

          const sourceIdCandidate =
            cr && typeof cr["sourceId"] === "string"
              ? String(cr["sourceId"])
              : typeof urObj["sourceId"] === "string"
                ? String(urObj["sourceId"])
                : null;
          const idNum = sourceIdCandidate ? Number(sourceIdCandidate) : NaN;

          const title =
            cr && typeof cr["title"] === "string"
              ? String(cr["title"])
              : urObj["name"]
                ? String(urObj["name"])
                : `Recipe ${sourceIdCandidate ?? "unknown"}`;
          const imageUrl =
            cr && typeof cr["imageUrl"] === "string"
              ? String(cr["imageUrl"])
              : "/placeholder.svg";
          const description =
            cr && typeof cr["description"] === "string"
              ? String(cr["description"])
              : "";

          let calories: number | undefined = undefined;
          if (
            cr &&
            typeof cr["nutrition"] === "object" &&
            cr["nutrition"] !== null
          ) {
            const nut = cr["nutrition"] as Record<string, unknown>;
            if (typeof nut["calories"] === "number")
              calories = nut["calories"] as number;
            else if (
              typeof nut["calories"] === "string" &&
              !Number.isNaN(Number(nut["calories"]))
            )
              calories = Number(nut["calories"]);
          }

          const nutrition =
            cr && typeof cr["nutrition"] === "object"
              ? (cr["nutrition"] as Record<string, unknown>)
              : undefined;

          return {
            id: Number.isFinite(idNum) ? idNum : Number(sourceIdCandidate ?? 0),
            name: title,
            image: imageUrl,
            description,
            calories,
            nutrition: nutrition as Record<string, unknown> | undefined,
          } as MealPlanItem;
        });

        if (!cancelled) {
          setLocalMeals(mapped);
          const pagination = json.pagination || {};
          const total =
            typeof pagination.total === "number"
              ? pagination.total
              : mapped.length;
          setTotalResults(total);
        }
      } catch (err) {
        if (!cancelled) {
          logTelemetry("local_meals_fetch_error", {
            message: err instanceof Error ? err.message : String(err),
          });
          setLocalMeals([]);
        }
      }
    };

    fetchLocalMeals(page);
    return () => {
      cancelled = true;
    };
  }, [isOpen, searchQuery, page]);

  // Debounced search effect
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults([]);
      setTotalResults(0);
      setPage(0);
      setSearchError(null);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    const fetchPage = async (currentPage = 0) => {
      setIsSearching(true);
      setSearchError(null);
      try {
        // First check if we have matching recipes in the database
        const filteredDbMeals = localMeals.filter((meal) =>
          (meal.name || "").toLowerCase().includes(q.toLowerCase()) ||
          ((meal.description || "") as string).toLowerCase().includes(q.toLowerCase())
        );
        
        // If we have enough matches in the database, don't call the API
        if (filteredDbMeals.length >= 5) {
          if (!cancelled) {
            setSearchResults([]);
            setTotalResults(filteredDbMeals.length);
            setIsSearching(false);
          }
          return;
        }
        
        const offset = currentPage * pageSize;
        const params = new URLSearchParams({
          q,
          number: String(pageSize),
          offset: String(offset),
        });
        const res = await fetch(`/api/searchRecipe?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          if (res.status === 429) {
            const retryAfter = body?.retryAfter ?? "a moment";
            setSearchError(
              `Rate limit reached. Try again in ${retryAfter} seconds.`
            );
            logTelemetry("search_rate_limited", { query: q, offset });
          } else {
            setSearchError(body?.error || "Search failed. Please try again.");
            logTelemetry("search_failure", {
              status: res.status,
              statusText: res.statusText,
              query: q,
            });
          }
          setSearchResults([]);
          setTotalResults(0);
          return;
        }
        const json = await res.json();
        if (cancelled) return;
        setSearchResults(json.results || []);
        setTotalResults(json.totalResults || 0);
      } catch (err) {
        if ((err as unknown as Error).name === "AbortError") return;
        logTelemetry("search_exception", { message: (err as Error).message });
        setSearchError("Network error while searching. Please try again.");
        setSearchResults([]);
        setTotalResults(0);
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    };

    const timer = setTimeout(() => fetchPage(page), 300);
    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchQuery, page, localMeals, pageSize]);

  // Focus search input when drawer opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Helper to fetch detailed ingredients for a given meal id (tries recipe api)
  async function fetchIngredientsForMeal(mealId: number, mealName?: string) {
    if (!mealId) return;
    if (ingredientsMap[mealId]) return; // already fetched
    try {
      const res = await fetch(`/api/recipes/${mealId}`);
      if (!res.ok) {
        setIngredientsMap((prev) => ({
          ...prev,
          [mealId]: generateIngredients(mealName || ""),
        }));
        return;
      }
      const data = (await res.json()) as {
        extendedIngredients?: ExtendedIngredient[];
      };
      const ext = data.extendedIngredients || [];
      const ing = ext.length
        ? ext.map((i) => i.original || i.name || "")
        : generateIngredients(mealName || "");
      setIngredientsMap((prev) => ({ ...prev, [mealId]: ing }));
      logTelemetry("ingredient_fetch_success", {
        mealId,
        source: "recipes_api",
        count: ing.length,
      });
    } catch (err) {
      logTelemetry("ingredient_fetch_error", {
        mealId,
        message: (err as Error).message,
      });
      setIngredientsMap((prev) => ({
        ...prev,
        [mealId]: generateIngredients(mealName || ""),
      }));
    }
  }

  // Derived UI lists
  const isSearchActive = !!searchQuery.trim();
  const searchedMeals: MealPlanItem[] = useMemo(() => {
    if (isSearchActive) {
      return searchResults.map((r: SpoonacularSearchResult) => {
        const calories =
          r?.nutrition?.nutrients?.find(
            (n) => (n?.name || "").toLowerCase() === "calories"
          )?.amount ?? undefined;
        return {
          id: Number(r.id),
          name: r.title,
          image: r.image,
          description: r.summary || "",
          calories,
        } as MealPlanItem;
      });
    }
    return [];
  }, [searchResults, isSearchActive]);

  // Filter local meals based on search query
  const filteredLocalMeals: MealPlanItem[] = useMemo(() => {
    const defaultMeals = localMeals && localMeals.length > 0 ? localMeals : [];
    if (!searchQuery.trim()) return defaultMeals;
    const q = searchQuery.toLowerCase();
    return defaultMeals.filter(
      (meal) =>
        (meal.name || "").toLowerCase().includes(q) ||
        ((meal.description || "") as string).toLowerCase().includes(q)
    );
  }, [localMeals, searchQuery]);

  // Effective local meals (DB results only)
  const effectiveLocalMeals: MealPlanItem[] = localMeals || [];

  // Simple keyboard handler kept for future use
  const _handleKeyDown = (event: React.KeyboardEvent, meal: MealPlanItem) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onMealSelect(meal);
    }
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent
        className="mx-auto max-w-7xl max-h-[90vh] flex flex-col bg-background"
        aria-labelledby="swap-modal-title"
        aria-describedby="swap-modal-description"
      >
        <DrawerHeader className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={`${getMealTypeStyles(mealType)} font-semibold px-3 py-1`}
              >
                <ChefHat className="w-4 h-4 mr-2" aria-hidden="true" />
                {mealType}
              </Badge>
              <DrawerTitle id="swap-modal-title">
                <VisuallyHidden>Swap Meal</VisuallyHidden>
              </DrawerTitle>
            </div>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close meal swap modal"
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>

          <div className="mt-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                aria-hidden="true"
              />
              <Input
                ref={searchInputRef}
                placeholder={`Search ${mealType.toLowerCase()} options...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
                aria-label={`Search ${mealType.toLowerCase()} meal options`}
                aria-describedby="swap-modal-description"
              />
            </div>
            <p id="swap-modal-description" className="sr-only">
              Search and select a {mealType.toLowerCase()} meal to replace the
              current one
            </p>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <BlurFade key={index} delay={index * 0.1} inView>
                  <Card className="overflow-hidden max-w-[320px] mx-auto">
                    <Skeleton className="w-full h-48 rounded-none" />
                    <CardContent className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-full mb-1" />
                      <Skeleton className="h-3 w-2/3 mb-3" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </CardContent>
                  </Card>
                </BlurFade>
              ))}
            </div>
          ) : (
            <>
              {/* Show search errors above the grid */}
              {searchError && (
                <div className="mb-4 text-sm text-red-600" role="alert">
                  {searchError}
                </div>
              )}

              {/* Show search results section if there are search results */}
              {isSearchActive && searchedMeals.length > 0 && (
                <>
                  <div className="mb-4">
                    <h3 className="font-medium text-base">Search Results</h3>
                    <p className="text-sm text-muted-foreground">
                      {searchedMeals.length} result
                      {searchedMeals.length !== 1 ? "s" : ""} found
                    </p>
                  </div>

                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    role="list"
                    aria-label={`Search results for ${mealType.toLowerCase()} meals`}
                  >
                    {searchedMeals.map((meal, index) => (
                      <div
                        key={meal.id}
                        className="flex-shrink-0"
                      >
                        <BlurFade delay={index * 0.05} inView>
                          <Card
                            className="h-full cursor-pointer group relative overflow-hidden hover:shadow-lg transition-all duration-200 max-w-[320px] mx-auto dark:bg-gray-800 dark:border-gray-700"
                            role="listitem"
                            tabIndex={0}
                            onClick={() => {
                              onMealSelect(meal);
                              onClose();
                              logTelemetry("meal_swap_selected", {
                                mealId: meal.id,
                                mealType,
                                source: "search",
                              });
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                onMealSelect(meal);
                                onClose();
                              }
                            }}
                            onMouseEnter={() => {
                              fetchIngredientsForMeal(meal.id, meal.name);
                              setHoveredMeal(meal.id);
                            }}
                            onMouseLeave={() => setHoveredMeal(null)}
                            aria-label={`Select ${meal.name}, ${meal.calories} calories`}
                          >
                            <div className="relative">
                              <div className="w-full h-48 overflow-hidden">
                                <Image
                                  src={meal.image || "/placeholder.svg"}
                                  alt={meal.name}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      const returnTo =
                                        typeof window !== "undefined"
                                          ? window.location.pathname
                                          : "/dashboard/meal-plans";
                                      try {
                                        await fetch(
                                          `/api/recipes/${meal.id}`,
                                          { method: "GET" }
                                        );
                                      } catch {
                                        // ignore
                                      }
                                      onClose();
                                      router.push(
                                        `/recipe/${meal.id}?returnTo=${encodeURIComponent(returnTo)}`
                                      );
                                    }}
                                  >
                                    View
                                  </Button>
                                </div>
                              </div>

                              {hoveredMeal === meal.id && (
                                <div className="absolute inset-0 bg-black/80 flex flex-col justify-center p-4">
                                  <h4 className="text-white font-semibold text-sm mb-2">
                                    Ingredients
                                  </h4>
                                  <div className="space-y-1 max-h-32 overflow-y-auto">
                                    {(
                                      ingredientsMap[meal.id] ||
                                      generateIngredients(meal.name)
                                    ).map((ingredient, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center gap-2 text-white/90 text-xs"
                                      >
                                        <div className="w-1 h-1 bg-green-400 rounded-full flex-shrink-0" />
                                        <span>{ingredient}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <CardContent className="p-4 flex-1 flex flex-col">
                              <div className="flex-1">
                                <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors dark:text-gray-100">
                                  {meal.name}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-3 dark:text-gray-300">
                                  {meal.description}
                                </p>
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t dark:border-gray-700">
                                <span className="text-xs text-muted-foreground font-medium dark:text-gray-400">
                                  Calories
                                </span>
                                <div className="flex items-baseline gap-1">
                                  <span className="font-bold text-foreground dark:text-gray-200">
                                    {meal.calories}
                                  </span>
                                  <span className="text-xs text-muted-foreground dark:text-gray-400">
                                    kcal
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </BlurFade>
                      </div>
                    ))}
                  </div>
                  
                  {/* Horizontal partition */}
                  {filteredLocalMeals.length > 0 && (
                    <div className="border-t border-border my-6 pt-2">
                      <h3 className="font-medium text-base mt-4 dark:text-gray-200">
                        Database Recipes
                      </h3>
                    </div>
                  )}
                </>
              )}

              {/* Always show database recipes */}
              {(isSearchActive ? filteredLocalMeals : localMeals).length > 0 ? (
                <>
                  <div className="mb-4">
                    <h3 className="font-medium text-base dark:text-gray-200">Database Recipes</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      {(isSearchActive ? filteredLocalMeals : localMeals).length}{" "}
                      {(isSearchActive ? filteredLocalMeals : localMeals).length === 1
                        ? "recipe"
                        : "recipes"}{" "}
                      available
                    </p>
                  </div>

                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    role="grid"
                    aria-label={`Available ${mealType.toLowerCase()} meals`}
                  >
                    {(isSearchActive ? filteredLocalMeals : localMeals).map((meal, index) => (
                      <BlurFade key={meal.id} delay={index * 0.05} inView>
                        <Card
                          className="h-full cursor-pointer group relative overflow-hidden hover:shadow-lg transition-all duration-200 max-w-[320px] mx-auto dark:bg-gray-800 dark:border-gray-700"
                          role="gridcell"
                          tabIndex={0}
                          onClick={() => {
                            onMealSelect(meal);
                            onClose();
                            logTelemetry("meal_swap_selected", {
                              mealId: meal.id,
                              mealType,
                            });
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              onMealSelect(meal);
                              onClose();
                            }
                          }}
                          onMouseEnter={() => {
                            fetchIngredientsForMeal(meal.id, meal.name);
                            setHoveredMeal(meal.id);
                          }}
                          onMouseLeave={() => setHoveredMeal(null)}
                          aria-label={`Select ${meal.name}, ${meal.calories} calories`}
                        >
                          <div className="relative">
                            <div className="w-full h-48 overflow-hidden">
                              <Image
                                src={meal.image || "/placeholder.svg"}
                                alt={meal.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    const returnTo =
                                      typeof window !== "undefined"
                                        ? window.location.pathname
                                        : "/dashboard/meal-plans";
                                    try {
                                      await fetch(
                                        `/api/recipes/${meal.id}`,
                                        { method: "GET" }
                                      );
                                    } catch {
                                      // ignore
                                    }
                                    onClose();
                                    router.push(
                                      `/recipe/${meal.id}?returnTo=${encodeURIComponent(returnTo)}`
                                    );
                                  }}
                                >
                                  View
                                </Button>
                              </div>
                            </div>

                            {hoveredMeal === meal.id && (
                              <div className="absolute inset-0 bg-black/80 flex flex-col justify-center p-4">
                                <h4 className="text-white font-semibold text-sm mb-2">
                                  Ingredients
                                </h4>
                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                  {(
                                    ingredientsMap[meal.id] ||
                                    generateIngredients(meal.name)
                                  ).map((ingredient, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center gap-2 text-white/90 text-xs"
                                    >
                                      <div className="w-1 h-1 bg-green-400 rounded-full flex-shrink-0" />
                                      <span>{ingredient}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <CardContent className="p-4 flex-1 flex flex-col">
                            <div className="flex-1">
                              <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors dark:text-gray-100">
                                {meal.name}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 dark:text-gray-300">
                                {meal.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t dark:border-gray-700">
                              <span className="text-xs text-muted-foreground font-medium dark:text-gray-400">
                                Calories
                              </span>
                              <div className="flex items-baseline gap-1">
                                <span className="font-bold text-foreground dark:text-gray-200">
                                  {meal.calories}
                                </span>
                                <span className="text-xs text-muted-foreground dark:text-gray-400">
                                  kcal
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </BlurFade>
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full py-12 text-center text-sm text-muted-foreground dark:text-gray-400">
                  <p>No saved recipes found.</p>
                  <p className="mt-2">
                    Try searching for recipes or save some recipes to your
                    library to see them here.
                  </p>
                </div>
              )}

              {/* Pagination controls for Spoonacular search */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 0 || isSearching}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  Prev
                </Button>

                <div className="text-sm text-muted-foreground">
                  {isSearching
                    ? "Loading..."
                    : totalResults > 0
                      ? (() => {
                          const totalPages = Math.max(
                            1,
                            Math.ceil(totalResults / pageSize)
                          );
                          return `Page ${page + 1} of ${totalPages}`;
                        })()
                      : "Page 1"}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    isSearching ||
                    (totalResults > 0 &&
                      page >=
                        Math.max(0, Math.ceil(totalResults / pageSize) - 1))
                  }
                  onClick={() =>
                    setPage((p) =>
                      totalResults > 0
                        ? Math.min(
                            Math.ceil(totalResults / pageSize) - 1,
                            p + 1
                          )
                        : p + 1
                    )
                  }
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
