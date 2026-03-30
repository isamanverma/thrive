import type {
  Dish,
  DraggedItem,
  DropZone,
  MealPlanItem,
  ViewMode,
  WeeklyMeals,
  WeeklyStats,
} from "../types";
import {
  fetchCurrentMealPlan,
  invalidateMealPlanCache,
  saveCurrentMealPlan,
  swapMealsAPI,
  updateMealDishesAPI,
} from "@/lib/mealPlanClient";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { endOfWeek, startOfWeek } from "date-fns";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useMealPlanData() {
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [activeDropZone, setActiveDropZone] = useState<DropZone | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mealPlanId, setMealPlanId] = useState<string | null>(null);
  const { preferences, isLoading: preferencesLoading } = useUserPreferences();
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLoadingRef = useRef(false);
  const initialLoadRef = useRef(false);

  const [weeklyMeals, setWeeklyMeals] = useState<WeeklyMeals>(() => {
    const meals: WeeklyMeals = {};
    for (let i = 0; i < 7; i++) {
      meals[i] = {};
    }
    return meals;
  });

  // Load meal plan from database
  const loadMealPlan = useCallback(
    async (targetDate?: Date, options?: { preserveUI?: boolean }) => {
      const date = targetDate ?? currentDate;
      try {
        if (isLoadingRef.current) return;

        isLoadingRef.current = true;
        if (!initialLoadRef.current || !options?.preserveUI) {
          setIsLoading(true);
          setIsRefreshing(false);
        } else {
          setIsRefreshing(true);
        }

        const { ok, data, error } = await fetchCurrentMealPlan(date);
        if (!ok || !data) {
          console.warn("Failed to load meal plan, rendering empty week", error);
          const emptyMeals: WeeklyMeals = {};
          for (let i = 0; i < 7; i++) emptyMeals[i] = {};
          setWeeklyMeals(emptyMeals);
          setMealPlanId(null);
          return;
        }

        const meals: WeeklyMeals = {};
        for (let i = 0; i < 7; i++) meals[i] = {};

        if (
          data &&
          typeof data.weeklyMeals === "object" &&
          Object.keys(data.weeklyMeals).length > 0
        ) {
          Object.entries(data.weeklyMeals).forEach(([k, v]) => {
            const idx = parseInt(k, 10);
            if (!Number.isNaN(idx) && idx >= 0 && idx < 7) {
              meals[idx] = v as WeeklyMeals[number];
            }
          });
          setWeeklyMeals(meals);
          setMealPlanId(data.mealPlanId || null);
        } else {
          setWeeklyMeals(meals);
          setMealPlanId(data?.mealPlanId || null);
        }

        // Warm adjacent weeks in cache so prev/next navigation feels instant.
        const prevWeekDate = new Date(date);
        prevWeekDate.setDate(prevWeekDate.getDate() - 7);
        const nextWeekDate = new Date(date);
        nextWeekDate.setDate(nextWeekDate.getDate() + 7);
        void fetchCurrentMealPlan(prevWeekDate);
        void fetchCurrentMealPlan(nextWeekDate);
      } catch (error) {
        console.error("Error loading meal plan:", error);
        const meals: WeeklyMeals = {};
        for (let i = 0; i < 7; i++) meals[i] = {};
        setWeeklyMeals(meals);
        setMealPlanId(null);
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
        setIsRefreshing(false);
        initialLoadRef.current = true;
      }
    },
    [currentDate],
  );

  // Save meal plan to database
  const saveMealPlan = useCallback(
    async (meals: WeeklyMeals) => {
      try {
        const startOfWeek = new Date(currentDate);
        const mondayOffset =
          currentDate.getDay() === 0 ? -6 : 1 - currentDate.getDay();
        startOfWeek.setDate(currentDate.getDate() + mondayOffset);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const payload = await saveCurrentMealPlan(
          meals,
          startOfWeek.toISOString(),
          endOfWeek.toISOString(),
        );
        if (payload && payload.mealPlanId) {
          setMealPlanId(payload.mealPlanId);
        }
      } catch (error) {
        console.error("Error saving meal plan:", error);
      }
    },
    [currentDate],
  );

  // Update a meal slot with dishes
  const updateMealDishes = useCallback(
    async (dayIndex: number, mealType: string, dishes: Dish[]) => {
      const idx = Math.max(0, Math.min(6, Math.floor(Number(dayIndex) || 0)));
      const mealTypeKey = String(mealType || "").toLowerCase();

      // Optimistically update UI
      setWeeklyMeals((prevMeals) => {
        const newMeals = JSON.parse(JSON.stringify(prevMeals));
        if (!newMeals[idx]) newMeals[idx] = {};

        if (dishes.length === 0) {
          delete newMeals[idx][mealTypeKey];
        } else {
          const totalCalories = dishes.reduce(
            (sum: number, d: Dish) => sum + (d.calories || 0),
            0,
          );
          newMeals[idx][mealTypeKey] = {
            id: dishes[0].recipeId,
            name:
              dishes.length > 1
                ? `${dishes[0].name} +${dishes.length - 1}`
                : dishes[0].name,
            calories: totalCalories,
            image: dishes[0].image || "",
            description: dishes[0].description || "",
            dishes,
          };
        }
        return newMeals;
      });

      // Persist to backend
      try {
        invalidateMealPlanCache(currentDate);
        await updateMealDishesAPI(
          idx,
          mealTypeKey,
          dishes.map((d) => ({
            recipeId: d.recipeId,
            name: d.name,
            calories: d.calories,
            image: d.image,
            description: d.description,
            quantity: d.quantity,
            unit: d.unit,
            nutrition: d.nutrition,
          })),
          dishes.length > 0 ? "set" : "remove",
          currentDate,
        );
      } catch (error) {
        console.error("Failed to update meal dishes, reloading...", error);
        loadMealPlan();
      }
    },
    [currentDate, loadMealPlan],
  );

  // Remove a meal slot
  const removeMeal = useCallback(
    async (dayIndex: number, mealType: string) => {
      await updateMealDishes(dayIndex, mealType, []);
    },
    [updateMealDishes],
  );

  // Swap two meals
  const swapMeals = useCallback(
    async (
      sourceDayIndex: number,
      sourceMealType: string,
      targetDayIndex: number,
      targetMealType: string,
    ) => {
      const srcIdx = Math.max(
        0,
        Math.min(6, Math.floor(Number(sourceDayIndex) || 0)),
      );
      const tgtIdx = Math.max(
        0,
        Math.min(6, Math.floor(Number(targetDayIndex) || 0)),
      );
      const srcKey = String(sourceMealType || "").toLowerCase();
      const tgtKey = String(targetMealType || "").toLowerCase();

      let originalMeals: WeeklyMeals | null = null;

      setWeeklyMeals((prevMeals) => {
        originalMeals = JSON.parse(JSON.stringify(prevMeals));
        const newMeals = JSON.parse(JSON.stringify(prevMeals));

        if (!newMeals[srcIdx]) newMeals[srcIdx] = {};
        if (!newMeals[tgtIdx]) newMeals[tgtIdx] = {};

        const sourceMeal = newMeals[srcIdx][srcKey];
        const targetMeal = newMeals[tgtIdx][tgtKey];

        if (sourceMeal && targetMeal) {
          newMeals[srcIdx][srcKey] = targetMeal;
          newMeals[tgtIdx][tgtKey] = sourceMeal;
        } else if (sourceMeal && !targetMeal) {
          delete newMeals[srcIdx][srcKey];
          newMeals[tgtIdx][tgtKey] = sourceMeal;
        } else if (!sourceMeal && targetMeal) {
          delete newMeals[tgtIdx][tgtKey];
          newMeals[srcIdx][srcKey] = targetMeal;
        }

        return newMeals;
      });

      try {
        invalidateMealPlanCache(currentDate);
        await swapMealsAPI(srcIdx, srcKey, tgtIdx, tgtKey, currentDate);
      } catch (error) {
        console.error("Failed to swap meals in database, reverting...", error);
        if (originalMeals) {
          setWeeklyMeals(originalMeals);
        } else {
          loadMealPlan();
        }
      }
    },
    [currentDate, loadMealPlan],
  );

  // Enhanced setWeeklyMeals that also saves to database with debouncing
  const updateWeeklyMeals = useCallback(
    (mealsOrUpdater: WeeklyMeals | ((prev: WeeklyMeals) => WeeklyMeals)) => {
      setWeeklyMeals((prevMeals) => {
        const newMeals =
          typeof mealsOrUpdater === "function"
            ? mealsOrUpdater(prevMeals)
            : mealsOrUpdater;

        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(() => {
          saveMealPlan(newMeals);
        }, 1000);

        return newMeals;
      });
    },
    [saveMealPlan],
  );

  // Load meal plan on mount
  useEffect(() => {
    loadMealPlan(undefined, { preserveUI: false });
  }, [loadMealPlan]);

  // Re-fetch when navigating to a different week
  const prevWeekStartRef = useRef<string>("");
  useEffect(() => {
    const startOfWeek = new Date(currentDate);
    const mondayOffset =
      currentDate.getDay() === 0 ? -6 : 1 - currentDate.getDay();
    startOfWeek.setDate(currentDate.getDate() + mondayOffset);
    startOfWeek.setHours(0, 0, 0, 0);
    const weekKey = startOfWeek.toISOString();

    if (prevWeekStartRef.current && prevWeekStartRef.current !== weekKey) {
      loadMealPlan(currentDate, { preserveUI: true });
    }
    prevWeekStartRef.current = weekKey;
  }, [currentDate, loadMealPlan]);

  // Calculate nutrition from dishes
  const calculateDishCalories = (dish: Dish): number => {
    return dish.calories || 0;
  };

  const calculateSlotCalories = (meal: MealPlanItem | undefined): number => {
    if (!meal) return 0;
    if (meal.dishes && meal.dishes.length > 0) {
      return meal.dishes.reduce((sum, d) => sum + calculateDishCalories(d), 0);
    }
    return meal.calories || 0;
  };

  const calculateDayCalories = (dayMeals: Record<string, MealPlanItem>) => {
    return Object.values(dayMeals).reduce(
      (total, meal) => total + calculateSlotCalories(meal),
      0,
    );
  };

  const calculateDayMacros = (dayMeals: Record<string, MealPlanItem>) => {
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    Object.values(dayMeals).forEach((meal) => {
      if (meal?.dishes) {
        meal.dishes.forEach((dish) => {
          const nut = dish.nutrition as
            | {
                nutrients?: Array<{ name: string; amount: number }>;
              }
            | undefined;
          if (nut?.nutrients) {
            const p = nut.nutrients.find(
              (n) => n.name?.toLowerCase() === "protein",
            )?.amount;
            const c = nut.nutrients.find(
              (n) =>
                n.name?.toLowerCase() === "carbohydrates" ||
                n.name?.toLowerCase() === "carbs",
            )?.amount;
            const f = nut.nutrients.find(
              (n) => n.name?.toLowerCase() === "fat",
            )?.amount;
            protein += p ? Math.round(p * dish.quantity) : 0;
            carbs += c ? Math.round(c * dish.quantity) : 0;
            fat += f ? Math.round(f * dish.quantity) : 0;
          }
        });
      }
    });

    return { protein, carbs, fat };
  };

  const calculateWeeklyStats = (): WeeklyStats => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let daysWithData = 0;

    Object.values(weeklyMeals).forEach((dayMeals) => {
      const dayCals = calculateDayCalories(
        dayMeals as Record<string, MealPlanItem>,
      );
      const macros = calculateDayMacros(
        dayMeals as Record<string, MealPlanItem>,
      );
      if (dayCals > 0 || Object.keys(dayMeals).length > 0) {
        totalCalories += dayCals;
        totalProtein += macros.protein;
        totalCarbs += macros.carbs;
        totalFat += macros.fat;
        daysWithData++;
      }
    });

    const divisor = daysWithData || 1;
    return {
      avgCalories: Math.round(totalCalories / divisor),
      avgProtein: Math.round(totalProtein / divisor),
      avgCarbs: Math.round(totalCarbs / divisor),
      avgFat: Math.round(totalFat / divisor),
    };
  };

  const calculateDailyStats = () => {
    const adjustedDayIndex = (currentDate.getDay() - 1 + 7) % 7;
    const dayMeals = weeklyMeals[adjustedDayIndex] || {};
    const totalCalories = calculateDayCalories(
      dayMeals as Record<string, MealPlanItem>,
    );
    const macros = calculateDayMacros(dayMeals as Record<string, MealPlanItem>);
    const goal = 2000;

    return {
      totalCalories,
      caloriesLeft: Math.max(0, goal - totalCalories),
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
      goal,
    };
  };

  const getTodayInCurrentWeek = (weekStartDay: number = 1): number | null => {
    const today = new Date();
    const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
    const currentWeekEnd = endOfWeek(currentDate, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 });

    if (today >= currentWeekStart && today <= currentWeekEnd) {
      const dayIndex = (today.getDay() - weekStartDay + 7) % 7;
      return dayIndex;
    }
    return null;
  };

  const getCurrentDayIndex = () => {
    return currentDate.getDay();
  };

  const todayInCurrentWeek = useMemo(() => {
    const weekStart = preferencesLoading ? 1 : (preferences.weekStartDay ?? 1);
    return getTodayInCurrentWeek(weekStart);
  }, [currentDate, preferences.weekStartDay, preferencesLoading]);

  const navigateDate = (direction: "prev" | "next" | "today" | "date", date?: Date) => {
    if (direction === "today") {
      setCurrentDate(new Date());
      return;
    }
    if (direction === "date" && date) {
      setCurrentDate(date);
      return;
    }
    const newDate = new Date(currentDate);
    if (viewMode === "weekly") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const weeklyStats = useMemo(() => calculateWeeklyStats(), [weeklyMeals]);
  const dailyStats = useMemo(
    () => calculateDailyStats(),
    [weeklyMeals, currentDate],
  );

  const weekStartDay = preferencesLoading ? 1 : (preferences.weekStartDay ?? 1);

  return {
    // State
    viewMode,
    currentDate,
    currentDayIndex: getCurrentDayIndex(),
    todayInCurrentWeek,
    weekStartDay,
    weeklyMeals,
    draggedItem,
    activeDropZone,
    isLoading,
    isRefreshing,
    mealPlanId,

    // Setters
    setViewMode,
    setWeeklyMeals: updateWeeklyMeals,
    setDraggedItem,
    setActiveDropZone,

    // Computed values
    weeklyStats,
    dailyStats,

    // Functions
    navigateDate,
    calculateDayCalories,
    loadMealPlan,
    saveMealPlan,
    updateMealDishes,
    removeMeal,
    swapMeals,
    getTodayInCurrentWeek,
  };
}
