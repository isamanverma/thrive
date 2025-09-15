"use client";

import { initializeUserDataSync } from '@/lib/user-sync';
import { useEffect } from 'react';

export default function UserSyncProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize user data sync on app load
    initializeUserDataSync();
  }, []);

  return <>{children}</>;
}