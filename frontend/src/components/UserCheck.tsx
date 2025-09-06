"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserByClerkId } from "@/lib/api";

interface UserCheckProps {
  children: React.ReactNode;
}

export default function UserCheck({ children }: UserCheckProps) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const checkUserInDB = async () => {
      if (!isLoaded || !user) {
        setIsCheckingUser(false);
        return;
      }

      try {
        const existingUser = await getUserByClerkId(user.id);

        if (!existingUser) {
          // User doesn't exist in DB, redirect to onboarding
          router.push("/onboarding");
          return;
        }

        setUserExists(true);
      } catch (error) {
        console.error("Error checking user:", error);
        // If there's an error, assume user needs onboarding
        router.push("/onboarding");
      } finally {
        setIsCheckingUser(false);
      }
    };

    checkUserInDB();
  }, [user, isLoaded, router]);

  // Show loading while checking authentication or user existence
  if (!isLoaded || isCheckingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated and exists in DB, show the protected content
  if (user && userExists) {
    return <>{children}</>;
  }

  // If no user, Clerk will handle the redirect to sign-in
  return null;
}
