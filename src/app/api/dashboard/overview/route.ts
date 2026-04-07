import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function resolveCalories(nutrition: unknown): number {
  if (!nutrition || typeof nutrition !== "object") return 0;
  const rn = nutrition as { [k: string]: unknown };
  if (typeof rn.calories === "number") return rn.calories as number;
  if (Array.isArray(rn.nutrients)) {
    const found = (rn.nutrients as unknown[]).find((n) => {
      if (!n || typeof n !== "object") return false;
      const obj = n as { name?: unknown; amount?: unknown };
      return (
        typeof obj.name === "string" &&
        (obj.name as string).toLowerCase().includes("calorie") &&
        typeof obj.amount === "number"
      );
    });
    if (found) return (found as { amount: number }).amount;
  }
  return 0;
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const dateParam = url.searchParams.get("date");
    const targetDate = dateParam ? parseDate(dateParam) : new Date();
    targetDate.setHours(0, 0, 0, 0);

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const dayOfWeek = targetDate.getDay();
    const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const startOfWeek = new Date(targetDate);
    const offset = (targetDate.getDay() - 1 + 7) % 7;
    startOfWeek.setDate(targetDate.getDate() - offset);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const mealPlan = await prisma.mealPlan.findFirst({
      where: {
        userId: user.id,
        startDate: { lte: endOfWeek },
        endDate: { gte: startOfWeek },
      },
      include: {
        mealPlanItems: {
          include: {
            cachedRecipe: true,
            dishes: { include: { recipe: true }, orderBy: { order: "asc" } },
          },
        },
      },
    });

    const todayMeals: Array<{
      id: string;
      name: string;
      type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
      image: string;
      completed: boolean;
      spoonacularId?: number;
      calories: number;
    }> = [];

    if (mealPlan) {
      const todayItems = mealPlan.mealPlanItems.filter(
        (item) => item.dayOfWeek - 1 === dayIndex,
      );

      for (const item of todayItems) {
        const dishes = item.dishes.map((dish) => {
          const calories = resolveCalories(dish.recipe.nutrition);
          return {
            name: dish.recipe.title,
            calories: Math.round(calories * dish.quantity) || 0,
            image: dish.recipe.imageUrl || dish.recipe.fallbackImageUrl || "",
            sourceId: dish.recipe.sourceId,
          };
        });

        if (dishes.length === 0 && item.cachedRecipe) {
          const calories = resolveCalories(item.cachedRecipe.nutrition);
          dishes.push({
            name: item.cachedRecipe.title,
            calories: Math.round(calories) || 0,
            image:
              item.cachedRecipe.imageUrl ||
              item.cachedRecipe.fallbackImageUrl ||
              "",
            sourceId: item.cachedRecipe.sourceId,
          });
        }

        if (dishes.length > 0) {
          const primary = dishes[0];
          todayMeals.push({
            id: item.id,
            name:
              dishes.length > 1
                ? `${primary.name} +${dishes.length - 1}`
                : primary.name,
            type: (item.mealType.charAt(0).toUpperCase() +
              item.mealType.slice(1)) as
              | "Breakfast"
              | "Lunch"
              | "Dinner"
              | "Snack",
            image: primary.image,
            completed: false,
            spoonacularId: primary.sourceId
              ? parseInt(primary.sourceId)
              : undefined,
            calories: dishes.reduce((sum, d) => sum + d.calories, 0),
          });
        }
      }
    }

    todayMeals.sort((a, b) => {
      const order = { Breakfast: 0, Lunch: 1, Dinner: 2, Snack: 3 };
      return order[a.type] - order[b.type];
    });

    const progressEntries = await prisma.progress.findMany({
      where: {
        userId: user.id,
        date: { gte: startOfWeek, lte: endOfWeek },
      },
      orderBy: { date: "asc" },
    });

    const weeklyData = Array.from({ length: 7 }, (_, i) => {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);
      const entry = progressEntries.find(
        (p) => p.date.toDateString() === dayDate.toDateString(),
      );
      return {
        day: dayDate.toLocaleDateString("en-US", { weekday: "short" }),
        date: dayDate.toISOString().split("T")[0],
        caloriesConsumed: entry?.caloriesConsumed ?? null,
        weight: entry?.weight ?? null,
      };
    });

    const totalSlots = mealPlan?.mealPlanItems.length ?? 0;
    const completedSlots = progressEntries.filter(
      (p) => p.caloriesConsumed !== null,
    ).length;
    const mealCompletionRate =
      totalSlots > 0 ? Math.round((completedSlots / totalSlots) * 100) : 0;

    const todayProgress = progressEntries.find(
      (p) => p.date.toDateString() === targetDate.toDateString(),
    );

    const totalCaloriesToday = todayMeals.reduce(
      (sum, m) => sum + m.calories,
      0,
    );
    const caloriesConsumedToday = todayProgress?.caloriesConsumed ?? 0;

    return NextResponse.json({
      user: {
        name: user.name,
        weight: user.weight,
        goals: user.goals,
        activityLevel: user.activityLevel,
      },
      todayMeals,
      weeklyData,
      stats: {
        mealCompletionRate,
        totalCaloriesToday,
        caloriesConsumedToday,
        caloriesRemaining: Math.max(
          0,
          totalCaloriesToday - caloriesConsumedToday,
        ),
        streakDays: calculateStreak(progressEntries),
      },
    });
  } catch (error) {
    console.error("Error loading dashboard overview:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 },
    );
  }
}

function calculateStreak(entries: Array<{ date: Date }>): number {
  if (entries.length === 0) return 0;

  const sorted = [...entries].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sorted.length; i++) {
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);

    const entryDate = new Date(sorted[i].date);
    entryDate.setHours(0, 0, 0, 0);

    if (entryDate.toDateString() === expectedDate.toDateString()) {
      streak++;
    } else if (
      i === 0 &&
      entryDate.toDateString() ===
        new Date(today.getTime() - 86400000).toDateString()
    ) {
      continue;
    } else {
      break;
    }
  }

  return streak;
}
