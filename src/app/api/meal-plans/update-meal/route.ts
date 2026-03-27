import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface DishInput {
  recipeId: string;
  name: string;
  calories?: number;
  image?: string;
  description?: string;
  quantity: number;
  unit: string;
  nutrition?: unknown;
}

// POST: Update a single meal slot with multiple dishes
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { dayIndex, mealType, dishes, action = "set" } = body;

    // Validate input
    if (typeof dayIndex !== "number" || dayIndex < 0 || dayIndex > 6) {
      return NextResponse.json(
        { error: "Invalid dayIndex. Must be 0-6" },
        { status: 400 },
      );
    }

    if (!mealType || typeof mealType !== "string") {
      return NextResponse.json({ error: "Invalid mealType" }, { status: 400 });
    }

    if (action !== "set" && action !== "remove") {
      return NextResponse.json(
        { error: "Invalid action. Must be 'set' or 'remove'" },
        { status: 400 },
      );
    }

    if (
      action === "set" &&
      (!dishes || !Array.isArray(dishes) || dishes.length === 0)
    ) {
      return NextResponse.json(
        { error: "dishes array is required for set action" },
        { status: 400 },
      );
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate current week (Monday to Sunday)
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    const mondayOffset =
      currentDate.getDay() === 0 ? -6 : 1 - currentDate.getDay();
    startOfWeek.setDate(currentDate.getDate() + mondayOffset);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Find or create meal plan for the current week
    let mealPlan = await prisma.mealPlan.findFirst({
      where: {
        userId: user.id,
        startDate: { lte: endOfWeek },
        endDate: { gte: startOfWeek },
      },
    });

    if (!mealPlan) {
      mealPlan = await prisma.mealPlan.create({
        data: {
          userId: user.id,
          startDate: startOfWeek,
          endDate: endOfWeek,
        },
      });
    }

    const dayOfWeek = dayIndex + 1;

    if (action === "remove") {
      // Find existing item and delete its dishes, then delete the item
      const existingItem = await prisma.mealPlanItem.findUnique({
        where: {
          mealPlanId_dayOfWeek_mealType: {
            mealPlanId: mealPlan.id,
            dayOfWeek,
            mealType: mealType.toLowerCase(),
          },
        },
      });

      if (existingItem) {
        await prisma.mealDish.deleteMany({
          where: { mealPlanItemId: existingItem.id },
        });
        await prisma.mealPlanItem.delete({
          where: { id: existingItem.id },
        });
      }

      return NextResponse.json({
        success: true,
        action: "removed",
        mealPlanId: mealPlan.id,
      });
    }

    // Set/update the meal with dishes
    // First, remove existing item + dishes for this slot
    const existingItem = await prisma.mealPlanItem.findUnique({
      where: {
        mealPlanId_dayOfWeek_mealType: {
          mealPlanId: mealPlan.id,
          dayOfWeek,
          mealType: mealType.toLowerCase(),
        },
      },
    });

    if (existingItem) {
      await prisma.mealDish.deleteMany({
        where: { mealPlanItemId: existingItem.id },
      });
      await prisma.mealPlanItem.delete({
        where: { id: existingItem.id },
      });
    }

    // Use first dish's recipe as the primary cachedRecipe for the slot
    const firstDish = dishes[0] as DishInput;
    let primaryRecipe = await prisma.recipe.findFirst({
      where: {
        OR: [{ sourceId: firstDish.recipeId }, { id: firstDish.recipeId }],
      },
    });

    if (!primaryRecipe) {
      primaryRecipe = await prisma.recipe.create({
        data: {
          title: firstDish.name,
          description: firstDish.description || null,
          imageUrl: firstDish.image || null,
          sourceType: "EXTERNAL_API",
          sourceId: firstDish.recipeId,
          nutrition: firstDish.calories
            ? { calories: firstDish.calories }
            : undefined,
          isPublic: true,
        },
      });
    }

    // Create the MealPlanItem
    const mealPlanItem = await prisma.mealPlanItem.create({
      data: {
        mealPlanId: mealPlan.id,
        dayOfWeek,
        mealType: mealType.toLowerCase(),
        cachedRecipeId: primaryRecipe.id,
        sourceId: firstDish.recipeId,
      },
    });

    // Create all dishes
    for (let i = 0; i < dishes.length; i++) {
      const dish = dishes[i] as DishInput;

      let dishRecipe = await prisma.recipe.findFirst({
        where: {
          OR: [{ sourceId: dish.recipeId }, { id: dish.recipeId }],
        },
      });

      if (!dishRecipe) {
        dishRecipe = await prisma.recipe.create({
          data: {
            title: dish.name,
            description: dish.description || null,
            imageUrl: dish.image || null,
            sourceType: "EXTERNAL_API",
            sourceId: dish.recipeId,
            nutrition: dish.calories ? { calories: dish.calories } : undefined,
            isPublic: true,
          },
        });
      }

      await prisma.mealDish.create({
        data: {
          mealPlanItemId: mealPlanItem.id,
          recipeId: dishRecipe.id,
          quantity: dish.quantity || 1,
          unit: dish.unit || "serving",
          order: i,
        },
      });
    }

    return NextResponse.json({
      success: true,
      action: "set",
      mealPlanId: mealPlan.id,
      mealPlanItemId: mealPlanItem.id,
    });
  } catch (error) {
    console.error("Error updating meal:", error);
    return NextResponse.json(
      { error: "Failed to update meal" },
      { status: 500 },
    );
  }
}
