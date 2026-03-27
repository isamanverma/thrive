"use client";

import {
  attemptUserDataSync,
  clearPendingUserData,
  getPendingUserData,
} from "@/lib/user-sync";
import { useEffect, useState } from "react";

import { getUserByClerkId } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

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

        // Check for pending user data from onboarding
        const pendingData = getPendingUserData();

        if (pendingData) {
          console.log("Found pending user data, allowing dashboard access");
          setUserExists(true);
          setIsCheckingUser(false);

          // Attempt to sync in the background
          attemptUserDataSync().then((success) => {
            if (success) {
              console.log("Background sync successful");
            }
          });

          return;
        }

        // First attempt to get canonical user record
        const existingUser = await getUserByClerkId(user.id);

        if (!existingUser) {
          // If DB was temporarily unavailable the server may return a fallback.
          // Query the raw endpoint to inspect fallback flag before forcing onboarding.
          try {
            const rawRes = await fetch(
              `/api/users?clerkId=${encodeURIComponent(user.id)}`,
              {
                headers: { "Cache-Control": "no-cache" },
              },
            );
            if (rawRes.ok) {
              const payload = await rawRes.json().catch(() => ({}));
              if (payload && payload.fallback) {
                // Treat as existing temporarily and attempt background sync.
                console.log(
                  "Database fallback detected — treating user as existing and attempting background sync",
                );
                setUserExists(true);
                setIsCheckingUser(false);
                attemptUserDataSync().then((success) => {
                  if (success) {
                    console.log("Background sync successful after fallback");
                  }
                });
                return;
              }
            }
          } catch (e) {
            console.warn("Failed to fetch fallback payload:", e);
          }

          // Check if we're already on onboarding page to prevent loops
          if (
            typeof window !== "undefined" &&
            window.location.pathname === "/onboarding"
          ) {
            setIsCheckingUser(false);
            return;
          }

          // User doesn't exist in DB, redirect to onboarding
          console.log("User not found in database, redirecting to onboarding");
          router.push("/onboarding");
          return;
        }

        // Clear any pending data if user exists in DB
        clearPendingUserData();

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
              2000 * (retryCount + 1),
            ); // Increasing delay
            return;
          }
        } else if (errorMessage.includes("Database temporarily unavailable")) {
          // Check for pending user data during DB issues
          const pendingData = getPendingUserData();
          if (pendingData) {
            console.log(
              "Database unavailable but found pending user data, allowing access",
            );
            setUserExists(true);
            setIsCheckingUser(false);
            return;
          }

          setError(
            "Service temporarily unavailable. Please try again in a moment.",
          );
        } else {
          // For other errors, check if we're already on onboarding to prevent loops
          if (
            typeof window !== "undefined" &&
            window.location.pathname !== "/onboarding"
          ) {
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
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Connection Error
          </h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setIsCheckingUser(true);
              setRetryCount(0);
            }}
            className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf5]">
        <div className="relative w-48 h-48 mb-6">
          <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-20" />
          <Image
            src="/thrive mascots/bgRemoved/meditating Background Removed.png"
            alt="Loading"
            fill
            className="relative z-10 object-contain animate-bounce"
            style={{ animationDuration: "1.5s" }}
            priority
          />
        </div>
        <p className="text-zinc-600 font-medium animate-pulse">
          Getting things ready...
        </p>
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
