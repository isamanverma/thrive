// Utility for handling user data synchronization and retry logic

import { UserData } from './api';

export interface PendingUserData {
  userData: UserData;
  timestamp: number;
  retryCount: number;
}

const PENDING_DATA_KEY = 'pendingUserData';
const PENDING_TIMESTAMP_KEY = 'pendingUserDataTimestamp';
const PENDING_RETRY_COUNT_KEY = 'pendingUserDataRetryCount';
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_INTERVAL = 5 * 60 * 1000; // 5 minutes
// Make pending-data expiry configurable via NEXT_PUBLIC_PENDING_DATA_EXPIRY_MS (ms). Default to 30 days.
const DATA_EXPIRY = Number(process.env.NEXT_PUBLIC_PENDING_DATA_EXPIRY_MS) || 30 * 24 * 60 * 60 * 1000; // 30 days

export function storePendingUserData(userData: UserData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(PENDING_DATA_KEY, JSON.stringify(userData));
    localStorage.setItem(PENDING_TIMESTAMP_KEY, Date.now().toString());
    localStorage.setItem(PENDING_RETRY_COUNT_KEY, '0');
    console.log('Stored pending user data for later sync');
  } catch (error) {
    console.error('Failed to store pending user data:', error);
  }
}

export function getPendingUserData(): PendingUserData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const userData = localStorage.getItem(PENDING_DATA_KEY);
    const timestamp = localStorage.getItem(PENDING_TIMESTAMP_KEY);
    const retryCount = localStorage.getItem(PENDING_RETRY_COUNT_KEY);
    
    if (!userData || !timestamp) return null;
    
    const parsedTimestamp = parseInt(timestamp);
    const parsedRetryCount = parseInt(retryCount || '0');
    
    // Check if data has expired
    if (Date.now() - parsedTimestamp > DATA_EXPIRY) {
      clearPendingUserData();
      return null;
    }
    
    return {
      userData: JSON.parse(userData),
      timestamp: parsedTimestamp,
      retryCount: parsedRetryCount,
    };
  } catch (error) {
    console.error('Failed to retrieve pending user data:', error);
    clearPendingUserData();
    return null;
  }
}

export function clearPendingUserData(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(PENDING_DATA_KEY);
    localStorage.removeItem(PENDING_TIMESTAMP_KEY);
    localStorage.removeItem(PENDING_RETRY_COUNT_KEY);
    console.log('Cleared pending user data');
  } catch (error) {
    console.error('Failed to clear pending user data:', error);
  }
}

export function shouldRetrySync(): boolean {
  const pendingData = getPendingUserData();
  if (!pendingData) return false;
  
  const { timestamp, retryCount } = pendingData;
  const timeSinceLastAttempt = Date.now() - timestamp;
  
  // Allow immediate retry on first saved attempt (retryCount === 0) when user reopens the app,
  // otherwise enforce RETRY_INTERVAL between retries.
  return (
    retryCount < MAX_RETRY_ATTEMPTS &&
    (retryCount === 0 || timeSinceLastAttempt >= RETRY_INTERVAL)
  );
}

export async function attemptUserDataSync(): Promise<boolean> {
  const pendingData = getPendingUserData();
  if (!pendingData || !shouldRetrySync()) return false;
  
  try {
    console.log('Attempting to sync pending user data...');
    
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pendingData.userData),
    });
    
    if (response.ok) {
      const result = await response.json();
      
      // Check if it's still a fallback response
      if (result.fallback) {
        // Update retry count and timestamp
        localStorage.setItem(PENDING_RETRY_COUNT_KEY, (pendingData.retryCount + 1).toString());
        localStorage.setItem(PENDING_TIMESTAMP_KEY, Date.now().toString());
        console.log('Sync attempt resulted in fallback, will retry later');
        return false;
      } else {
        // Successfully synced
        clearPendingUserData();
        console.log('Successfully synced pending user data');
        return true;
      }
    } else {
      // Update retry count
      localStorage.setItem(PENDING_RETRY_COUNT_KEY, (pendingData.retryCount + 1).toString());
      localStorage.setItem(PENDING_TIMESTAMP_KEY, Date.now().toString());
      console.log('Sync attempt failed, will retry later');
      return false;
    }
  } catch (error) {
    console.error('Error during user data sync:', error);
    
    // Update retry count on error
    if (pendingData.retryCount < MAX_RETRY_ATTEMPTS) {
      localStorage.setItem(PENDING_RETRY_COUNT_KEY, (pendingData.retryCount + 1).toString());
      localStorage.setItem(PENDING_TIMESTAMP_KEY, Date.now().toString());
    } else {
      // Max retries reached, clear the data
      clearPendingUserData();
      console.log('Max retry attempts reached, clearing pending data');
    }
    
    return false;
  }
}

export function initializeUserDataSync(): void {
  if (typeof window === 'undefined') return;
  
  // Check for pending data on app initialization
  const pendingData = getPendingUserData();
  // Attempt sync on app start if there's pending data.
  // If this is the first attempt (retryCount === 0) allow immediate retry; otherwise rely on shouldRetrySync.
  if (pendingData && (pendingData.retryCount === 0 || shouldRetrySync())) {
    setTimeout(() => {
      attemptUserDataSync();
    }, 2000);
  }
}