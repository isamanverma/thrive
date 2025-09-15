import type {
  DraggedItem,
  DropZone,
  MealPlanItem,
  ViewMode,
  WeeklyMeals,
  WeeklyStats
} from "../types";
import { useCallback, useEffect, useRef, useState } from "react";

const sampleMeals = {
  breakfast: [
    {
      id: 1,
      name: "Greek Yogurt Parfait",
      calories: 350,
      image: "/greek-yogurt-parfait.png",
      description: "Creamy yogurt layered with granola and fresh berries",
    },
    {
      id: 2,
      name: "Oatmeal with Berries",
      calories: 300,
      image: "/oatmeal-with-berries.png",
      description: "Warm oats topped with mixed berries and honey",
    },
    {
      id: 3,
      name: "Scrambled Eggs",
      calories: 280,
      image: "/fluffy-scrambled-eggs.png",
      description: "Fluffy scrambled eggs with herbs and butter",
    },
    {
      id: 4,
      name: "Green Smoothie",
      calories: 320,
      image: "/green-smoothie.png",
      description: "Spinach, banana, and mango smoothie",
    },
    {
      id: 5,
      name: "Pancakes",
      calories: 450,
      image: "/fluffy-pancakes.png",
      description: "Stack of fluffy pancakes with maple syrup",
    },
    {
      id: 6,
      name: "Poha",
      calories: 280,
      image: "/poha-indian-breakfast.jpg",
      description: "Flattened rice with vegetables and spices",
    },
    {
      id: 7,
      name: "Dosa",
      calories: 350,
      image: "/dosa-south-indian-crepe.jpg",
      description: "Crispy fermented crepe with coconut chutney",
    },
    {
      id: 8,
      name: "Avocado Toast",
      calories: 320,
      image: "/avocado-toast.png",
      description: "Whole grain toast topped with mashed avocado",
    },
  ],
  lunch: [
    {
      id: 9,
      name: "Quinoa Salad",
      calories: 450,
      image: "/colorful-quinoa-salad.png",
      description: "Protein-rich quinoa with fresh vegetables",
    },
    {
      id: 10,
      name: "Chicken Salad",
      calories: 480,
      image: "/creamy-chicken-salad.png",
      description: "Grilled chicken with mixed greens",
    },
    {
      id: 11,
      name: "Lentil Soup",
      calories: 400,
      image: "/hearty-lentil-soup.png",
      description: "Hearty soup with red lentils and vegetables",
    },
    {
      id: 12,
      name: "Tuna Sandwich",
      calories: 420,
      image: "/tuna-sandwich.jpg",
      description: "Fresh tuna salad on whole wheat bread",
    },
    {
      id: 13,
      name: "Leftover Stir-fry",
      calories: 650,
      image: "/leftover-stir-fry.jpg",
      description: "Mixed vegetables stir-fried with tofu",
    },
    {
      id: 14,
      name: "Buddha Bowl",
      calories: 520,
      image: "/buddha-bowl-healthy.jpg",
      description: "Colorful bowl with grains, vegetables, and protein",
    },
    {
      id: 15,
      name: "Wrap",
      calories: 380,
      image: "/healthy-wrap.jpg",
      description: "Whole wheat wrap with chicken and vegetables",
    },
  ],
  snack: [
    {
      id: 16,
      name: "Apple & Peanut Butter",
      calories: 150,
      image: "/apple-peanut-butter.jpg",
      description: "Crisp apple slices with natural peanut butter",
    },
    {
      id: 17,
      name: "Mixed Nuts",
      calories: 180,
      image: "/mixed-nuts.png",
      description: "Handful of almonds, walnuts, and cashews",
    },
    {
      id: 18,
      name: "Greek Yogurt",
      calories: 120,
      image: "/greek-yogurt-bowl.png",
      description: "Plain Greek yogurt with a drizzle of honey",
    },
    {
      id: 19,
      name: "Protein Bar",
      calories: 200,
      image: "/protein-bar.png",
      description: "Homemade protein bar with oats and dates",
    },
    {
      id: 20,
      name: "Trail Mix",
      calories: 160,
      image: "/trail-mix.png",
      description: "Mixed nuts, dried fruits, and seeds",
    },
    {
      id: 21,
      name: "Banana with Almond Butter",
      calories: 190,
      image: "/banana-almond-butter.png",
      description: "Fresh banana with creamy almond butter",
    },
    {
      id: 22,
      name: "Hummus with Veggies",
      calories: 140,
      image: "/hummus-veggies.png",
      description: "Fresh vegetables with homemade hummus",
    },
  ],
  dinner: [
    {
      id: 23,
      name: "Spaghetti Bolognese",
      calories: 600,
      image: "/spaghetti-bolognese.png",
      description: "Classic pasta with rich meat sauce",
    },
    {
      id: 24,
      name: "Fish Tacos",
      calories: 550,
      image: "/fish-tacos.jpg",
      description: "Grilled fish with fresh salsa in corn tortillas",
    },
    {
      id: 25,
      name: "Leftover Pizza",
      calories: 800,
      image: "/leftover-pizza.jpg",
      description: "Homemade pizza with fresh toppings",
    },
    {
      id: 26,
      name: "Homemade Pizza",
      calories: 800,
      image: "/homemade-pizza.png",
      description: "Wood-fired pizza with seasonal vegetables",
    },
    {
      id: 27,
      name: "Roast Chicken",
      calories: 700,
      image: "/perfectly-roasted-chicken.png",
      description: "Herb-crusted roasted chicken with vegetables",
    },
    {
      id: 28,
      name: "Salmon Teriyaki",
      calories: 520,
      image: "/salmon-teriyaki.jpg",
      description: "Glazed salmon with steamed rice and broccoli",
    },
    {
      id: 29,
      name: "Vegetable Curry",
      calories: 450,
      image: "/vegetable-curry.png",
      description: "Spiced vegetable curry with basmati rice",
    },
  ],
};

