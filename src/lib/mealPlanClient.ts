/**
 * Client helper for Meal Plan and Recipe APIs.
 * Used by the meal-plans UI hooks to centralize fetch logic, loading states,
 * optimistic updates helpers, and error handling.
 *
 * See [`src/components/dashboard/meal-plans/hooks/useMealPlanData.ts`](src/components/dashboard/meal-plans/hooks/useMealPlanData.ts:1)
 */

export type DishItem = {
  recipeId: string;
  name: string;
  calories?: number;
  image?: string;
  description?: string;
  quantity: number;
  unit: string;
  nutrition?: unknown;
};

export type MealItem = {
  id: number | string;
  name: string;
  calories?: number;
  image?: string;
  description?: string;
  nutrition?: unknown;
  dishes?: DishItem[];
};

export type WeeklyMeals = Record<number, Record<string, MealItem>>;

export type MealPlanResponse = {
  mealPlanId: string;
  weeklyMeals: WeeklyMeals;
  startDate?: string;
  endDate?: string;
};

type MealPlanFetchOptions = {
  force?: boolean;
};

export type ApiResult = {
  id: string | number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
  summary?: string;
  nutrition?: unknown;
  source: "external" | "db";
  sourceId?: string | number;
  url?: string | null;
  recipeId?: string | null;
};

export type GetRecipesResponse = {
  results: ApiResult[];
  page?: number;
  pageSize?: number;
  frequent?: ApiResult[];
  suggestions?: ApiResult[];
};

async function safeJson(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

const MEAL_PLAN_CACHE_TTL_MS = 5 * 60 * 1000;
const mealPlanCache = new Map<string, { ts: number; data: MealPlanResponse }>();
const mealPlanInflight = new Map<
  string,
  Promise<{ ok: boolean; data?: MealPlanResponse; error?: unknown }>
>();

function getWeekCacheKey(date?: Date, weekStartDay = 1): string {
  const d = date ? new Date(date) : new Date();
  const offset = (d.getDay() - weekStartDay + 7) % 7;
  d.setDate(d.getDate() - offset);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split("T")[0] + `|${weekStartDay}`;
}

export function invalidateMealPlanCache(date?: Date, weekStartDay?: number) {
  if (!date) {
    mealPlanCache.clear();
    return;
  }
  mealPlanCache.delete(getWeekCacheKey(date, weekStartDay));
}

export async function fetchCurrentMealPlan(
  date?: Date,
  options?: MealPlanFetchOptions,
  weekStartDay?: number,
): Promise<{ ok: boolean; data?: MealPlanResponse; error?: unknown }> {
  const key = getWeekCacheKey(date, weekStartDay);
  const force = Boolean(options?.force);

  if (!force) {
    const cached = mealPlanCache.get(key);
    if (cached && Date.now() - cached.ts < MEAL_PLAN_CACHE_TTL_MS) {
      return { ok: true, data: cached.data };
    }
  }

  const inflight = mealPlanInflight.get(key);
  if (inflight && !force) {
    return inflight;
  }

  const reqPromise = (async () => {
    try {
      const params = new URLSearchParams();
      if (date) {
        params.set("date", date.toISOString().split("T")[0]);
      }
      if (weekStartDay != null) {
        params.set("weekStartDay", String(weekStartDay));
      }
      const query = params.toString();
      const res = await fetch(
        `/api/meal-plans/current${query ? `?${query}` : ""}`,
      );
      const payload = await safeJson(res);
      if (!res.ok) return { ok: false, error: payload };
      const data = payload as MealPlanResponse;
      mealPlanCache.set(key, { ts: Date.now(), data });
      return { ok: true, data };
    } catch (err) {
      console.error("fetchCurrentMealPlan error:", err);
      return { ok: false, error: err };
    } finally {
      mealPlanInflight.delete(key);
    }
  })();

  mealPlanInflight.set(key, reqPromise);
  return reqPromise;
}

export async function saveCurrentMealPlan(
  weeklyMeals: WeeklyMeals,
  startDate?: string,
  endDate?: string,
) {
  try {
    invalidateMealPlanCache();
    const res = await fetch("/api/meal-plans/current", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weeklyMeals, startDate, endDate }),
    });
    const payload = await safeJson(res);
    if (!res.ok) throw payload;
    return payload;
  } catch (err) {
    console.error("saveCurrentMealPlan error:", err);
    throw err;
  }
}

export async function updateMealDishesAPI(
  dayIndex: number,
  mealType: string,
  dishes: DishItem[],
  action: "set" | "remove" = "set",
  date?: Date,
) {
  try {
    invalidateMealPlanCache();
    const body: Record<string, unknown> = {
      dayIndex,
      mealType,
      dishes,
      action,
    };
    if (date) {
      body.date = date.toISOString().split("T")[0];
    }
    const res = await fetch("/api/meal-plans/update-meal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = await safeJson(res);
    if (!res.ok) throw payload;
    return payload;
  } catch (err) {
    console.error("updateMealDishesAPI error:", err);
    throw err;
  }
}

export async function swapMealsAPI(
  sourceDayIndex: number,
  sourceMealType: string,
  targetDayIndex: number,
  targetMealType: string,
  date?: Date,
) {
  try {
    invalidateMealPlanCache();
    const body: Record<string, unknown> = {
      sourceDayIndex,
      sourceMealType,
      targetDayIndex,
      targetMealType,
    };
    if (date) {
      body.date = date.toISOString().split("T")[0];
    }
    const res = await fetch("/api/meal-plans/swap-meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = await safeJson(res);
    if (!res.ok) throw payload;
    return payload;
  } catch (err) {
    console.error("swapMealsAPI error:", err);
    throw err;
  }
}

/**
 * Recipes: fetch DB recipes or merged external+DB results.
 * - If query is empty, returns DB recipes paginated
 * - If query present, server returns external-first merged results
 */
export async function getRecipes(
  query?: string,
  page = 0,
  pageSize = 30,
  options?: { mealType?: string; includeFrequent?: boolean },
): Promise<GetRecipesResponse> {
  try {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    params.append("page", String(page));
    params.append("pageSize", String(pageSize));
    if (options?.mealType) params.append("mealType", options.mealType);
    if (options?.includeFrequent) params.append("includeFrequent", "true");
    const res = await fetch(`/api/recipes?${params.toString()}`);
    const payload = await safeJson(res);
    if (!res.ok) throw payload;
    return payload as GetRecipesResponse;
  } catch (err) {
    console.error("getRecipes error:", err);
    return {
      results: [],
      page,
      pageSize,
      frequent: [],
      suggestions: [],
    };
  }
}
