# Dashboard Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 4 stat-card row with a unified Daily Progress Panel and restructure the dashboard into a bento-grid layout with consistent date picking.

**Architecture:** Rewrite the dashboard page layout to compose a merged top bar (greeting + DateRangePicker + streak), a Daily Progress Panel with SVG calorie ring, a bento grid for meals/exercise, and a full-width weekly chart. Remove card wrappers in favor of border dividers and negative space.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, motion/react v12, Recharts, shadcn/ui

---

## File Map

| File                                               | Action      | Responsibility                                         |
| -------------------------------------------------- | ----------- | ------------------------------------------------------ |
| `src/components/dashboard/DailyProgressPanel.tsx`  | **Create**  | SVG calorie ring + meals status + exercise summary     |
| `src/components/dashboard/CalorieRing.tsx`         | **Create**  | Isolated animated SVG ring component                   |
| `src/app/dashboard/page.tsx`                       | **Rewrite** | New layout: top bar, progress panel, bento grid, chart |
| `src/components/dashboard/DashboardHeader.tsx`     | **Modify**  | Reduce heading from `text-3xl` to `text-2xl`           |
| `src/components/dashboard/MealCard.tsx`            | **Rewrite** | Remove MagicCard wrapper, convert to list-row style    |
| `src/components/dashboard/ExerciseCard.tsx`        | **Rewrite** | Remove MagicCard wrapper, make compact                 |
| `src/components/dashboard/WeeklyProgressChart.tsx` | **Modify**  | Accept adherence prop, make taller                     |
| `src/components/dashboard/DateSelector.tsx`        | **Delete**  | Replaced by DateRangePicker                            |

---

### Task 1: Create CalorieRing Component

**Files:**

- Create: `src/components/dashboard/CalorieRing.tsx`

- [ ] **Step 1: Create the CalorieRing component**

```tsx
"use client";

import { motion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

interface CalorieRingProps {
  consumed: number;
  target: number;
  size?: "sm" | "md";
}

const CIRCUMFERENCE = 2 * Math.PI * 48; // ≈ 301.59

export function CalorieRing({
  consumed,
  target,
  size = "md",
}: CalorieRingProps) {
  const progress = target > 0 ? Math.min(consumed / target, 1) : 0;
  const isOver = consumed > target;
  const [mounted, setMounted] = useState(false);

  const animatedProgress = useSpring(0, {
    stiffness: 80,
    damping: 16,
  });

  useEffect(() => {
    setMounted(true);
    animatedProgress.set(progress);
  }, [progress, animatedProgress]);

  const ringColor =
    progress >= 0.8
      ? "text-amber-500"
      : progress >= 0.5
        ? "text-amber-400"
        : "text-amber-300";

  const sizeClasses = size === "sm" ? "w-20 h-20" : "w-28 h-28";

  if (target === 0) {
    return (
      <div
        className={`${sizeClasses} flex flex-col items-center justify-center`}
      >
        <span className="text-2xl font-bold text-muted-foreground">—</span>
        <span className="text-xs text-muted-foreground mt-1">
          No target set
        </span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses} relative`}>
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/10"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{
            strokeDashoffset: animatedProgress.to(
              (p) => CIRCUMFERENCE * (1 - p),
            ),
          }}
          className={ringColor}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-bold tabular-nums ${isOver ? "text-rose-500" : "text-foreground"} ${size === "sm" ? "text-lg" : "text-2xl"}`}
        >
          {consumed.toLocaleString()}
        </span>
        <span
          className={`text-muted-foreground tabular-nums ${size === "sm" ? "text-xs" : "text-sm"}`}
        >
          / {target.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit src/components/dashboard/CalorieRing.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/CalorieRing.tsx
git commit -m "feat: add CalorieRing SVG component with spring animation"
```

---

### Task 2: Create DailyProgressPanel Component

**Files:**

- Create: `src/components/dashboard/DailyProgressPanel.tsx`
- Depends on: `src/components/dashboard/CalorieRing.tsx`

- [ ] **Step 1: Create the DailyProgressPanel component**

