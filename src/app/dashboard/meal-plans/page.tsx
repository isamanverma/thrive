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
import { Skeleton } from "@/components/ui/skeleton";
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
    isLoading,
    setViewMode,
    setDraggedItem,
    setActiveDropZone,
    navigateDate,
    updateSingleMeal,
    swapMeals,
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
    // Use nullish coalescing so a dayIndex of 0 is preserved
    setSwapDayIndex(dayIndex ?? 0);
    setSwapModalOpen(true);
  };

  const handleRecipeSelect = (recipe: MealPlanItem) => {
    // Guard: ensure a swap target was selected
    if (!swapMealType) {
      console.warn(
        "handleRecipeSelect called but swapMealType is empty. Aborting."
      );
      setSwapModalOpen(false);
      return;
    }

    // Use the new updateSingleMeal function for better persistence
    updateSingleMeal(swapDayIndex, swapMealType, recipe);
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

  const handleDeleteMeal = () => {
    // remove the selectedRecipe from weeklyMeals using selectedMealType and swapDayIndex
    if (!selectedRecipe) return;

    // Use the new updateSingleMeal function to remove the meal
    updateSingleMeal(swapDayIndex, selectedMealType, null);

    // close modal
    setRecipeDetailOpen(false);
    setSelectedRecipe(null);
  };

  const handleEmptySlotClick = (mealType: string, dayIndex: number) => {
    // Open the swap modal to let user fill the empty slot
    setSwapMealType(mealType);
    setSwapDayIndex(dayIndex);
    setSwapModalOpen(true);
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

    setDraggedItem(null);
    setActiveDropZone(null);

    // Use the new swapMeals function for better persistence
    swapMeals(sourceDayIndex, sourceMealType, targetDayIndex, targetMealType);
  };

  return (
    <div className="min-h-screen bg-muted p-6">
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

      {isLoading ? (
        viewMode === "weekly" ? (
          <>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>

            <div
              className="grid grid-cols-4 gap-3"
              style={{ gridAutoRows: "minmax(14rem, auto)" }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <Skeleton className="h-full w-full rounded-xl" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <Skeleton className="h-20 w-48" />
            </div>

            <div
              className="grid grid-cols-4 gap-3"
              style={{ gridAutoRows: "minmax(14rem, auto)" }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <Skeleton className="h-full w-full rounded-xl" />
                </div>
              ))}
            </div>
          </>
        )
      ) : viewMode === "weekly" ? (
        <div className="bg-card rounded-lg overflow-hidden shadow-sm">
          <div className="p-6">
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
              onEmptySlotClick={handleEmptySlotClick}
            />
          </div>
        </div>
      ) : (
        <>
          <DailyStatsCard stats={dailyStats} />
          <DailyMealGrid
            sampleMeals={sampleMeals}
            onRecipeClick={handleRecipeClick}
            weeklyMeals={weeklyMeals}
            onEmptySlotClick={handleEmptySlotClick}
            currentDayIndex={currentDayIndex}
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
        onDelete={handleDeleteMeal}
      />

      <MealSwapModal
        isOpen={swapModalOpen}
        onClose={() => setSwapModalOpen(false)}
        mealType={swapMealType}
        onMealSelect={handleRecipeSelect}
      />
    </div>
  );
}
