import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@/generated/prisma";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// POST: Update a single meal in the current meal plan
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { dayIndex, mealType, meal, action = "set" } = body;

    // Validate input
    if (typeof dayIndex !== "number" || dayIndex < 0 || dayIndex > 6) {
      return NextResponse.json({ error: "Invalid dayIndex. Must be 0-6" }, { status: 400 });
    }

    if (!mealType || typeof mealType !== "string") {
      return NextResponse.json({ error: "Invalid mealType" }, { status: 400 });
    }

    if (action !== "set" && action !== "remove") {
      return NextResponse.json({ error: "Invalid action. Must be 'set' or 'remove'" }, { status: 400 });
    }

    if (action === "set" && (!meal || !meal.id || !meal.name)) {
      return NextResponse.json({ error: "Invalid meal data for set action" }, { status: 400 });
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
    const mondayOffset = currentDate.getDay() === 0 ? -6 : 1 - currentDate.getDay();
    startOfWeek.setDate(currentDate.getDate() + mondayOffset);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Find or create meal plan for the current week
    let mealPlan = await prisma.mealPlan.findFirst({
      where: {
        userId: user.id,
        startDate: {
          lte: endOfWeek,
        },
        endDate: {
          gte: startOfWeek,
        },
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

    // Convert frontend dayIndex (0-6) to database dayOfWeek (1-7)
    const dayOfWeek = dayIndex + 1;

    if (action === "remove") {
      // Remove the meal
      await prisma.mealPlanItem.deleteMany({
        where: {
          mealPlanId: mealPlan.id,
          dayOfWeek: dayOfWeek,
          mealType: mealType.toLowerCase(),
        },
      });

      return NextResponse.json({
        success: true,
        action: "removed",
        mealPlanId: mealPlan.id,
      });
    } else {
      // Set/update the meal
      // First, try to find or create the recipe
      let recipe = await prisma.recipe.findFirst({
        where: {
          OR: [
            { sourceId: meal.id.toString() },
            { id: meal.id.toString() },
          ],
        },
      });

      if (!recipe) {
        recipe = await prisma.recipe.create({
          data: {
            title: meal.name,
            description: meal.description || null,
            imageUrl: meal.image || null,
            sourceType: "EXTERNAL_API",
            sourceId: meal.id.toString(),
            nutrition: meal.calories ? { calories: meal.calories } : undefined,
            isPublic: true,
          },
        });
      }

      // Remove existing meal for this slot
      await prisma.mealPlanItem.deleteMany({
        where: {
          mealPlanId: mealPlan.id,
          dayOfWeek: dayOfWeek,
          mealType: mealType.toLowerCase(),
        },
      });

      // Create new meal plan item
      const mealPlanItem = await prisma.mealPlanItem.create({
        data: {
          mealPlanId: mealPlan.id,
          dayOfWeek: dayOfWeek,
          mealType: mealType.toLowerCase(),
          cachedRecipeId: recipe.id,
          sourceId: meal.id.toString(),
        },
      });

      return NextResponse.json({
        success: true,
        action: "set",
        mealPlanId: mealPlan.id,
        mealPlanItemId: mealPlanItem.id,
      });
    }
    
  } catch (error) {
    console.error("Error updating meal:", error);
    return NextResponse.json(
      { error: "Failed to update meal" },
      { status: 500 }
    );
  }
}