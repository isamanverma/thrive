"use client";

import { useState } from "react";
import { Flame, Leaf, Trophy, Target } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TipBanner } from "@/components/dashboard/TipBanner";
import { DateSelector } from "@/components/dashboard/DateSelector";
import { MealCard, type Meal } from "@/components/dashboard/MealCard";
import {
  ExerciseCard,
  type Exercise,
} from "@/components/dashboard/ExerciseCard";
import { CircularProgress } from "@/components/dashboard/CircularProgress";
import { WeeklyProgressChart } from "@/components/dashboard/WeeklyProgressChart";
import { AchievementBadge } from "@/components/dashboard/AchievementBadge";
import { MagicCard } from "@/components/magicui/magic-card";

// Sample data
const sampleMeals: Meal[] = [
  {
    id: "1",
    name: "Avocado Toast",
    type: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=300&fit=crop&crop=center",
    completed: true,
  },
  {
    id: "2",
    name: "Grilled Chicken Salad",
    type: "Lunch",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop&crop=center",
    completed: true,
    ingredients: [
      "200g Chicken Breast",
      "1 cup Mixed Greens",
      "1/2 cup Cherry Tomatoes",
      "1/4 Cucumber",
    ],
  },
  {
    id: "3",
    name: "Salmon with Asparagus",
    type: "Dinner",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=300&fit=crop&crop=center",
    completed: false,
  },
];

const sampleExercises: Exercise[] = [
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

const weeklyMealData = [80, 85, 90, 88, 92, 95, 89];
const weeklyExerciseData = [60, 65, 70, 68, 75, 78, 72];
const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meals, setMeals] = useState(sampleMeals);
  const [exercises, setExercises] = useState(sampleExercises);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleMealToggle = (id: string) => {
    setMeals(
      meals.map((meal) =>
        meal.id === id ? { ...meal, completed: !meal.completed } : meal
      )
    );
  };

  const handleExerciseToggle = (id: string) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === id
          ? { ...exercise, completed: !exercise.completed }
          : exercise
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-1 overflow-y-auto px-4 py-6 max-w-7xl mx-auto">
        <DashboardHeader />

        <TipBanner tip="Batch cooking on Sunday can save you time during the week!" />

        <div className="flex flex-col gap-6">
          {/* Header and Date Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {isToday(selectedDate) ? "Today's Plans" : "Daily Plans"}
            </h2>
            <DateSelector
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Meals Section */}
            <MagicCard className="bg-white p-4 rounded-2xl shadow-sm border-0">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Meals</h3>
              <div className="space-y-3">
                {meals.map((meal, index) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onToggleComplete={handleMealToggle}
                    showIngredients={index === 1} // Show ingredients for lunch
                  />
                ))}
              </div>
            </MagicCard>

            {/* Exercise Section */}
            <MagicCard className="bg-white p-4 rounded-2xl shadow-sm border-0">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Exercise</h3>
              <div className="space-y-3">
                {exercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onToggleComplete={handleExerciseToggle}
                  />
                ))}
              </div>
            </MagicCard>
          </div>

          {/* Progress & Infographics */}
          <MagicCard className="bg-white p-4 rounded-2xl shadow-sm border-0">
            <h2 className="text-xl font-bold mb-4">Progress & Infographics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Progress Charts */}
              <div className="flex flex-col items-center justify-center gap-3">
                <CircularProgress
                  percentage={89}
                  color="#16a34a"
                  label="Meals"
                />
                <CircularProgress
                  percentage={72}
                  color="#2563eb"
                  label="Exercise"
                />
              </div>

              {/* Weekly Progress Chart */}
              <div className="md:col-span-2">
                <h3 className="font-bold text-lg mb-2">Weekly Progress</h3>
                <WeeklyProgressChart
                  mealData={weeklyMealData}
                  exerciseData={weeklyExerciseData}
                  labels={weekLabels}
                />
                <div className="flex items-center justify-center gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    <span className="text-sm text-muted-foreground">Meals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm text-muted-foreground">
                      Exercise
                    </span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="md:col-span-3">
                <h3 className="font-bold text-lg mb-2">Achievements</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  <AchievementBadge
                    icon={<Flame className="h-8 w-8" />}
                    title="15-Day Streak"
                    isUnlocked={true}
                  />
                  <AchievementBadge
                    icon={<Leaf className="h-8 w-8" />}
                    title="Veggie Lover"
                    isUnlocked={true}
                  />
                  <AchievementBadge
                    icon={<Trophy className="h-8 w-8" />}
                    title="Workout Warrior"
                    isUnlocked={true}
                  />
                  <AchievementBadge
                    icon={<Target className="h-8 w-8" />}
                    title="Perfect Week"
                    isUnlocked={false}
                  />
                </div>
              </div>
            </div>
          </MagicCard>
        </div>
      </main>
    </div>
  );
}
