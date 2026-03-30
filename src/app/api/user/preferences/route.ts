import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId,
        email: `${clerkId}@placeholder.local`,
      },
    });
  }

  let preferences = await prisma.userPreference.findUnique({
    where: { userId: user.id },
  });

  if (!preferences) {
    preferences = await prisma.userPreference.create({
      data: { userId: user.id },
    });
  }

  return NextResponse.json(preferences);
}

export async function PATCH(request: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { weekStartDay, dayCount, theme } = body;

  let user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId,
        email: `${clerkId}@placeholder.local`,
      },
    });
  }

  const preferences = await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {
      ...(weekStartDay !== undefined && { weekStartDay }),
      ...(dayCount !== undefined && { dayCount }),
      ...(theme !== undefined && { theme }),
    },
    create: {
      userId: user.id,
      weekStartDay: weekStartDay ?? 1,
      dayCount: dayCount ?? 7,
      theme: theme ?? "system",
    },
  });

  return NextResponse.json(preferences);
}
