import type {
  DraggedItem,
  DropZone,
  MealPlanItem,
  ViewMode,
  WeeklyMeals,
  WeeklyStats
} from "../types";

import { useState } from "react";

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

  const [weeklyMeals, setWeeklyMeals] = useState<WeeklyMeals>(() => {
    const meals: WeeklyMeals = {};
    for (let i = 0; i < 7; i++) {
      meals[i] = {
        breakfast: sampleMeals.breakfast[i % sampleMeals.breakfast.length],
        lunch: sampleMeals.lunch[i % sampleMeals.lunch.length],
        snack: sampleMeals.snack[i % sampleMeals.snack.length],
        dinner: sampleMeals.dinner[i % sampleMeals.dinner.length],
      };
    }
    return meals;
  });

  // Calculate total calories for a day
  const calculateDayCalories = (dayMeals: Record<string, MealPlanItem>) => {
    return Object.values(dayMeals).reduce(
      (total, meal) => total + meal.calories,
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
    
    // Setters
    setViewMode,
    setWeeklyMeals,
    setDraggedItem,
    setActiveDropZone,
    
    // Computed values
    weeklyStats: calculateWeeklyStats(),
    
    // Functions
    navigateDate,
    calculateDayCalories,
  };
}
