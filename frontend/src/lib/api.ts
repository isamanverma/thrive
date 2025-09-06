// This file contains both client-side and server-side functions
// Client-side functions use fetch, server-side functions use Prisma directly

// User data interface based on your schema
export interface UserData {
  clerkId: string;
  email: string;
  name?: string;
  age?: number;
  weight?: number;
  goals?: string;
  activityLevel?: string;
  height?: number;
  diet_preference?: string;
}

// === CLIENT-SIDE FUNCTIONS (use fetch to call API routes) ===

// Function to create or update user (for client-side use)
export async function createOrUpdateUser(userData: UserData) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to save user data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
}

// Function to get user by Clerk ID (for client-side use)
export async function getUserByClerkId(clerkId: string) {
  try {
    const response = await fetch(`/api/users?clerkId=${clerkId}`);
    
    if (response.status === 404) {
      return null; // User doesn't exist
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    
    const data = await response.json();
    return data.exists ? data.user : null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}