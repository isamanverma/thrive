"use client";

import { MealDetailModal } from "@/components/dashboard/MealDetailModal";
import { MealSwapModal } from "@/components/dashboard/MealSwapModal";
import {
  MealPlanHeader,
  DateNavigation,
  WeeklyStatsCard,
  DailyStatsCard,
  WeeklyMealGrid,
  DailyMealGrid,
  useMealPlanData,
  type MealPlanItem,
} from "@/components/dashboard/meal-plans";
import type React from "react";
import { useState } from "react";

const dailyStats = {
  totalCalories: 1550,
  caloriesLeft: 450,
  protein: 110,
  carbs: 135,
  fat: 55,
  goal: 2000,
};

export default function MealPlansPage() {
  const {
    viewMode,
    currentDate,
    currentDayIndex, // Add currentDayIndex here
    weeklyMeals,
    draggedItem,
    activeDropZone,
    sampleMeals,
    weeklyStats,
    setViewMode,
    setWeeklyMeals,
    setDraggedItem,
    setActiveDropZone,
    navigateDate,
  } = useMealPlanData();

  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [swapMealType, setSwapMealType] = useState<string>("");
  const [swapDayIndex, setSwapDayIndex] = useState<number>(0);
  const [recipeDetailOpen, setRecipeDetailOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<MealPlanItem | null>(
    null
  );
  const [selectedMealType, setSelectedMealType] = useState<string>("");

  const handleRegenerate = () => {
    // TODO: Implement regenerate logic
    console.log("Regenerating meal plan...");
  };

  const handleSwapClick = (mealType: string, dayIndex?: number) => {
    setSwapMealType(mealType);
    setSwapDayIndex(dayIndex || 0);
    setSwapModalOpen(true);
  };

  const handleRecipeSelect = (recipe: MealPlanItem) => {
    setWeeklyMeals((prevWeeklyMeals) => {
      const newWeeklyMeals = JSON.parse(JSON.stringify(prevWeeklyMeals));
      const mealTypeKey = swapMealType.toLowerCase();

      if (!newWeeklyMeals[swapDayIndex]) {
        newWeeklyMeals[swapDayIndex] = {};
      }

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
    setDraggedItem({ meal, mealType, dayIndex });
    e.dataTransfer.setData("mealId", meal.id.toString());
    e.dataTransfer.setData("mealType", mealType);
    e.dataTransfer.setData("dayIndex", dayIndex.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
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

    if (
      draggedItem &&
      (draggedItem.mealType !== mealType || draggedItem.dayIndex !== dayIndex)
    ) {
      setActiveDropZone({ mealType, dayIndex });
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
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

    if (!draggedItem) return;

    if (
      draggedItem.dayIndex === targetDayIndex &&
      draggedItem.mealType === targetMealType
    ) {
      setDraggedItem(null);
      setActiveDropZone(null);
      return;
    }

    const sourceDayIndex = draggedItem.dayIndex;
    const sourceMealType = draggedItem.mealType;
    const sourceMeal = draggedItem.meal;

    setDraggedItem(null);
    setActiveDropZone(null);

    setWeeklyMeals((prevWeeklyMeals) => {
      const newWeeklyMeals = JSON.parse(JSON.stringify(prevWeeklyMeals));
      const sourceMealKey = sourceMealType.toLowerCase();
      const targetMealKey = targetMealType.toLowerCase();

      if (!newWeeklyMeals[sourceDayIndex]) {
        newWeeklyMeals[sourceDayIndex] = {};
      }
      if (!newWeeklyMeals[targetDayIndex]) {
        newWeeklyMeals[targetDayIndex] = {};
      }

      const targetMeal = newWeeklyMeals[targetDayIndex][targetMealKey];
      newWeeklyMeals[sourceDayIndex][sourceMealKey] = targetMeal;
      newWeeklyMeals[targetDayIndex][targetMealKey] = sourceMeal;

      return newWeeklyMeals;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <MealPlanHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onRegenerate={handleRegenerate}
      />

      <DateNavigation
        viewMode={viewMode}
        currentDate={currentDate}
        onNavigate={navigateDate}
      />

      {viewMode === "weekly" ? (
        <>
          <WeeklyStatsCard stats={weeklyStats} />
          <WeeklyMealGrid
            weeklyMeals={weeklyMeals}
            draggedItem={draggedItem}
            activeDropZone={activeDropZone}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onRecipeClick={handleRecipeClick}
            currentDayIndex={currentDayIndex}
          />
        </>
      ) : (
        <>
          <DailyStatsCard stats={dailyStats} />
          <DailyMealGrid
            sampleMeals={sampleMeals}
            onRecipeClick={handleRecipeClick}
          />
        </>
      )}

      <MealDetailModal
        isOpen={recipeDetailOpen}
        onClose={() => setRecipeDetailOpen(false)}
        meal={selectedRecipe}
        mealType={selectedMealType}
        dayIndex={swapDayIndex}
        onSwapClick={handleSwapClick}
      />

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
