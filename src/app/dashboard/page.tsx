"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Dumbbell } from "lucide-react";
import { addDays, isToday as isTodayFn } from "date-fns";
import { motion } from "motion/react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MealCard, type Meal } from "@/components/dashboard/MealCard";
import {
  ExerciseCard,
  type Exercise,
} from "@/components/dashboard/ExerciseCard";
import { WeeklyProgressChart } from "@/components/dashboard/WeeklyProgressChart";
import { DailyProgressPanel } from "@/components/dashboard/DailyProgressPanel";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const dummyExercises: Exercise[] = [
  {
    id: "1",
    name: "Morning Run",
    duration: "30 minutes",
    type: "cardio",
    progress: 75,
    completed: true,
  },
  {
    id: "2",
    name: "Full Body Workout",
    duration: "45 minutes",
    type: "strength",
    progress: 25,
    completed: false,
  },
];

function ProgressPanelSkeleton() {
  return (
    <div className="border-t border-b py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-6 px-4 py-3 md:py-0">
            <Skeleton className="w-20 h-20 md:w-28 md:h-28 rounded-full shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MealSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4 py-3">
          <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

const mealVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 60 },
  },
};

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data, loading, error, toggleMeal } = useDashboardData(selectedDate);
  const [exercises] = useState(dummyExercises);

  const isToday = isTodayFn(selectedDate);

  const handleExerciseToggle = (id: string) => {};

  const mealData =
    data?.todayMeals.map((m) => ({ ...m, completed: m.completed })) ?? [];

  const weeklyMealCompletion = data?.weeklyData.map((d) =>
    d.caloriesConsumed !== null
      ? Math.min(
          100,
          Math.round(
            (d.caloriesConsumed / Math.max(data.stats.totalCaloriesToday, 1)) *
              100,
          ),
        )
      : 0,
  ) ?? [0, 0, 0, 0, 0, 0, 0];

  const weeklyExerciseData = [60, 65, 70, 68, 75, 78, 72];

  // Calculate adherence
  const adherence = data?.weeklyData
    ? Math.round(
        (data.weeklyData.filter(
          (d) =>
            d.caloriesConsumed !== null &&
            d.caloriesConsumed >=
              0.8 * Math.max(data.stats.totalCaloriesToday, 1),
        ).length /
          Math.max(data.weeklyData.length, 1)) *
          100,
      )
    : 0;

  // Exercise summary
  const exerciseTotal = exercises.length;
  const exerciseCompleted = exercises.filter((e) => e.completed).length;
  const exerciseDuration = exercises.reduce((sum, e) => {
    const match = e.duration.match(/(\d+)/);
    return sum + (match ? parseInt(match[1], 10) : 0);
  }, 0);

  // Meal types for progress panel
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;
  const mealStatuses = mealTypes.map((type) => ({
    type,
    completed: mealData.find((m) => m.type === type)?.completed ?? false,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="flex-1 overflow-y-auto px-4 py-6 max-w-7xl mx-auto">
          <Skeleton className="h-8 w-48 mb-6" />
          <ProgressPanelSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2">
              <Skeleton className="h-6 w-20 mb-4" />
              <MealSkeleton />
            </div>
            <div>
              <Skeleton className="h-6 w-20 mb-4" />
              <MealSkeleton />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <main className="flex-1 overflow-y-auto px-4 py-6 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <DashboardHeader />
          </div>
          <div className="border border-destructive/50 rounded-lg p-4">
            <p className="text-sm text-destructive">
              Failed to load dashboard data: {error}
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1 overflow-y-auto px-4 py-6 max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex flex-col gap-4 mb-6">
          <DashboardHeader />
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedDate(addDays(selectedDate, -1))}
              className="h-8 w-8"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <DateRangePicker
              value={{ from: selectedDate, to: selectedDate }}
              onChange={(range) => setSelectedDate(range.from)}
              dayCount={1}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedDate(addDays(selectedDate, 1))}
              className="h-8 w-8"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            {data && data.stats.streakDays > 0 && (
              <span className="text-sm text-muted-foreground whitespace-nowrap ml-2">
                🔥 {data.stats.streakDays} day
                {data.stats.streakDays > 1 ? "s" : ""}
              </span>
            )}
            {!isToday && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDate(new Date())}
                className="text-xs font-medium h-8 ml-1"
              >
                Today
              </Button>
            )}
          </div>
        </div>

        {/* Daily Progress Panel */}
        {data && (
          <DailyProgressPanel
            caloriesConsumed={data.stats.caloriesConsumedToday}
            caloriesTarget={data.stats.totalCaloriesToday}
            meals={mealStatuses}
            exerciseDuration={exerciseDuration}
            exerciseCompleted={exerciseCompleted}
            exerciseTotal={exerciseTotal}
          />
        )}

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Meals */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">Meals</h3>
              <Badge variant="secondary">{mealData.length} today</Badge>
            </div>
            {mealData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  No meals planned for this day.
                </p>
                <Button asChild variant="outline">
                  <Link href="/dashboard/meal-plans">Generate meal plan</Link>
                </Button>
              </div>
            ) : (
              <motion.ul
                className="divide-y divide-border/50"
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                {mealData.map((meal) => (
                  <motion.li key={meal.id} variants={mealVariants}>
                    <MealCard
                      meal={meal as Meal}
                      onToggleComplete={toggleMeal}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>

          {/* Exercise */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-4 w-4 text-amber-500" />
              <h3 className="text-lg font-semibold">Exercise</h3>
            </div>
            {exercises.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  No exercise planned.
                </p>
                <Button asChild variant="outline">
                  <Link href="/dashboard/exercise-plans">Browse exercises</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {exercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onToggleComplete={handleExerciseToggle}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Weekly Progress */}
        {data && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">Weekly Progress</h3>
              <Badge variant="secondary">{adherence}% adherence</Badge>
            </div>
            <WeeklyProgressChart
              mealData={weeklyMealCompletion}
              exerciseData={weeklyExerciseData}
              labels={data.weeklyData.map((d) => d.day)}
              adherence={adherence}
            />
            <div className="flex items-center justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-muted-foreground">Meals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-sm text-muted-foreground">Exercise</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
