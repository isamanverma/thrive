import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@/generated/prisma";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// POST: Swap two meals in the current meal plan
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { 
      sourceDayIndex, 
      sourceMealType, 
      targetDayIndex, 
      targetMealType 
    } = body;

    // Validate input
    if (typeof sourceDayIndex !== "number" || sourceDayIndex < 0 || sourceDayIndex > 6) {
      return NextResponse.json({ error: "Invalid sourceDayIndex. Must be 0-6" }, { status: 400 });
    }

    if (typeof targetDayIndex !== "number" || targetDayIndex < 0 || targetDayIndex > 6) {
      return NextResponse.json({ error: "Invalid targetDayIndex. Must be 0-6" }, { status: 400 });
    }

    if (!sourceMealType || typeof sourceMealType !== "string") {
      return NextResponse.json({ error: "Invalid sourceMealType" }, { status: 400 });
    }

    if (!targetMealType || typeof targetMealType !== "string") {
      return NextResponse.json({ error: "Invalid targetMealType" }, { status: 400 });
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

    // Find meal plan for the current week
    const mealPlan = await prisma.mealPlan.findFirst({
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
      return NextResponse.json({ error: "No meal plan found for current week" }, { status: 404 });
    }

    // Convert frontend dayIndex (0-6) to database dayOfWeek (1-7)
    const sourceDayOfWeek = sourceDayIndex + 1;
    const targetDayOfWeek = targetDayIndex + 1;

    // Get the source and target meal plan items
    const sourceMealItem = await prisma.mealPlanItem.findFirst({
      where: {
        mealPlanId: mealPlan.id,
        dayOfWeek: sourceDayOfWeek,
        mealType: sourceMealType.toLowerCase(),
      },
    });

    const targetMealItem = await prisma.mealPlanItem.findFirst({
      where: {
        mealPlanId: mealPlan.id,
        dayOfWeek: targetDayOfWeek,
        mealType: targetMealType.toLowerCase(),
      },
    });

    // Perform the swap transaction
    await prisma.$transaction(async (tx) => {
      // If both items exist, swap their positions
      if (sourceMealItem && targetMealItem) {
        // Temporarily update source to avoid unique constraint conflict
        await tx.mealPlanItem.update({
          where: { id: sourceMealItem.id },
          data: {
            dayOfWeek: -1, // Temporary invalid value
            mealType: "temp",
          },
        });

        // Update target to source position
        await tx.mealPlanItem.update({
          where: { id: targetMealItem.id },
          data: {
            dayOfWeek: sourceDayOfWeek,
            mealType: sourceMealType.toLowerCase(),
          },
        });

        // Update source to target position
        await tx.mealPlanItem.update({
          where: { id: sourceMealItem.id },
          data: {
            dayOfWeek: targetDayOfWeek,
            mealType: targetMealType.toLowerCase(),
          },
        });
      }
      // If only source exists, move it to target position
      else if (sourceMealItem && !targetMealItem) {
        await tx.mealPlanItem.update({
          where: { id: sourceMealItem.id },
          data: {
            dayOfWeek: targetDayOfWeek,
            mealType: targetMealType.toLowerCase(),
          },
        });
      }
      // If only target exists, move it to source position
      else if (!sourceMealItem && targetMealItem) {
        await tx.mealPlanItem.update({
          where: { id: targetMealItem.id },
          data: {
            dayOfWeek: sourceDayOfWeek,
            mealType: sourceMealType.toLowerCase(),
          },
        });
      }
      // If neither exists, nothing to swap
    });

    return NextResponse.json({
      success: true,
      action: "swapped",
      mealPlanId: mealPlan.id,
      source: { dayIndex: sourceDayIndex, mealType: sourceMealType },
      target: { dayIndex: targetDayIndex, mealType: targetMealType },
    });
    
  } catch (error) {
    console.error("Error swapping meals:", error);
    return NextResponse.json(
      { error: "Failed to swap meals" },
      { status: 500 }
    );
  }
}