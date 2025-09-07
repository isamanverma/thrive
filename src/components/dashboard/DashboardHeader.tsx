"use client";

import { UserData, getUserByClerkId } from "@/lib/api";
import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";

interface DashboardHeaderProps {
  userName?: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const { user } = useUser();
  const [dbUser, setDbUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserByClerkId(user.id);
        setDbUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        // Only log significant errors for client-side execution
        if (typeof window !== "undefined") {
          // Don't spam logs for network issues
          if (
            !errorMessage.includes("Network error") &&
            !errorMessage.includes("timeout")
          ) {
            console.error(
              "Significant error fetching user data:",
              errorMessage
            );
          }
        }
      } finally {
        setLoading(false);
      }
    };

    // Only run if we're in the browser
    if (typeof window !== "undefined") {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  // Function to extract first name from full name
  const getFirstName = (fullName: string | null | undefined): string => {
    if (!fullName) return "User";
    const nameParts = fullName.trim().split(/\s+/);
    return nameParts[0] || "User";
  };

  // Determine the display name
  const getDisplayName = (): string => {
    // If userName prop is provided, use it (for backwards compatibility)
    if (userName) return getFirstName(userName);

    // If we have user data from database, use it
    if (dbUser?.name) return getFirstName(dbUser.name);

    // Fallback to Clerk user's first name if available
    if (user?.firstName) return user.firstName;

    // Final fallback
    return "User";
  };

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Good morning, {loading ? "..." : getDisplayName()}!
        </h1>
      </div>
    </header>
  );
}
