import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateUserServer, getUserByClerkIdServer } from '@/lib/prisma';

import { UserData } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    const userData: UserData = await request.json();
    
    console.log('Received user data:', userData);
    
    // Validate required fields
    if (!userData.clerkId || !userData.email) {
      console.error('Missing required fields:', { clerkId: userData.clerkId, email: userData.email });
      return NextResponse.json(
        { error: 'Missing required fields: clerkId and email' },
        { status: 400 }
      );
    }

    console.log('Attempting to save user data...');
    const savedUser = await createOrUpdateUserServer(userData);
    console.log('User data saved successfully:', savedUser.id);
    
    return NextResponse.json(savedUser, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    return NextResponse.json(
      { error: 'Failed to save user data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clerkId = searchParams.get('clerkId');

    if (!clerkId) {
      return NextResponse.json(
        { error: 'Missing clerkId parameter' },
        { status: 400 }
      );
    }

    const user = await getUserByClerkIdServer(clerkId);
    
    if (!user) {
      return NextResponse.json(
        { exists: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ exists: true, user }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
