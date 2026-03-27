import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// GET: Debug endpoint to see all meal plans for current user
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all meal plans for this user
    const mealPlans = await prisma.mealPlan.findMany({
      where: {
        userId: user.id,
      },
      include: {
        mealPlanItems: {
          include: {
            cachedRecipe: true,
          },
        },
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return NextResponse.json({
      userId: user.id,
      clerkId: userId,
      mealPlansCount: mealPlans.length,
      mealPlans: mealPlans.map((plan) => ({
        id: plan.id,
        startDate: plan.startDate,
        endDate: plan.endDate,
        itemsCount: plan.mealPlanItems.length,
        items: plan.mealPlanItems.map((item) => ({
          id: item.id,
          dayOfWeek: item.dayOfWeek,
          mealType: item.mealType,
          sourceId: item.sourceId,
          recipe: item.cachedRecipe
            ? {
                id: item.cachedRecipe.id,
                title: item.cachedRecipe.title,
                sourceId: item.cachedRecipe.sourceId,
              }
            : null,
        })),
      })),
    });
  } catch (error) {
    console.error("Error in debug endpoint:", error);
    return NextResponse.json(
      { error: "Failed to fetch debug info" },
      { status: 500 },
    );
  }
}
