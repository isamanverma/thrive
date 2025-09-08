import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

interface UserRecipeRequest {
  spoonacularId: number;
  status: 'liked' | 'saved' | 'cooked';
}

export async function POST(request: NextRequest) {
  try {
    // Test database connection first
    try {
      await prisma.$connect();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed', details: dbError instanceof Error ? dbError.message : 'Unknown database error' },
        { status: 503 }
      );
    }

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: UserRecipeRequest = await request.json();
    const { spoonacularId, status } = body;

    console.log('Received request:', { userId, spoonacularId, status });

    if (!spoonacularId || !status) {
      return NextResponse.json(
        { error: 'Recipe ID and status are required' },
        { status: 400 }
      );
    }

    if (!['liked', 'saved', 'cooked'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be one of: liked, saved, cooked' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    console.log('Found user:', user);

    if (!user) {
      console.error('User not found in database:', { clerkId: userId });
      return NextResponse.json(
        { 
          error: 'User not found in database. Please complete the onboarding process first.',
          details: 'The user exists in Clerk but not in our database. Complete onboarding to create your profile.'
        }, 
        { status: 404 }
      );
    }

    // Check if user recipe already exists
    const existingUserRecipe = await prisma.userRecipe.findUnique({
      where: {
        userId_spoonacularId_status: {
          userId: user.id,
          spoonacularId: spoonacularId,
          status: status,
        },
      },
    });

    console.log('Existing user recipe:', existingUserRecipe);

    if (existingUserRecipe) {
      return NextResponse.json(
        { error: 'Recipe already marked with this status' },
        { status: 409 }
      );
    }

    // Create user recipe entry
    console.log('Creating user recipe with data:', {
      userId: user.id,
      spoonacularId: spoonacularId,
      status: status,
    });

    const userRecipe = await prisma.userRecipe.create({
      data: {
        userId: user.id,
        spoonacularId: spoonacularId,
        status: status,
      },
    });

    console.log('Created user recipe:', userRecipe);

    return NextResponse.json({
      id: userRecipe.id,
      spoonacularId: userRecipe.spoonacularId,
      status: userRecipe.status,
      dateAdded: userRecipe.dateAdded,
    });

  } catch (error) {
    console.error('Add user recipe error:', error);
    
    // Log more detailed error information
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Build where clause
    interface WhereClause {
      userId: string;
      status?: string;
    }
    const whereClause: WhereClause = { userId: user.id };
    if (status && ['liked', 'saved', 'cooked'].includes(status)) {
      whereClause.status = status;
    }

    // Get user recipes
    const userRecipes = await prisma.userRecipe.findMany({
      where: whereClause,
      include: {
        cachedRecipe: {
          select: {
            spoonacularId: true,
            title: true,
            summary: true,
            imageUrl: true,
            readyInMinutes: true,
            servings: true,
            cuisines: true,
            dishTypes: true,
            diets: true,
          },
        },
      },
      orderBy: { dateAdded: 'desc' },
      take: limit,
      skip: offset,
    });

    // Get total count for pagination
    const totalCount = await prisma.userRecipe.count({
      where: whereClause,
    });

    return NextResponse.json({
      recipes: userRecipes,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount,
      },
    });

  } catch (error) {
    console.error('Get user recipes error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const spoonacularId = searchParams.get('spoonacularId');
    const status = searchParams.get('status');

    if (!spoonacularId || !status) {
      return NextResponse.json(
        { error: 'Recipe ID and status are required' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Delete user recipe entry
    const deletedRecipe = await prisma.userRecipe.deleteMany({
      where: {
        userId: user.id,
        spoonacularId: parseInt(spoonacularId),
        status: status,
      },
    });

    if (deletedRecipe.count === 0) {
      return NextResponse.json(
        { error: 'Recipe not found or not marked with this status' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete user recipe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
