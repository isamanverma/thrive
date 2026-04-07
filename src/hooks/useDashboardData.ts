"use client";

import { useCallback, useEffect, useState } from "react";

export interface DashboardMeal {
  id: string;
  name: string;
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  image: string;
  completed: boolean;
  spoonacularId?: number;
  calories: number;
}

export interface WeeklyDayData {
  day: string;
  date: string;
  caloriesConsumed: number | null;
  weight: number | null;
}

export interface DashboardStats {
  mealCompletionRate: number;
  totalCaloriesToday: number;
  caloriesConsumedToday: number;
  caloriesRemaining: number;
  streakDays: number;
}

export interface DashboardData {
  user: {
    name: string | null;
    weight: number | null;
    goals: string | null;
    activityLevel: string | null;
  };
  todayMeals: DashboardMeal[];
  weeklyData: WeeklyDayData[];
  stats: DashboardStats;
}

export function useDashboardData(date: Date) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const response = await fetch(`/api/dashboard/overview?date=${dateStr}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data (${response.status})`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const toggleMeal = useCallback(async (mealId: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        todayMeals: prev.todayMeals.map((m) =>
          m.id === mealId ? { ...m, completed: !m.completed } : m,
        ),
      };
    });
  }, []);

  return { data, loading, error, refetch: fetchDashboard, toggleMeal };
}