```tsx
"use client";

import { Check, Circle } from "lucide-react";
import { CalorieRing } from "./CalorieRing";

interface DailyProgressPanelProps {
  caloriesConsumed: number;
  caloriesTarget: number;
  meals: { type: string; completed: boolean }[];
  exerciseDuration: number;
  exerciseCompleted: number;
  exerciseTotal: number;
}

const mealTypeOrder = ["Breakfast", "Lunch", "Dinner", "Snack"];

export function DailyProgressPanel({
  caloriesConsumed,
  caloriesTarget,
  meals,
  exerciseDuration,
  exerciseCompleted,
  exerciseTotal,
}: DailyProgressPanelProps) {
  const completedMeals = meals.filter((m) => m.completed).length;
  const totalMeals = meals.length;
  const exerciseProgress =
    exerciseTotal > 0 ? (exerciseCompleted / exerciseTotal) * 100 : 0;

  return (
    <div className="border-t border-b py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
        {/* Calories */}
        <div className="flex items-center gap-6 px-4 py-3 md:py-0">
          <CalorieRing consumed={caloriesConsumed} target={caloriesTarget} />
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Calories</span>
            <span className="text-xs text-muted-foreground mt-1">kcal</span>
          </div>
        </div>

        {/* Meals */}
        <div className="flex flex-col gap-3 px-4 py-3 md:py-0">
          <div>
            <span className="text-sm text-muted-foreground">Meals</span>
            <p className="text-lg font-semibold tabular-nums">
              {completedMeals} of {totalMeals} completed
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {mealTypeOrder.map((type) => {
              const meal = meals.find((m) => m.type === type);
              const isCompleted = meal?.completed ?? false;
              return (
                <div key={type} className="flex items-center gap-1.5">
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5 text-amber-500" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-muted-foreground/40" />
                  )}
                  <span className="text-xs text-muted-foreground">{type}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exercise */}
        <div className="flex flex-col gap-3 px-4 py-3 md:py-0">
          <div>
            <span className="text-sm text-muted-foreground">Exercise</span>
            <p className="text-lg font-semibold tabular-nums">
              {exerciseCompleted} of {exerciseTotal} done
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">
              {exerciseDuration} min planned
            </span>
            <div className="w-full bg-amber-500/20 rounded-full h-1.5">
              <div
                className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${exerciseProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit src/components/dashboard/DailyProgressPanel.tsx`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/DailyProgressPanel.tsx
git commit -m "feat: add DailyProgressPanel with calories, meals, exercise sections"
```

---

### Task 3: Rewrite MealCard as List Row

**Files:**

- Modify: `src/components/dashboard/MealCard.tsx`

- [ ] **Step 1: Rewrite MealCard to remove MagicCard and use list-row style**

```tsx
"use client";

import { Bookmark, Check, Repeat } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface Meal {
  id: string;
  name: string;
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  image: string;
  completed?: boolean;
  ingredients?: string[];
  spoonacularId?: number;
}

interface MealCardProps {
  meal: Meal;
  onToggleComplete?: (id: string) => void;
  onRepeat?: (id: string) => void;
  onSave?: (id: string) => void;
  showIngredients?: boolean;
}

