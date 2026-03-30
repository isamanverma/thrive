import { useState, useEffect, useCallback } from "react";

interface UserPreferences {
  weekStartDay: number;
  dayCount: number;
  theme: string;
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    weekStartDay: 1,
    dayCount: 7,
    theme: "system",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPreferences() {
      try {
        const res = await fetch("/api/user/preferences");
        if (res.ok) {
          const data = await res.json();
          setPreferences({
            weekStartDay: data.weekStartDay ?? 1,
            dayCount: data.dayCount ?? 7,
            theme: data.theme ?? "system",
          });
        }
      } catch (error) {
        console.error("Failed to load preferences:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPreferences();
  }, []);

  const updatePreferences = useCallback(
    async (updates: Partial<UserPreferences>) => {
      try {
        const res = await fetch("/api/user/preferences", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        if (res.ok) {
          const data = await res.json();
          setPreferences({
            weekStartDay: data.weekStartDay ?? 1,
            dayCount: data.dayCount ?? 7,
            theme: data.theme ?? "system",
          });
        }
      } catch (error) {
        console.error("Failed to update preferences:", error);
      }
    },
    []
  );

  return { preferences, isLoading, updatePreferences };
}
