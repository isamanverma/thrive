// Database status and fallback service
import { UserData } from './api';

interface DatabaseStatus {
  isAvailable: boolean;
  lastChecked: number;
  retryAfter: number;
}

// In-memory cache for database status (reset on server restart)
let dbStatus: DatabaseStatus = {
  isAvailable: true,
  lastChecked: 0,
  retryAfter: 5000, // 5 seconds
};

// Circuit breaker pattern for database operations
export class DatabaseCircuitBreaker {
  private static instance: DatabaseCircuitBreaker;
  private failureCount = 0;
  private lastFailureTime = 0;
  private readonly maxFailures = 5;
  private readonly resetTimeout = 60000; // 1 minute

  private constructor() {}

  public static getInstance(): DatabaseCircuitBreaker {
    if (!DatabaseCircuitBreaker.instance) {
      DatabaseCircuitBreaker.instance = new DatabaseCircuitBreaker();
    }
    return DatabaseCircuitBreaker.instance;
  }

  public canExecute(): boolean {
    const now = Date.now();
    
    // Reset if enough time has passed
    if (now - this.lastFailureTime > this.resetTimeout) {
      this.failureCount = 0;
    }

    return this.failureCount < this.maxFailures;
  }

  public onSuccess(): void {
    this.failureCount = 0;
  }

  public onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();
  }

  public getState(): 'CLOSED' | 'OPEN' | 'HALF_OPEN' {
    const now = Date.now();
    
    if (this.failureCount < this.maxFailures) {
      return 'CLOSED'; // Normal operation
    }
    
    if (now - this.lastFailureTime > this.resetTimeout) {
      return 'HALF_OPEN'; // Try one request
    }
    
    return 'OPEN'; // Block requests
  }
}

// Fallback user data when database is unavailable
export function getFallbackUserData(clerkUser: unknown): UserData | null {
  if (!clerkUser || typeof clerkUser !== 'object') return null;
  
  const user = clerkUser as {
    id?: string;
    emailAddresses?: Array<{ emailAddress?: string }>;
    fullName?: string;
    firstName?: string;
  };
  
  if (!user.id) return null;
  
  return {
    clerkId: user.id,
    email: user.emailAddresses?.[0]?.emailAddress || '',
    name: user.fullName || user.firstName || 'User',
    age: undefined,
    weight: undefined,
    goals: undefined,
    activityLevel: undefined,
    height: undefined,
    diet_preference: undefined,
  };
}

// Check if we're in a development environment
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

// Check if database URL is configured
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

// Update database status
export function updateDatabaseStatus(isAvailable: boolean): void {
  dbStatus = {
    isAvailable,
    lastChecked: Date.now(),
    retryAfter: isAvailable ? 5000 : Math.min(dbStatus.retryAfter * 1.5, 60000), // Exponential backoff
  };
}

// Get current database status
export function getDatabaseStatus(): DatabaseStatus {
  return { ...dbStatus };
}

// Should we retry database connection?
export function shouldRetryDatabase(): boolean {
  const now = Date.now();
  return !dbStatus.isAvailable && (now - dbStatus.lastChecked) > dbStatus.retryAfter;
}