export function MealCard({
  meal,
  onToggleComplete,
  onRepeat,
  onSave,
  showIngredients = false,
}: MealCardProps) {
  const router = useRouter();

  const handleMealClick = () => {
    if (meal.spoonacularId) {
      router.push(`/recipe/${meal.spoonacularId}`);
    }
  };

  return (
    <div
      className={`flex items-center gap-4 py-3 ${meal.spoonacularId ? "cursor-pointer" : ""}`}
      onClick={handleMealClick}
    >
      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
        <Image
          src={meal.image}
          alt={meal.name}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4
          className={`font-medium truncate ${meal.completed ? "line-through opacity-50" : ""}`}
        >
          {meal.name}
        </h4>
        <Badge variant="secondary" className="mt-1">
          {meal.type}
        </Badge>
      </div>
      <div
        className="flex items-center gap-1 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 rounded-full ${
            meal.completed
              ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
              : "hover:bg-muted"
          }`}
          onClick={() => onToggleComplete?.(meal.id)}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-muted"
          onClick={() => onRepeat?.(meal.id)}
        >
          <Repeat className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-muted"
          onClick={() => onSave?.(meal.id)}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/dashboard/MealCard.tsx
git commit -m "refactor: simplify MealCard to list-row style, remove MagicCard"
```

---

### Task 4: Rewrite ExerciseCard as Compact List Row

**Files:**

- Modify: `src/components/dashboard/ExerciseCard.tsx`

- [ ] **Step 1: Rewrite ExerciseCard to remove MagicCard and make compact**

```tsx
"use client";

import { Check, Dumbbell, HeartPulse, Repeat, Video } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface Exercise {
  id: string;
  name: string;
  duration: string;
  type: "cardio" | "strength" | "flexibility";
  progress?: number;
  completed?: boolean;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onToggleComplete?: (id: string) => void;
  onRepeat?: (id: string) => void;
  onWatchVideo?: (id: string) => void;
}

export function ExerciseCard({
  exercise,
  onToggleComplete,
  onRepeat,
  onWatchVideo,
}: ExerciseCardProps) {
  const getIcon = () => {
    switch (exercise.type) {
      case "cardio":
        return <HeartPulse className="h-5 w-5 text-amber-500" />;
      case "strength":
        return <Dumbbell className="h-5 w-5 text-amber-500" />;
      default:
        return <HeartPulse className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm">{exercise.name}</h4>
          <p className="text-xs text-muted-foreground">{exercise.duration}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className={`h-7 w-7 rounded-full ${
              exercise.completed
                ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                : "hover:bg-muted"
            }`}
            onClick={() => onToggleComplete?.(exercise.id)}
          >
            <Check className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full hover:bg-muted"
            onClick={() => onRepeat?.(exercise.id)}
          >
            <Repeat className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full hover:bg-muted"
            onClick={() => onWatchVideo?.(exercise.id)}
          >
            <Video className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {exercise.progress !== undefined && (
        <div className="mt-2 ml-13">
          <div className="w-full bg-amber-500/20 rounded-full h-1.5">
            <div
              className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${exercise.progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/dashboard/ExerciseCard.tsx
git commit -m "refactor: simplify ExerciseCard to compact list-row, remove MagicCard"
```

---

### Task 5: Update WeeklyProgressChart

**Files:**

- Modify: `src/components/dashboard/WeeklyProgressChart.tsx`

- [ ] **Step 1: Add adherence prop and increase chart height**

Read the current file. Make these changes:

1. Add `adherence?: number` to props interface
2. Change container height from `h-40` to `h-56`
3. Add `// TODO: Replace with real exercise data from API when available` comment above the hardcoded exercise data usage
4. No other changes needed — Y-axis is already hidden

- [ ] **Step 2: Commit**

```bash
git add src/components/dashboard/WeeklyProgressChart.tsx
git commit -m "feat: increase chart height, add adherence prop to WeeklyProgressChart"
```

---

### Task 6: Reduce DashboardHeader Heading Size

**Files:**

- Modify: `src/components/dashboard/DashboardHeader.tsx`

- [ ] **Step 1: Change heading size**

In `DashboardHeader.tsx`, change line 84:

```tsx
// Before
<h1 className="text-3xl font-bold text-foreground">
// After
<h1 className="text-2xl font-bold text-foreground">
```

- [ ] **Step 2: Commit**

```bash
git add src/components/dashboard/DashboardHeader.tsx
git commit -m "style: reduce dashboard heading from text-3xl to text-2xl"
```

---

### Task 7: Rewrite Dashboard Page Layout

**Files:**

- Modify: `src/app/dashboard/page.tsx`
- Delete: `src/components/dashboard/DateSelector.tsx`

- [ ] **Step 1: Rewrite page.tsx with new layout**

Replace the entire `page.tsx` content with:

```tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Dumbbell } from "lucide-react";
import { addDays, format, isToday as isTodayFn } from "date-fns";
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
            <Skeleton className="w-28 h-28 rounded-full shrink-0" />
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <DashboardHeader />
          <div className="flex items-center gap-2">
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
```

- [ ] **Step 2: Delete DateSelector**

```bash
rm src/components/dashboard/DateSelector.tsx
```

- [ ] **Step 3: Verify no other imports of DateSelector**

Run: `grep -r "DateSelector" src/`
Expected: No results

- [ ] **Step 4: Commit**

```bash
git add src/app/dashboard/page.tsx src/components/dashboard/DateSelector.tsx
git commit -m "feat: rewrite dashboard layout with progress panel and bento grid"
```

---

### Task 8: Verify and Test

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Run dev server and visually inspect**

Run: `npm run dev`
Open: `http://localhost:3000/dashboard`
Check:

- Top bar shows greeting + date picker + streak + chevrons
- Daily Progress Panel shows calorie ring, meal status, exercise summary
- Meals section shows list rows with divide-y separators
- Exercise section shows compact list
- Weekly chart shows with adherence badge
- Mobile layout stacks correctly
- Loading skeletons display correctly
- Error state displays correctly

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: address dashboard layout issues"
```
