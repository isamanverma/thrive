import { useState, useEffect, useCallback } from "react";

interface UserPreferences {
  weekStartDay: number;
  dayCount: number;
  theme: string;
}

const PREFS_CACHE_KEY = "user_prefs_cache";
const PREFS_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

function getCachedPreferences(): UserPreferences | null {
  try {
    const raw = sessionStorage.getItem(PREFS_CACHE_KEY);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > PREFS_CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

function setCachedPreferences(prefs: UserPreferences) {
  try {
    sessionStorage.setItem(PREFS_CACHE_KEY, JSON.stringify({ ts: Date.now(), data: prefs }));
  } catch {
    // ignore
  }
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    // Hydrate from sessionStorage immediately to avoid loading state flash
    return getCachedPreferences() ?? { weekStartDay: 1, dayCount: 7, theme: "system" };
  });
  const [isLoading, setIsLoading] = useState(() => !getCachedPreferences());

  useEffect(() => {
    async function loadPreferences() {
      try {
        const res = await fetch("/api/user/preferences");
        if (res.ok) {
          const data = await res.json();
          const prefs = {
            weekStartDay: data.weekStartDay ?? 1,
            dayCount: data.dayCount ?? 7,
            theme: data.theme ?? "system",
          };
          setPreferences(prefs);
          setCachedPreferences(prefs);
        }
      } catch (error) {
        console.error("Failed to load preferences:", error);
      } finally {
        setIsLoading(false);
      }
    }
    // Only fetch if we don't have cached data
    if (!getCachedPreferences()) {
      loadPreferences();
    }
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
          const prefs = {
            weekStartDay: data.weekStartDay ?? 1,
            dayCount: data.dayCount ?? 7,
            theme: data.theme ?? "system",
          };
          setPreferences(prefs);
          setCachedPreferences(prefs);
        }
      } catch (error) {
        console.error("Failed to update preferences:", error);
      }
    },
    []
  );

  return { preferences, isLoading, updatePreferences };
}
