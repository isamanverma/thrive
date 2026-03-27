"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Search, Plus, X, Flame, Loader2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Dish, MealTypeCapitalized } from "./types";
import { DISH_UNITS } from "./types";
import { getRecipes, type ApiResult } from "@/lib/mealPlanClient";

interface MealDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: MealTypeCapitalized;
  dayLabel: string;
  initialDishes: Dish[];
  onSave: (dishes: Dish[]) => void;
}

function resolveCalories(nutrition: unknown): number {
  if (!nutrition || typeof nutrition !== "object") return 0;
  const rn = nutrition as { [k: string]: unknown };
  if (typeof rn.calories === "number") return rn.calories as number;
  if (Array.isArray(rn.nutrients)) {
    const found = (rn.nutrients as unknown[]).find((n) => {
      if (!n || typeof n !== "object") return false;
      const obj = n as { name?: unknown; amount?: unknown };
      return (
        typeof obj.name === "string" &&
        (obj.name as string).toLowerCase().includes("calorie") &&
        typeof obj.amount === "number"
      );
    });
    if (found) return (found as { amount: number }).amount;
  }
  return 0;
}

function resolveNutrientAmount(
  nutrition: unknown,
  matcher: (name: string) => boolean,
): number {
  if (!nutrition || typeof nutrition !== "object") return 0;
  const rn = nutrition as {
    nutrients?: Array<{ name?: string; amount?: number }>;
  };
  if (!Array.isArray(rn.nutrients)) return 0;
  const found = rn.nutrients.find(
    (n) =>
      typeof n?.name === "string" &&
      matcher(n.name.toLowerCase()) &&
      typeof n?.amount === "number",
  );
  return typeof found?.amount === "number" ? found.amount : 0;
}

