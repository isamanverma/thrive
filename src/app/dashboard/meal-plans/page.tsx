"use client";

import {
  MealPlanHeader,
  WeeklyStatsCard,
  DailyStatsCard,
  WeeklyMealGrid,
  DailyMealGrid,
  useMealPlanData,
} from "@/components/dashboard/meal-plans";
import { MealDrawer } from "@/components/dashboard/meal-plans/MealDrawer";
import type {
  Dish,
  MealTypeCapitalized,
} from "@/components/dashboard/meal-plans/types";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState, useCallback } from "react";

export default function MealPlansPage() {
  const {
    viewMode,
    currentDate,
    currentDayIndex,
    weeklyMeals,
    draggedItem,
    activeDropZone,
    weeklyStats,
    dailyStats,
    isLoading,
    isRefreshing,
    setViewMode,
    setDraggedItem,
    setActiveDropZone,
    navigateDate,
    updateMealDishes,
    swapMeals,
  } = useMealPlanData();

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMealType, setDrawerMealType] =
    useState<MealTypeCapitalized>("Breakfast");
  const [drawerDayIndex, setDrawerDayIndex] = useState(0);
  const [drawerDishes, setDrawerDishes] = useState<Dish[]>([]);

  const dayLabels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleSlotClick = useCallback(
    (mealType: string, dayIndex: number) => {
      const mealKey = mealType.toLowerCase() as keyof (typeof weeklyMeals)[0];
      const meal = weeklyMeals[dayIndex]?.[mealKey];
      const dishes: Dish[] = (meal as { dishes?: Dish[] })?.dishes || [];

      setDrawerMealType(mealType as MealTypeCapitalized);
      setDrawerDayIndex(dayIndex);
      setDrawerDishes(dishes);
      setDrawerOpen(true);
    },
    [weeklyMeals],
  );

  const handleEmptySlotClick = useCallback(
    (mealType: string, dayIndex: number) => {
      setDrawerMealType(mealType as MealTypeCapitalized);
      setDrawerDayIndex(dayIndex);
      setDrawerDishes([]);
      setDrawerOpen(true);
    },
    [],
  );

  const handleDrawerSave = useCallback(
    (dishes: Dish[]) => {
      updateMealDishes(drawerDayIndex, drawerMealType, dishes);
    },
    [drawerDayIndex, drawerMealType, updateMealDishes],
  );

  // Drag and drop handlers (simplified — operate on whole meal slots now)
  const handleDragStart = useCallback(
    (e: React.DragEvent, mealType: string, dayIndex: number) => {
      const mealKey = mealType.toLowerCase() as keyof (typeof weeklyMeals)[0];
      const meal = weeklyMeals[dayIndex]?.[mealKey];
      if (!meal) return;
      setDraggedItem({ meal, mealType, dayIndex });
      e.dataTransfer.setData("mealId", String(meal.id));
      e.dataTransfer.setData("mealType", mealType);
      e.dataTransfer.setData("dayIndex", dayIndex.toString());
      e.dataTransfer.effectAllowed = "move";
    },
    [weeklyMeals, setDraggedItem],
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setActiveDropZone(null);
  }, [setDraggedItem, setActiveDropZone]);

  const handleDragOver = useCallback(
    (e: React.DragEvent, mealType: string, dayIndex: number) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = "move";
      if (
        draggedItem &&
        (draggedItem.mealType !== mealType || draggedItem.dayIndex !== dayIndex)
      ) {
        setActiveDropZone({ mealType, dayIndex });
      }
    },
    [draggedItem, setActiveDropZone],
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
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
    },
    [setActiveDropZone],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, targetMealType: string, targetDayIndex: number) => {
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

      swapMeals(
        draggedItem.dayIndex,
        draggedItem.mealType,
        targetDayIndex,
        targetMealType,
      );
      setDraggedItem(null);
      setActiveDropZone(null);
    },
    [draggedItem, swapMeals, setDraggedItem, setActiveDropZone],
  );

  return (
    <div className="w-full max-w-none px-4 pt-2 h-full min-h-0 flex flex-col overflow-hidden">
      <MealPlanHeader
        viewMode={viewMode}
        currentDate={currentDate}
        onViewModeChange={setViewMode}
        onNavigate={navigateDate}
      />

      {isLoading ? (
        viewMode === "weekly" ? (
          <>
            <div className="mb-6 flex items-baseline gap-8 px-1">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="grid grid-cols-[40px_repeat(7,1fr)] gap-2">
              <Skeleton className="h-8 w-10 rounded-lg" />
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={`head-${i}`} className="h-8 w-full rounded-lg" />
              ))}
              {Array.from({ length: 4 }).map((_, row) => (
                <React.Fragment key={`row-${row}`}>
                  <Skeleton className="h-20 w-10 rounded-xl" />
                  {Array.from({ length: 7 }).map((_, col) => (
                    <Skeleton
                      key={`cell-${row}-${col}`}
                      className="h-20 w-full rounded-xl"
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 flex items-baseline gap-8 px-1">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-xl" />
              ))}
            </div>
          </>
        )
      ) : viewMode === "weekly" ? (
        <div className="relative flex flex-1 min-h-0 flex-col overflow-hidden">
          <WeeklyStatsCard stats={weeklyStats} />
          <div className="flex-1 min-h-0">
            <WeeklyMealGrid
              weeklyMeals={weeklyMeals}
              draggedItem={draggedItem}
              activeDropZone={activeDropZone}
              currentDayIndex={currentDayIndex}
              onSlotClick={handleSlotClick}
              onEmptySlotClick={handleEmptySlotClick}
            />
          </div>
          {isRefreshing && (
            <div className="absolute inset-0 z-10 pointer-events-none rounded-xl bg-background/45 backdrop-blur-[1px] animate-in fade-in-0 duration-200">
              <div className="p-2 pt-12">
                <Skeleton className="h-3 w-16 mb-4" />
                <div className="grid grid-cols-[40px_repeat(7,1fr)] gap-2">
                  <Skeleton className="h-8 w-10 rounded-lg" />
                  {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton
                      key={`refresh-head-${i}`}
                      className="h-8 w-full rounded-lg"
                    />
                  ))}
                  {Array.from({ length: 4 }).map((_, row) => (
                    <React.Fragment key={`refresh-row-${row}`}>
                      <Skeleton className="h-20 w-10 rounded-xl" />
                      {Array.from({ length: 7 }).map((_, col) => (
                        <Skeleton
                          key={`refresh-cell-${row}-${col}`}
                          className="h-20 w-full rounded-xl"
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <DailyStatsCard stats={dailyStats} />
          <DailyMealGrid
            weeklyMeals={weeklyMeals}
            onSlotClick={handleSlotClick}
            onEmptySlotClick={handleEmptySlotClick}
            currentDayIndex={currentDayIndex}
          />
          {isRefreshing && (
            <div className="absolute inset-0 z-10 pointer-events-none rounded-xl bg-background/45 backdrop-blur-[1px] animate-in fade-in-0 duration-200">
              <div className="p-2 pt-12">
                <Skeleton className="h-3 w-12 mb-4" />
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton
                      key={`daily-refresh-${i}`}
                      className="aspect-square w-full rounded-xl"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <MealDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        mealType={drawerMealType}
        dayLabel={dayLabels[drawerDayIndex] || ""}
        initialDishes={drawerDishes}
        onSave={handleDrawerSave}
      />
    </div>
  );
}
