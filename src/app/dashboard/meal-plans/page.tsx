"use client";

import { Calendar, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import {
  MealPlanCard,
  MealPlanItem,
} from "@/components/dashboard/MealPlanCard";

import { Button } from "@/components/ui/button";
import { MealDetailModal } from "@/components/dashboard/MealDetailModal";
import { MealSwapModal } from "@/components/dashboard/MealSwapModal";
import type React from "react";
import { motion } from "framer-motion";
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

const weeklyStats = {
  avgCalories: 1850,
  avgProtein: 120,
  avgCarbs: 150,
  avgFat: 60,
};

const dailyStats = {
  totalCalories: 1550,
  caloriesLeft: 450,
  protein: 110,
  carbs: 135,
  fat: 55,
  goal: 2000,
};

export default function MealPlansPage() {
  const [viewMode, setViewMode] = useState<"weekly" | "daily">("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedItem, setDraggedItem] = useState<{
    meal: MealPlanItem;
    mealType: string;
    dayIndex: number;
  } | null>(null);
  const [activeDropZone, setActiveDropZone] = useState<{
    mealType: string;
    dayIndex: number;
  } | null>(null);
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [swapMealType, setSwapMealType] = useState<string>("");
  const [swapDayIndex, setSwapDayIndex] = useState<number>(0);
  const [recipeDetailOpen, setRecipeDetailOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<MealPlanItem | null>(
    null
  );
  const [selectedMealType, setSelectedMealType] = useState<string>("");

  const [weeklyMeals, setWeeklyMeals] = useState<
    Record<number, Record<string, MealPlanItem>>
  >(() => {
    // Initialize weekly meals for 7 days with proper structure
    const meals: Record<number, Record<string, MealPlanItem>> = {};
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
  const calculateWeeklyStats = () => {
    const totalCalories = Object.values(weeklyMeals).reduce(
      (total, dayMeals) => total + calculateDayCalories(dayMeals),
      0
    );
    return {
      avgCalories: Math.round(totalCalories / 7),
      avgProtein: weeklyStats.avgProtein, // Keep other stats for now
      avgCarbs: weeklyStats.avgCarbs,
      avgFat: weeklyStats.avgFat,
    };
  };

  const formatWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return `${startOfWeek.toLocaleDateString("en-US", { month: "long", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;
  };

  const formatDayDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
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

  const handleSwapClick = (mealType: string, dayIndex?: number) => {
    setSwapMealType(mealType);
    setSwapDayIndex(dayIndex || 0);
    setSwapModalOpen(true);
  };

  const handleRecipeSelect = (recipe: MealPlanItem) => {
    setWeeklyMeals((prevWeeklyMeals) => {
      // Deep copy to avoid mutations
      const newWeeklyMeals = JSON.parse(JSON.stringify(prevWeeklyMeals));

      // Convert meal type to lowercase to match the object keys
      const mealTypeKey = swapMealType.toLowerCase();

      // Ensure the day object exists
      if (!newWeeklyMeals[swapDayIndex]) {
        newWeeklyMeals[swapDayIndex] = {};
      }

      console.log("Recipe select:", {
        dayIndex: swapDayIndex,
        mealType: mealTypeKey,
        recipe: recipe.name,
      });

      newWeeklyMeals[swapDayIndex][mealTypeKey] = recipe;
      return newWeeklyMeals;
    });
    setSwapModalOpen(false);
  };

  const handleRecipeClick = (
    recipe: MealPlanItem,
    mealType: string,
    dayIndex?: number
  ) => {
    setSelectedRecipe(recipe);
    setSelectedMealType(mealType);
    if (dayIndex !== undefined) {
      setSwapDayIndex(dayIndex);
    }
    setRecipeDetailOpen(true);
  };

  const handleDragStart = (
    e: React.DragEvent,
    meal: MealPlanItem,
    mealType: string,
    dayIndex: number
  ) => {
    console.log("Drag start:", { meal: meal.name, mealType, dayIndex });
    setDraggedItem({ meal, mealType, dayIndex });
    e.dataTransfer.setData("mealId", meal.id.toString());
    e.dataTransfer.setData("mealType", mealType);
    e.dataTransfer.setData("dayIndex", dayIndex.toString());
    e.dataTransfer.effectAllowed = "move";

    // Create a more transparent drag image
    const dragElement = e.currentTarget as HTMLElement;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const rect = dragElement.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    if (ctx) {
      ctx.globalAlpha = 0.7;
      // Add drag styling
      dragElement.style.filter = "brightness(1.1)";
    }

    // Show all drop indicators with improved visibility
    setTimeout(() => {
      const elements = document.querySelectorAll(
        '[data-drop-indicator="true"]'
      );
      elements.forEach((el) => {
        (el as HTMLElement).style.transition = "all 0.2s ease-out";
        (el as HTMLElement).style.backgroundColor = "#22c55e";
        (el as HTMLElement).style.height = "3px";
      });
    }, 100);
  };

  const handleDragEnd = () => {
    console.log("Drag end");
    // Clean up drag styling
    const draggedElements = document.querySelectorAll('[style*="filter"]');
    draggedElements.forEach((el) => {
      (el as HTMLElement).style.filter = "";
    });

    setDraggedItem(null);
    setActiveDropZone(null);
  };

  const handleDragOver = (
    e: React.DragEvent,
    mealType: string,
    dayIndex: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";

    // Only highlight if this is a different slot than the dragged item
    if (
      draggedItem &&
      (draggedItem.mealType !== mealType || draggedItem.dayIndex !== dayIndex)
    ) {
      setActiveDropZone({ mealType, dayIndex });
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only clear if we're actually leaving the drop zone
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const isInside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isInside) {
      setActiveDropZone(null);
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    targetMealType: string,
    targetDayIndex: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Drop event triggered:", {
      targetMealType,
      targetDayIndex,
      draggedItem,
    });

    if (!draggedItem) {
      console.log("No dragged item found");
      return;
    }

    // Don't allow dropping on the same slot
    if (
      draggedItem.dayIndex === targetDayIndex &&
      draggedItem.mealType === targetMealType
    ) {
      console.log("Dropping on same slot, ignoring");
      setDraggedItem(null);
      setActiveDropZone(null);
      return;
    }

    // Capture draggedItem values before clearing state
    const sourceDayIndex = draggedItem.dayIndex;
    const sourceMealType = draggedItem.mealType;
    const sourceMeal = draggedItem.meal;

    console.log("Swap details:", {
      source: {
        dayIndex: sourceDayIndex,
        mealType: sourceMealType,
        meal: sourceMeal.name,
      },
      target: { dayIndex: targetDayIndex, mealType: targetMealType },
    });

    // Clear drag state immediately to stop visual feedback
    setDraggedItem(null);
    setActiveDropZone(null);

    // Perform the swap immediately with proper deep copying
    setWeeklyMeals((prevWeeklyMeals) => {
      console.log("Before swap state:", prevWeeklyMeals);

      // Deep copy the entire state to prevent mutations
      const newWeeklyMeals = JSON.parse(JSON.stringify(prevWeeklyMeals));

      // Convert meal types to lowercase to match object keys
      const sourceMealKey = sourceMealType.toLowerCase();
      const targetMealKey = targetMealType.toLowerCase();

      // Ensure both day objects exist
      if (!newWeeklyMeals[sourceDayIndex]) {
        newWeeklyMeals[sourceDayIndex] = {};
      }
      if (!newWeeklyMeals[targetDayIndex]) {
        newWeeklyMeals[targetDayIndex] = {};
      }

      // Get the meals to swap
      const targetMeal = newWeeklyMeals[targetDayIndex][targetMealKey];

      console.log("Swapping meals:", {
        sourceMeal: sourceMeal.name,
        targetMeal: targetMeal?.name || "empty",
      });

      // Perform the swap
      newWeeklyMeals[sourceDayIndex][sourceMealKey] = targetMeal;
      newWeeklyMeals[targetDayIndex][targetMealKey] = sourceMeal;

      console.log("After swap state:", newWeeklyMeals);
      return newWeeklyMeals;
    });
  };

  // Add a state to track if items are swapping

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          {/* <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div> */}
          <h1 className="text-xl font-semibold text-gray-900">
            {viewMode === "weekly" ? "Weekly" : "Daily"} Meal Planner
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-gray-200 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("weekly")}
              className={`${
                viewMode === "weekly"
                  ? "bg-white shadow-sm text-gray-900 hover:bg-white"
                  : "text-gray-600 hover:bg-gray-300 hover:text-gray-900"
              }`}
            >
              <Calendar className="w-4 h-4 mr-1" />
              Weekly
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("daily")}
              className={`${
                viewMode === "daily"
                  ? "bg-white shadow-sm text-gray-900 hover:bg-white"
                  : "text-gray-600 hover:bg-gray-300 hover:text-gray-900"
              }`}
            >
              <Calendar className="w-4 h-4 mr-1" />
              Daily
            </Button>
          </div>

          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-1" />
            Regenerate {viewMode === "weekly" ? "Week" : "Day"}
          </Button>

          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => navigateDate("prev")}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-medium text-gray-900">
          {viewMode === "weekly"
            ? formatWeekRange(currentDate)
            : formatDayDate(currentDate)}
        </h2>
        <Button variant="ghost" size="sm" onClick={() => navigateDate("next")}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {viewMode === "weekly" ? (
        <>
          {/* Weekly Stats */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Stats
            </h3>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">
                  Avg. Daily Calories
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {calculateWeeklyStats().avgCalories}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Avg. Protein</p>
                <p className="text-2xl font-bold text-blue-600">
                  {calculateWeeklyStats().avgProtein}g
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Avg. Carbs</p>
                <p className="text-2xl font-bold text-orange-600">
                  {calculateWeeklyStats().avgCarbs}g
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Avg. Fat</p>
                <p className="text-2xl font-bold text-purple-600">
                  {calculateWeeklyStats().avgFat}g
                </p>
              </div>
            </div>
          </div>

          <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Day headers */}
            <div
              className="grid gap-0 bg-gray-50 border-b"
              style={{
                gridTemplateColumns: "80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
              }}
            >
              <div className="p-2 text-center text-xs font-medium text-gray-500"></div>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="p-4 text-center font-semibold text-gray-700"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Breakfast Section */}
            <motion.div
              className="bg-orange-50 border-b"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div
                className="grid gap-0"
                style={{
                  gridTemplateColumns: "80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                }}
              >
                <div className="p-2 flex items-center justify-center bg-orange-100">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                </div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => {
                    const dayMeals = weeklyMeals[index];
                    const isDropZone =
                      activeDropZone?.mealType === "Breakfast" &&
                      activeDropZone?.dayIndex === index;

                    return (
                      <motion.div
                        key={`breakfast-${index}`}
                        className={`p-3 transition-all duration-300 rounded-lg relative ${
                          isDropZone
                            ? "bg-gradient-to-r from-orange-100 to-orange-200 ring-4 ring-orange-300 ring-opacity-60 shadow-lg"
                            : "hover:bg-orange-50/30"
                        }`}
                        onDragOver={(e) =>
                          handleDragOver(e, "Breakfast", index)
                        }
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, "Breakfast", index)}
                        layout
                        animate={
                          isDropZone
                            ? {
                                scale: 1.05,
                                boxShadow: "0 8px 25px rgba(255, 165, 0, 0.3)",
                                transition: {
                                  duration: 0.2,
                                  ease: "easeOut",
                                },
                              }
                            : {
                                scale: 1,
                                boxShadow: "none",
                              }
                        }
                      >
                        <MealPlanCard
                          meal={dayMeals?.breakfast}
                          mealType="Breakfast"
                          dayIndex={index}
                          isDraggable={true}
                          showMealTypeLabel={false}
                          onCardClick={handleRecipeClick}
                          onDragStart={handleDragStart}
                          onDragEnd={handleDragEnd}
                          isDragging={
                            draggedItem?.dayIndex === index &&
                            draggedItem?.mealType === "Breakfast"
                          }
                        />
                      </motion.div>
                    );
                  }
                )}
              </div>
            </motion.div>

            {/* Lunch Section */}
            <motion.div
              className="bg-blue-50 border-b"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div
                className="grid gap-0"
                style={{
                  gridTemplateColumns: "80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                }}
              >
                <div className="p-2 flex items-center justify-center bg-blue-100">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => {
                    const dayMeals = weeklyMeals[index];
                    const isDropZone =
                      activeDropZone?.mealType === "Lunch" &&
                      activeDropZone?.dayIndex === index;

                    return (
                      <motion.div
                        key={`lunch-${index}`}
                        className={`p-3 transition-all duration-300 rounded-lg relative ${
                          isDropZone
                            ? "bg-gradient-to-r from-blue-100 to-blue-200 ring-4 ring-blue-300 ring-opacity-60 shadow-lg"
                            : "hover:bg-blue-50/30"
                        }`}
                        onDragOver={(e) => handleDragOver(e, "Lunch", index)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, "Lunch", index)}
                        layout
                        animate={
                          isDropZone
                            ? {
                                scale: 1.05,
                                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                                transition: {
                                  duration: 0.2,
                                  ease: "easeOut",
                                },
                              }
                            : {
                                scale: 1,
                                boxShadow: "none",
                              }
                        }
                      >
                        <MealPlanCard
                          meal={dayMeals?.lunch}
                          mealType="Lunch"
                          dayIndex={index}
                          isDraggable={true}
                          showMealTypeLabel={false}
                          onCardClick={handleRecipeClick}
                          onDragStart={handleDragStart}
                          onDragEnd={handleDragEnd}
                          isDragging={
                            draggedItem?.dayIndex === index &&
                            draggedItem?.mealType === "Lunch"
                          }
                        />
                      </motion.div>
                    );
                  }
                )}
              </div>
            </motion.div>

            {/* Snack Section */}
            <motion.div
              className="bg-purple-50 border-b"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div
                className="grid gap-0"
                style={{
                  gridTemplateColumns: "80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                }}
              >
                <div className="p-2 flex items-center justify-center bg-purple-100">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => {
                    const dayMeals = weeklyMeals[index];
                    const isDropZone =
                      activeDropZone?.mealType === "Snack" &&
                      activeDropZone?.dayIndex === index;

                    return (
                      <motion.div
                        key={`snack-${index}`}
                        className={`p-3 transition-all duration-300 rounded-lg relative ${
                          isDropZone
                            ? "bg-gradient-to-r from-purple-100 to-purple-200 ring-4 ring-purple-300 ring-opacity-60 shadow-lg"
                            : "hover:bg-purple-50/30"
                        }`}
                        onDragOver={(e) => handleDragOver(e, "Snack", index)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, "Snack", index)}
                        layout
                        animate={
                          isDropZone
                            ? {
                                scale: 1.05,
                                boxShadow: "0 8px 25px rgba(147, 51, 234, 0.3)",
                                transition: {
                                  duration: 0.2,
                                  ease: "easeOut",
                                },
                              }
                            : {
                                scale: 1,
                                boxShadow: "none",
                              }
                        }
                      >
                        {dayMeals?.snack ? (
                          <MealPlanCard
                            meal={dayMeals.snack}
                            mealType="Snack"
                            dayIndex={index}
                            isDraggable={true}
                            showMealTypeLabel={false}
                            onCardClick={handleRecipeClick}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            isDragging={
                              draggedItem?.dayIndex === index &&
                              draggedItem?.mealType === "Snack"
                            }
                          />
                        ) : (
                          <div className="bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 h-24 flex items-center justify-center text-gray-500 text-sm">
                            Drop snack here
                          </div>
                        )}
                      </motion.div>
                    );
                  }
                )}
              </div>
            </motion.div>

            {/* Dinner Section */}
            <motion.div
              className="bg-red-50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div
                className="grid gap-0"
                style={{
                  gridTemplateColumns: "80px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                }}
              >
                <div className="p-2 flex items-center justify-center bg-red-100">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => {
                    const dayMeals = weeklyMeals[index];
                    const isDropZone =
                      activeDropZone?.mealType === "Dinner" &&
                      activeDropZone?.dayIndex === index;

                    return (
                      <motion.div
                        key={`dinner-${index}`}
                        className={`p-3 transition-all duration-300 rounded-lg relative ${
                          isDropZone
                            ? "bg-gradient-to-r from-red-100 to-red-200 ring-4 ring-red-300 ring-opacity-60 shadow-lg"
                            : "hover:bg-red-50/30"
                        }`}
                        onDragOver={(e) => handleDragOver(e, "Dinner", index)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, "Dinner", index)}
                        layout
                        animate={
                          isDropZone
                            ? {
                                scale: 1.05,
                                boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
                                transition: {
                                  duration: 0.2,
                                  ease: "easeOut",
                                },
                              }
                            : {
                                scale: 1,
                                boxShadow: "none",
                              }
                        }
                      >
                        <MealPlanCard
                          meal={dayMeals?.dinner}
                          mealType="Dinner"
                          dayIndex={index}
                          isDraggable={true}
                          showMealTypeLabel={false}
                          onCardClick={handleRecipeClick}
                          onDragStart={handleDragStart}
                          onDragEnd={handleDragEnd}
                          isDragging={
                            draggedItem?.dayIndex === index &&
                            draggedItem?.mealType === "Dinner"
                          }
                        />
                      </motion.div>
                    );
                  }
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : (
        <>
          {/* Daily Stats */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-5 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Total Calories</p>
                <p className="text-3xl font-bold text-green-600">
                  {dailyStats.totalCalories}
                </p>
                <p className="text-xs text-gray-500">
                  Goal: {dailyStats.goal} kcal
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Calories Left</p>
                <p className="text-3xl font-bold text-green-600">
                  {dailyStats.caloriesLeft}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Protein</p>
                <p className="text-3xl font-bold text-blue-600">
                  {dailyStats.protein}g
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Carbs</p>
                <p className="text-3xl font-bold text-orange-600">
                  {dailyStats.carbs}g
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Fat</p>
                <p className="text-3xl font-bold text-purple-600">
                  {dailyStats.fat}g
                </p>
              </div>
            </div>
          </div>

          {/* Daily Meals */}
          <div className="grid grid-cols-4 gap-6">
            {[
              {
                type: "Breakfast",
                meal: sampleMeals.breakfast[0],
                calories: 350,
                description:
                  "Yogurt, granola, berries, and a drizzle of honey.",
              },
              {
                type: "Lunch",
                meal: sampleMeals.lunch[0],
                calories: 450,
                description:
                  "Quinoa with chickpeas, cucumber, and lemon dressing.",
              },
              {
                type: "Snack",
                meal: sampleMeals.snack[0],
                calories: 150,
                description:
                  "A crisp apple with a serving of natural peanut butter.",
              },
              {
                type: "Dinner",
                meal: sampleMeals.dinner[0],
                calories: 600,
                description: "Whole wheat spaghetti with a rich, meaty sauce.",
              },
            ].map((item, index) => (
              <MealPlanCard
                key={index}
                meal={item.meal}
                mealType={
                  item.type as "Breakfast" | "Lunch" | "Snack" | "Dinner"
                }
                showMealTypeLabel={true}
                onCardClick={handleRecipeClick}
              />
            ))}
          </div>
        </>
      )}

      {/* Meal Detail Modal */}
      <MealDetailModal
        isOpen={recipeDetailOpen}
        onClose={() => setRecipeDetailOpen(false)}
        meal={selectedRecipe}
        mealType={selectedMealType}
        dayIndex={swapDayIndex}
        onSwapClick={handleSwapClick}
      />

      {/* Meal Swap Modal */}
      <MealSwapModal
        isOpen={swapModalOpen}
        onClose={() => setSwapModalOpen(false)}
        mealType={swapMealType}
        availableMeals={
          sampleMeals[swapMealType.toLowerCase() as keyof typeof sampleMeals] ||
          []
        }
        onMealSelect={handleRecipeSelect}
      />
    </div>
  );
}
