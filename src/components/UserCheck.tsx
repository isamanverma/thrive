"use client";

import { useEffect, useState } from "react";

import { getUserByClerkId } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface UserCheckProps {
  children: React.ReactNode;
}

export default function UserCheck({ children }: UserCheckProps) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkUserInDB = async () => {
      if (!isLoaded || !user) {
        setIsCheckingUser(false);
        return;
      }

      try {
        setError(null);
        const existingUser = await getUserByClerkId(user.id);

        if (!existingUser) {
          // User doesn't exist in DB, redirect to onboarding
          router.push("/onboarding");
          return;
        }

        setUserExists(true);
        setRetryCount(0); // Reset retry count on success
      } catch (error) {
        console.error("Error checking user:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        // Handle different error types
        if (
          errorMessage.includes("Network error") ||
          errorMessage.includes("timeout")
        ) {
          setError("Connection issue. Please check your internet connection.");

          // Auto-retry for network errors (max 3 attempts)
          if (retryCount < 3) {
            setTimeout(
              () => {
                setRetryCount((prev) => prev + 1);
              },
              2000 * (retryCount + 1)
            ); // Increasing delay
            return;
          }
        } else if (errorMessage.includes("Database temporarily unavailable")) {
          setError(
            "Service temporarily unavailable. Please try again in a moment."
          );
        } else {
          // For other errors, assume user needs onboarding
          if (typeof window !== "undefined") {
            router.push("/onboarding");
            return;
          }
        }
      } finally {
        setIsCheckingUser(false);
      }
    };

    checkUserInDB();
  }, [user, isLoaded, router, retryCount]);

  // Show error state with retry option
  if (error && !isCheckingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Connection Error
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setIsCheckingUser(true);
              setRetryCount(0);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