export function MealDrawer({
  isOpen,
  onClose,
  mealType,
  dayLabel,
  initialDishes,
  onSave,
}: MealDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ApiResult[]>([]);
  const [frequentResults, setFrequentResults] = useState<ApiResult[]>([]);
  const [suggestedResults, setSuggestedResults] = useState<ApiResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getDishBaseCalories = useCallback((dish: Dish): number => {
    const nutritionCalories = resolveCalories(dish.nutrition);
    if (nutritionCalories > 0) return nutritionCalories;
    const qty = Math.max(0.1, Number(dish.quantity) || 1);
    return Math.max(0, (dish.calories || 0) / qty);
  }, []);

  const getDishTotalCalories = useCallback(
    (dish: Dish): number => {
      const qty = Math.max(0.1, Number(dish.quantity) || 1);
      return Math.round(getDishBaseCalories(dish) * qty);
    },
    [getDishBaseCalories],
  );

  // Sync initial dishes when sheet opens
  useEffect(() => {
    if (isOpen) {
      setDishes(initialDishes);
      setSearchQuery("");
      setSearchResults([]);
      setFrequentResults([]);
      setSuggestedResults([]);
    }
  }, [isOpen, initialDishes]);

  // Preload meal-specific suggestions so users can tap-add without searching.
  useEffect(() => {
    if (!isOpen) return;

    const loadSuggestions = async () => {
      setIsLoadingSuggestions(true);
      try {
        const { frequent = [], suggestions = [] } = await getRecipes(
          "",
          0,
          20,
          {
            mealType,
            includeFrequent: true,
          },
        );

        const frequentIds = new Set(frequent.map((r) => String(r.id)));
        const deDupedSuggestions = suggestions.filter(
          (item) => !frequentIds.has(String(item.id)),
        );

        setFrequentResults(frequent);
        setSuggestedResults(deDupedSuggestions);
      } catch {
        setFrequentResults([]);
        setSuggestedResults([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    void loadSuggestions();
  }, [isOpen, mealType]);

  // Search recipes
  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const { results } = await getRecipes(query, 0, 20, { mealType });
        setSearchResults(results);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [mealType],
  );

  // Debounced search
  const handleSearchInput = useCallback(
    (value: string) => {
      setSearchQuery(value);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => handleSearch(value), 300);
    },
    [handleSearch],
  );

  // Add a dish from search/suggestion results
  const addDish = useCallback((recipe: ApiResult) => {
    const recipeKey = String(recipe.recipeId || recipe.id);
    setDishes((prev) => {
      if (prev.some((d) => d.recipeId === recipeKey)) return prev;

      const calories = resolveCalories(recipe.nutrition);
      const newDish: Dish = {
        recipeId: recipeKey,
        sourceId: recipe.sourceId ? String(recipe.sourceId) : undefined,
        name: recipe.title,
        calories: Math.round(calories),
        image: recipe.image,
        description: recipe.summary || "",
        quantity: 1,
        unit: "serving",
        nutrition: recipe.nutrition,
      };
      return [...prev, newDish];
    });
  }, []);

  // Remove a dish
  const removeDish = useCallback((index: number) => {
    setDishes((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Update dish quantity
  const updateQuantity = useCallback((index: number, quantity: number) => {
    setDishes((prev) =>
      prev.map((d, i) => {
        if (i !== index) return d;
        return {
          ...d,
          quantity: Math.max(0.1, quantity),
        };
      }),
    );
  }, []);

  // Update dish unit
  const updateUnit = useCallback((index: number, unit: string) => {
    setDishes((prev) => prev.map((d, i) => (i === index ? { ...d, unit } : d)));
  }, []);

  // Calculate totals
  const totalCalories = dishes.reduce(
    (sum, d) => sum + getDishTotalCalories(d),
    0,
  );
  const totalProtein = dishes.reduce((sum, d) => {
    const protein = resolveNutrientAmount(
      d.nutrition,
      (name) => name === "protein",
    );
    return sum + (protein ? Math.round(protein * d.quantity) : 0);
  }, 0);
  const totalCarbs = dishes.reduce((sum, d) => {
    const carbs = resolveNutrientAmount(
      d.nutrition,
      (name) => name === "carbohydrates" || name === "carbs",
    );
    return sum + (carbs ? Math.round(carbs * d.quantity) : 0);
  }, 0);
  const totalFat = dishes.reduce((sum, d) => {
    const fat = resolveNutrientAmount(d.nutrition, (name) => name === "fat");
    return sum + (fat ? Math.round(fat * d.quantity) : 0);
  }, 0);

  const handleSave = useCallback(() => {
    const normalized = dishes.map((dish) => ({
      ...dish,
      calories: getDishTotalCalories(dish),
      quantity: Math.max(0.1, Number(dish.quantity) || 1),
    }));
    onSave(normalized);
    onClose();
  }, [dishes, getDishTotalCalories, onSave, onClose]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col sm:max-w-xl lg:max-w-3xl"
      >
        <SheetHeader>
          <SheetTitle>
            {mealType} - {dayLabel}
          </SheetTitle>
          <SheetDescription>
            Search and add dishes to this meal.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 space-y-4">
          {/* Totals */}
          {dishes.length > 0 && (
            <div className="rounded-xl border border-border bg-card/50 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Meal Total
                </span>
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-lg font-bold text-foreground">
                    {totalCalories}
                  </span>
                  <span className="text-sm text-muted-foreground">kcal</span>
                </div>
              </div>
              {(totalProtein > 0 || totalCarbs > 0 || totalFat > 0) && (
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {totalProtein > 0 && (
                    <span>
                      Protein:{" "}
                      <strong className="text-blue-600">{totalProtein}g</strong>
                    </span>
                  )}
                  {totalCarbs > 0 && (
                    <span>
                      Carbs:{" "}
                      <strong className="text-orange-600">{totalCarbs}g</strong>
                    </span>
                  )}
                  {totalFat > 0 && (
                    <span>
                      Fat:{" "}
                      <strong className="text-orange-600">{totalFat}g</strong>
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search dishes..."
              className="pl-9"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
            )}
          </div>

          {!searchQuery && (
            <>
              {isLoadingSuggestions ? (
                <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading suggestions...
                </div>
              ) : (
                <>
                  {frequentResults.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Frequently Added
                      </p>
                      <div className="max-h-40 overflow-y-auto space-y-1 rounded-lg border border-border p-1">
                        {frequentResults.map((recipe) => (
                          <button
                            key={`freq-${recipe.id}`}
                            type="button"
                            onClick={() => addDish(recipe)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
                          >
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-muted flex-shrink-0 relative">
                              {recipe.image ? (
                                <Image
                                  src={recipe.image}
                                  alt={recipe.title}
                                  fill
                                  className="object-cover"
                                  sizes="32px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                  ?
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {recipe.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {Math.round(resolveCalories(recipe.nutrition))}{" "}
                                kcal
                              </p>
                            </div>
                            <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {suggestedResults.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Suggested for {mealType}
                      </p>
                      <div className="max-h-48 overflow-y-auto space-y-1 rounded-lg border border-border p-1">
                        {suggestedResults.map((recipe) => (
                          <button
                            key={`suggest-${recipe.id}`}
                            type="button"
                            onClick={() => addDish(recipe)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
                          >
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-muted flex-shrink-0 relative">
                              {recipe.image ? (
                                <Image
                                  src={recipe.image}
                                  alt={recipe.title}
                                  fill
                                  className="object-cover"
                                  sizes="32px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                  ?
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {recipe.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {Math.round(resolveCalories(recipe.nutrition))}{" "}
                                kcal
                              </p>
                            </div>
                            <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Search Results
              </p>
              <div className="max-h-48 overflow-y-auto space-y-1 rounded-lg border border-border p-1">
                {searchResults.map((recipe) => (
                  <button
                    key={recipe.id}
                    type="button"
                    onClick={() => addDish(recipe)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-muted flex-shrink-0 relative">
                      {recipe.image ? (
                        <Image
                          src={recipe.image}
                          alt={recipe.title}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          ?
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {recipe.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(resolveCalories(recipe.nutrition))} kcal
                      </p>
                    </div>
                    <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Added Dishes */}
          {dishes.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Added ({dishes.length})
              </p>
              <AnimatePresence mode="popLayout">
                {dishes.map((dish, index) => (
                  <motion.div
                    key={`${dish.recipeId}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-card border border-border/50"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-muted flex-shrink-0 relative">
                      {dish.image ? (
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          ?
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <p className="text-sm font-medium truncate">
                        {dish.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={0.1}
                          step={0.5}
                          value={dish.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              index,
                              parseFloat(e.target.value) || 1,
                            )
                          }
                          className="w-14 h-7 text-xs text-center"
                        />
                        <select
                          value={dish.unit}
                          onChange={(e) => updateUnit(index, e.target.value)}
                          className="h-7 rounded-md border border-input bg-background px-1.5 text-xs"
                        >
                          {DISH_UNITS.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span className="text-xs font-medium">
                          {getDishTotalCalories(dish)} kcal
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDish(index)}
                      className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty state */}
          {dishes.length === 0 &&
            searchResults.length === 0 &&
            !searchQuery &&
            !isLoadingSuggestions &&
            frequentResults.length === 0 &&
            suggestedResults.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">Search and add dishes to this meal</p>
              </div>
            )}
        </div>

        <div className="flex gap-2 px-6 pb-6">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            Save Meal
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
