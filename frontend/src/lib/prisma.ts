// This file contains only server-side functions that use Prisma directly
// Import this only in API routes, never in client-side components

import { PrismaClient } from '@prisma/client';
import { UserData } from './api';

// Create a global instance to avoid multiple connections in development
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error'] : [],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Function to create or update user (for server-side use only)
export async function createOrUpdateUserServer(userData: UserData) {
  try {
    console.log('Checking for existing user with clerkId:', userData.clerkId);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userData.clerkId }
    });

    if (existingUser) {
      console.log('Updating existing user:', existingUser.id);
      // Update existing user
      const updatedUser = await prisma.user.update({
        where: { clerkId: userData.clerkId },
        data: {
          email: userData.email,
          name: userData.name,
          age: userData.age,
          weight: userData.weight,
          goals: userData.goals,
          activityLevel: userData.activityLevel,
          height: userData.height,
          diet_preference: userData.diet_preference,
        }
      });
      console.log('User updated successfully:', updatedUser.id);
      return updatedUser;
    } else {
      console.log('Creating new user...');
      // Create new user
      const newUser = await prisma.user.create({
        data: {
          clerkId: userData.clerkId,
          email: userData.email,
          name: userData.name,
          age: userData.age,
          weight: userData.weight,
          goals: userData.goals,
          activityLevel: userData.activityLevel,
          height: userData.height,
          diet_preference: userData.diet_preference,
        }
      });
      console.log('New user created successfully:', newUser.id);
      return newUser;
    }
  } catch (error) {
    console.error('Error in createOrUpdateUserServer:', error);
    console.error('Prisma error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
      code: (error as { code?: string })?.code,
      meta: (error as { meta?: unknown })?.meta
    });
    throw error;
  }
}

// Function to get user by Clerk ID (for server-side use only)
export async function getUserByClerkIdServer(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId }
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}
