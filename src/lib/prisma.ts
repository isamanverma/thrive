// This file contains only server-side functions that use Prisma directly
// Import this only in API routes, never in client-side components

import { DatabaseCircuitBreaker, isDatabaseConfigured, updateDatabaseStatus } from './database-status';

import { PrismaClient } from '@prisma/client';
import { UserData } from './api';

// Create a global instance to avoid multiple connections in development
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error'] : [],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

const circuitBreaker = DatabaseCircuitBreaker.getInstance();

// Database connection health check with retry logic
export async function checkDatabaseConnection(retries = 3): Promise<boolean> {
  // Check if database is configured
  if (!isDatabaseConfigured()) {
    console.error('DATABASE_URL is not configured');
    return false;
  }

  // Check circuit breaker state
  if (!circuitBreaker.canExecute()) {
    console.warn('Database circuit breaker is open, skipping connection check');
    return false;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      circuitBreaker.onSuccess();
      updateDatabaseStatus(true);
      return true;
    } catch (error) {
      console.error(`Database connection attempt ${attempt} failed:`, error);
      
      if (attempt === retries) {
        circuitBreaker.onFailure();
        updateDatabaseStatus(false);
        return false;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  return false;
}

// Helper function to handle database operations with retry logic
export async function withDatabaseRetry<T>(
  operation: () => Promise<T>,
  retries = 3
): Promise<T> {
  // Check circuit breaker state
  if (!circuitBreaker.canExecute()) {
    throw new Error('Database service is temporarily unavailable (circuit breaker open)');
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await operation();
      circuitBreaker.onSuccess();
      updateDatabaseStatus(true);
      return result;
    } catch (error: unknown) {
      // Check if it's a connection error
      const isConnectionError = 
        (error as { code?: string })?.code === 'P1001' || // Can't reach database server
        (error as { code?: string })?.code === 'P1017' || // Server has closed the connection
        (error as { message?: string })?.message?.includes('connection') ||
        (error as { message?: string })?.message?.includes('timeout') ||
        (error as { message?: string })?.message?.includes('ECONNREFUSED') ||
        (error as { message?: string })?.message?.includes('ETIMEDOUT');
      
      if (!isConnectionError || attempt === retries) {
        if (isConnectionError) {
          circuitBreaker.onFailure();
          updateDatabaseStatus(false);
        }
        throw error;
      }
      
      console.error(`Database operation attempt ${attempt} failed, retrying...`, 
        error instanceof Error ? error.message : 'Unknown error');
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  throw new Error('All retry attempts failed');
}

// Function to create or update user (for server-side use only)
export async function createOrUpdateUserServer(userData: UserData) {
  return withDatabaseRetry(async () => {
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
  });
}

// Function to get user by Clerk ID (for server-side use only)
export async function getUserByClerkIdServer(clerkId: string) {
  return withDatabaseRetry(async () => {
    try {
      const user = await prisma.user.findUnique({
        where: { clerkId }
      });
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  });
}
