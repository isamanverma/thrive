import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let preferences = await prisma.userPreference.findUnique({
    where: { userId },
  });

  if (!preferences) {
    preferences = await prisma.userPreference.create({
      data: { userId },
    });
  }

  return NextResponse.json(preferences);
}

export async function PATCH(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { weekStartDay, theme } = body;

  const preferences = await prisma.userPreference.upsert({
    where: { userId },
    update: {
      ...(weekStartDay !== undefined && { weekStartDay }),
      ...(theme !== undefined && { theme }),
    },
    create: {
      userId,
      weekStartDay: weekStartDay ?? 1,
      theme: theme ?? "system",
    },
  });

  return NextResponse.json(preferences);
}