const baseWeeklyStats = {
  avgProtein: 120,
  avgCarbs: 150,
  avgFat: 60,
};

export function useMealPlanData() {
  const [viewMode, setViewMode] = useState<ViewMode>("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [activeDropZone, setActiveDropZone] = useState<DropZone | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mealPlanId, setMealPlanId] = useState<string | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoadingRef = useRef(false); // Prevent multiple simultaneous API calls
  const initialLoadRef = useRef(false); // Track if initial load has happened

  const [weeklyMeals, setWeeklyMeals] = useState<WeeklyMeals>(() => {
    // Start with an empty week so the UI renders a neutral skeleton on hard refresh.
    // Persisted data (if any) will replace this after the initial fetch completes.
    const meals: WeeklyMeals = {};
    for (let i = 0; i < 7; i++) {
      meals[i] = {};
    }
    return meals;
  });

  // Load meal plan from database
  const loadMealPlan = useCallback(async () => {
    try {
      // Prevent multiple simultaneous API calls
      if (isLoadingRef.current) {
        return;
      }

      isLoadingRef.current = true;
      setIsLoading(true);

      const response = await fetch('/api/meal-plans/current');

      if (!response.ok) {
        // Ensure UI shows an empty week rather than sample data on failure
        console.warn('Failed to load meal plan, rendering empty week');
        const emptyMeals: WeeklyMeals = {};
        for (let i = 0; i < 7; i++) emptyMeals[i] = {};
        setWeeklyMeals(emptyMeals);
        setMealPlanId(null);
        return;
      }

      const data = await response.json();

      // Normalize server response into a complete 0-6 mapping to avoid shape changes
      const meals: WeeklyMeals = {};
      for (let i = 0; i < 7; i++) meals[i] = {};

      if (data && typeof data.weeklyMeals === 'object' && Object.keys(data.weeklyMeals).length > 0) {
        Object.entries(data.weeklyMeals).forEach(([k, v]) => {
          const idx = parseInt(k, 10);
          if (!Number.isNaN(idx) && idx >= 0 && idx < 7) {
            meals[idx] = v as WeeklyMeals[number];
          }
        });
        setWeeklyMeals(meals);
        setMealPlanId(data.mealPlanId || null);
      } else {
        // No persisted items -> keep empty week (neutral skeleton)
        setWeeklyMeals(meals);
        setMealPlanId(data?.mealPlanId || null);
      }
    } catch (error) {
      console.error('Error loading meal plan:', error);
      const meals: WeeklyMeals = {};
      for (let i = 0; i < 7; i++) meals[i] = {};
      setWeeklyMeals(meals);
      setMealPlanId(null);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
      initialLoadRef.current = true;
    }
  }, []);

  // Save meal plan to database
  const saveMealPlan = useCallback(async (meals: WeeklyMeals) => {
    try {
      // Calculate start and end dates for current week using the state currentDate
      const startOfWeek = new Date(currentDate);
      // Get Monday as start of week
      const mondayOffset = currentDate.getDay() === 0 ? -6 : 1 - currentDate.getDay();
      startOfWeek.setDate(currentDate.getDate() + mondayOffset);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const response = await fetch('/api/meal-plans/current', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weeklyMeals: meals,
          startDate: startOfWeek.toISOString(),
          endDate: endOfWeek.toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMealPlanId(data.mealPlanId);
      } else {
        console.error('Failed to save meal plan');
      }
    } catch (error) {
      console.error('Error saving meal plan:', error);
    }
  }, [currentDate]);

  // Update a single meal with optimistic updates
  const updateSingleMeal = useCallback(async (
    dayIndex: number, 
    mealType: string, 
    meal: MealPlanItem | null
  ) => {
    // Optimistically update the UI first
    setWeeklyMeals((prevMeals) => {
      const newMeals = JSON.parse(JSON.stringify(prevMeals));
      const mealTypeKey = mealType.toLowerCase();

      if (!newMeals[dayIndex]) {
        newMeals[dayIndex] = {};
      }

      if (meal) {
        newMeals[dayIndex][mealTypeKey] = meal;
      } else {
        delete newMeals[dayIndex][mealTypeKey];
      }

      return newMeals;
    });

    // Then persist to database
    try {
      const response = await fetch('/api/meal-plans/update-meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dayIndex,
          mealType: mealType.toLowerCase(),
          meal: meal,
          action: meal ? 'set' : 'remove',
        }),
      });

      if (!response.ok) {
        console.error('Failed to update meal in database, reverting...');
        // Revert optimistic update on failure
        loadMealPlan();
      }
    } catch (error) {
      console.error('Error updating meal:', error);
      // Revert optimistic update on failure
      loadMealPlan();
    }
  }, [loadMealPlan]);

  // Swap two meals with optimistic updates
  const swapMeals = useCallback(async (
    sourceDayIndex: number,
    sourceMealType: string,
    targetDayIndex: number,
    targetMealType: string
  ) => {
    // Store original state for potential rollback
    const originalMeals = JSON.parse(JSON.stringify(weeklyMeals));

    // Optimistically update the UI first
    setWeeklyMeals((prevMeals) => {
      const newMeals = JSON.parse(JSON.stringify(prevMeals));
      const sourceMealKey = sourceMealType.toLowerCase();
      const targetMealKey = targetMealType.toLowerCase();

      if (!newMeals[sourceDayIndex]) newMeals[sourceDayIndex] = {};
      if (!newMeals[targetDayIndex]) newMeals[targetDayIndex] = {};

      const sourceMeal = newMeals[sourceDayIndex][sourceMealKey];
      const targetMeal = newMeals[targetDayIndex][targetMealKey];

      // Perform the swap
      if (sourceMeal && targetMeal) {
        // Both exist - swap them
        newMeals[sourceDayIndex][sourceMealKey] = targetMeal;
        newMeals[targetDayIndex][targetMealKey] = sourceMeal;
      } else if (sourceMeal && !targetMeal) {
        // Only source exists - move to target
        delete newMeals[sourceDayIndex][sourceMealKey];
        newMeals[targetDayIndex][targetMealKey] = sourceMeal;
      } else if (!sourceMeal && targetMeal) {
        // Only target exists - move to source
        delete newMeals[targetDayIndex][targetMealKey];
        newMeals[sourceDayIndex][sourceMealKey] = targetMeal;
      }

      return newMeals;
    });

    // Then persist to database
    try {
      const response = await fetch('/api/meal-plans/swap-meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceDayIndex,
          sourceMealType: sourceMealType.toLowerCase(),
          targetDayIndex,
          targetMealType: targetMealType.toLowerCase(),
        }),
      });

      if (!response.ok) {
        console.error('Failed to swap meals in database, reverting...');
        // Revert to original state on failure
        setWeeklyMeals(originalMeals);
      }
    } catch (error) {
      console.error('Error swapping meals:', error);
      // Revert to original state on failure
      setWeeklyMeals(originalMeals);
    }
  }, [weeklyMeals]);

  // Enhanced setWeeklyMeals that also saves to database with debouncing
  const updateWeeklyMeals = useCallback((
    mealsOrUpdater: WeeklyMeals | ((prev: WeeklyMeals) => WeeklyMeals)
  ) => {
    setWeeklyMeals((prevMeals) => {
      const newMeals = typeof mealsOrUpdater === 'function' 
        ? mealsOrUpdater(prevMeals) 
        : mealsOrUpdater;
      
      // Clear previous timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // Debounce the save operation to avoid too many API calls
      saveTimeoutRef.current = setTimeout(() => {
        saveMealPlan(newMeals);
      }, 1000); // Save after 1 second of inactivity
      
      return newMeals;
    });
  }, [saveMealPlan]);

  // Load meal plan on component mount only
  useEffect(() => {
    loadMealPlan();
  }, [loadMealPlan]);

  // Calculate total calories for a day
  const calculateDayCalories = (dayMeals: Record<string, MealPlanItem>) => {
    return Object.values(dayMeals).reduce(
      (total, meal) => total + (meal.calories ?? 0),
      0
    );
  };

  // Calculate weekly average calories
  const calculateWeeklyStats = (): WeeklyStats => {
    const totalCalories = Object.values(weeklyMeals).reduce(
      (total, dayMeals) => total + calculateDayCalories(dayMeals),
      0
    );
    return {
      avgCalories: Math.round(totalCalories / 7),
      ...baseWeeklyStats,
    };
  };

  // Calculate current day index (0 = Sunday, 1 = Monday, etc.)
  const getCurrentDayIndex = () => {
    return currentDate.getDay();
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (viewMode === "weekly") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  return {
    // State
    viewMode,
    currentDate,
    currentDayIndex: getCurrentDayIndex(),
    weeklyMeals,
    draggedItem,
    activeDropZone,
    sampleMeals,
    isLoading,
    mealPlanId,
    
    // Setters
    setViewMode,
    setWeeklyMeals: updateWeeklyMeals, // Use the enhanced version that saves to DB
    setDraggedItem,
    setActiveDropZone,
    
    // Computed values
    weeklyStats: calculateWeeklyStats(),
    
    // Functions
    navigateDate,
    calculateDayCalories,
    loadMealPlan,
    saveMealPlan,
    updateSingleMeal,
    swapMeals,
  };
}
