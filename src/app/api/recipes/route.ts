import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

/**
 * GET /api/recipes?query=term
 *
 * - If no query: return DB recipes (paginated)
 * - If query: call external Spoonacular search, fetch DB recipes matching title,
 *   merge external results first then DB results, dedupe by sourceId/url.
 *
 * Light in-memory cache is used to avoid hammering the external API during tests/development.
 */

type ExternalRecipe = {
  id: number | string;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
  summary?: string;
  nutrition?: unknown;
  sourceUrl?: string;
};

type ApiResult = {
  id: string;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
  summary?: string;
  nutrition?: unknown;
  source?: "external" | "db";
  sourceId?: string | number;
  url?: string | null;
  recipeId?: string | null; // DB id if available
};

const CACHE_TTL_MS = 60 * 1000; // 60s TTL for external query cache
const extCache = new Map<string, { ts: number; results: ApiResult[] }>();

function normalizeUrl(u?: string | null) {
  if (!u) return null;
  try {
    const url = new URL(u);
    url.hash = "";
    url.search = "";
    return url.toString();
  } catch {
    return (u || "").trim().toLowerCase();
  }
}

async function externalSearchSpoonacular(
  query: string,
  number = 10,
  offset = 0,
): Promise<ExternalRecipe[]> {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    // If API key isn't configured, return empty array (server-side will still return DB matches)
    return [];
  }

  const params = new URLSearchParams({
    apiKey,
    query,
    number: String(number),
    offset: String(offset),
    addRecipeInformation: "true",
    addRecipeNutrition: "true",
    fillIngredients: "true",
  });

  const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;

  const resp = await fetch(url);
  if (!resp.ok) {
    // Bubble up minimal info to logs but don't throw — allow DB results to be returned.
    console.error("Spoonacular fetch failed:", resp.status, resp.statusText);
    return [];
  }

  const data = await resp.json();
  const results = (data.results || []).map((r: Record<string, unknown>) => ({
    id: r.id,
    title: r.title,
    image: r.image,
    readyInMinutes: r.readyInMinutes,
    servings: r.servings,
    summary: r.summary,
    nutrition: r.nutrition,
    sourceUrl: r.sourceUrl || null,
  }));

  return results;
}

function mealTypeKeywords(mealType: string): string[] {
  switch (mealType.toLowerCase()) {
    case "breakfast":
      return [
        "breakfast",
        "egg",
        "omelette",
        "oatmeal",
        "toast",
        "pancake",
        "smoothie",
        "parfait",
      ];
    case "lunch":
      return ["lunch", "salad", "sandwich", "bowl", "wrap"];
    case "snack":
      return ["snack", "nuts", "bar", "fruit", "dip", "smoothie"];
    case "dinner":
      return ["dinner", "curry", "stir fry", "roast", "pasta", "soup"];
    default:
      return [mealType.toLowerCase()];
  }
}

async function getFrequentRecipesForUser(
  clerkUserId: string | null,
  mealType: string,
  take = 6,
): Promise<ApiResult[]> {
  if (!clerkUserId) return [];

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUserId },
    select: { id: true },
  });
  if (!user) return [];

  const grouped = await prisma.mealDish.groupBy({
    by: ["recipeId"],
    where: {
      mealPlanItem: {
        mealType: mealType.toLowerCase(),
        mealPlan: {
          userId: user.id,
        },
      },
    },
    _count: { recipeId: true },
    orderBy: {
      _count: { recipeId: "desc" },
    },
    take,
  });

  if (grouped.length === 0) return [];
  const recipeOrder = grouped.map((g) => g.recipeId);

  const recipes = await prisma.recipe.findMany({
    where: { id: { in: recipeOrder } },
  });
  const recipeMap = new Map(recipes.map((r) => [r.id, r]));

  return recipeOrder
    .map((id) => recipeMap.get(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map((r) => ({
      id: r.id,
      title: r.title,
      image: r.imageUrl || r.fallbackImageUrl || undefined,
      readyInMinutes: r.prepTime || undefined,
      servings: r.servings || undefined,
      summary: r.description || undefined,
      nutrition: r.nutrition || undefined,
      source: "db",
      sourceId: r.sourceId || r.id,
      url: r.sourceUrl || null,
      recipeId: r.id,
    }));
}

async function getSuggestedRecipesForMealType(
  mealType: string,
  take = 12,
): Promise<ApiResult[]> {
  const normalized = mealType.toLowerCase();
  const keywords = mealTypeKeywords(normalized);

  const titleConditions = keywords.map((keyword) => ({
    title: { contains: keyword, mode: "insensitive" as const },
  }));
  const tagConditions = keywords.map((keyword) => ({
    tags: { has: keyword },
  }));

  const recipes = await prisma.recipe.findMany({
    where: {
      isPublic: true,
      OR: [
        { mealType: { equals: normalized, mode: "insensitive" } },
        ...titleConditions,
        ...tagConditions,
      ],
    },
    orderBy: [{ savedCount: "desc" }, { updatedAt: "desc" }],
    take,
  });

  if (recipes.length >= take) {
    return recipes.map((r) => ({
      id: r.id,
      title: r.title,
      image: r.imageUrl || r.fallbackImageUrl || undefined,
      readyInMinutes: r.prepTime || undefined,
      servings: r.servings || undefined,
      summary: r.description || undefined,
      nutrition: r.nutrition || undefined,
      source: "db",
      sourceId: r.sourceId || r.id,
      url: r.sourceUrl || null,
      recipeId: r.id,
    }));
  }

  const fallback = await prisma.recipe.findMany({
    where: { isPublic: true },
    orderBy: [{ savedCount: "desc" }, { updatedAt: "desc" }],
    take,
  });

  const merged = [...recipes];
  const seen = new Set(merged.map((r) => r.id));
  for (const recipe of fallback) {
    if (seen.has(recipe.id)) continue;
    merged.push(recipe);
    if (merged.length >= take) break;
  }

  return merged.map((r) => ({
    id: r.id,
    title: r.title,
    image: r.imageUrl || r.fallbackImageUrl || undefined,
    readyInMinutes: r.prepTime || undefined,
    servings: r.servings || undefined,
    summary: r.description || undefined,
    nutrition: r.nutrition || undefined,
    source: "db",
    sourceId: r.sourceId || r.id,
    url: r.sourceUrl || null,
    recipeId: r.id,
  }));
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const q = (
      url.searchParams.get("query") ||
      url.searchParams.get("q") ||
      ""
    ).trim();
    const page = Math.max(0, Number(url.searchParams.get("page") || 0));
    const pageSize = Math.min(
      Math.max(Number(url.searchParams.get("pageSize") || 30), 1),
      100,
    );
    const mealType = (url.searchParams.get("mealType") || "").trim();
    const includeFrequent =
      (url.searchParams.get("includeFrequent") || "").toLowerCase() === "true";

    // If no query: return DB recipes (paginated)
    if (!q) {
      const authResult = await auth();
      const [frequent, suggestions] = await Promise.all([
        includeFrequent && mealType
          ? getFrequentRecipesForUser(authResult.userId, mealType, 8)
          : Promise.resolve([]),
        mealType
          ? getSuggestedRecipesForMealType(mealType, Math.max(pageSize, 12))
          : Promise.resolve([]),
      ]);

      const suggestionIds = new Set(suggestions.map((r) => String(r.id)));
      const frequentIds = new Set(frequent.map((r) => String(r.id)));
      const dbRecipes = await prisma.recipe.findMany({
        where: mealType
          ? {
              id: {
                notIn: [
                  ...Array.from(suggestionIds.values()),
                  ...Array.from(frequentIds.values()),
                ],
              },
            }
          : undefined,
        take: pageSize,
        skip: page * pageSize,
        orderBy: { savedCount: "desc" },
      });

      const results: ApiResult[] = dbRecipes.map((r) => ({
        id: r.id,
        title: r.title,
        image: r.imageUrl || r.fallbackImageUrl || undefined,
        readyInMinutes: r.prepTime || undefined,
        servings: r.servings || undefined,
        summary: undefined,
        nutrition: r.nutrition || undefined,
        source: "db",
        sourceId: r.sourceId || r.id,
        url: r.sourceUrl || null,
        recipeId: r.id,
      }));

      const merged = mealType
        ? [...frequent, ...suggestions, ...results]
        : results;

      return NextResponse.json({
        results: merged,
        page,
        pageSize,
        frequent,
        suggestions,
      });
    }

    // Query present: try cache first
    const cacheKey = `${q}:${page}:${pageSize}`;
    const cached = extCache.get(cacheKey);
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      return NextResponse.json({
        results: cached.results,
        page,
        pageSize,
        cached: true,
      });
    }

    // Fetch external results and DB matches in parallel
    const [externalRaw, dbMatches] = await Promise.all([
      externalSearchSpoonacular(q, Math.min(10, pageSize), page * 10),
      prisma.recipe.findMany({
        where: {
          title: { contains: q, mode: "insensitive" },
        },
        take: Math.max(pageSize, 30),
        orderBy: { savedCount: "desc" },
      }),
    ]);

    // Normalize and mark external results
    const externalResults: ApiResult[] = externalRaw.map((er) => ({
      id: String(er.id),
      title: er.title,
      image: er.image,
      readyInMinutes: er.readyInMinutes,
      servings: er.servings,
      summary: er.summary,
      nutrition: er.nutrition,
      source: "external",
      sourceId: er.id,
      url: normalizeUrl(er.sourceUrl || undefined),
      recipeId: null,
    }));

    // Build dedupe sets from external results (use sourceId and url)
    const extIds = new Set<string>(
      externalResults.map((r) => String(r.sourceId)),
    );
    const extUrls = new Set<string>(
      externalResults.map((r) => normalizeUrl(r.url) || ""),
    );

    // Add DB recipes, skipping duplicates (match sourceId or url)
    const merged: ApiResult[] = [...externalResults];

    for (const r of dbMatches) {
      const rSourceId = r.sourceId ? String(r.sourceId) : null;
      const rUrl = normalizeUrl(r.sourceUrl || undefined);
      const isDupById = rSourceId ? extIds.has(rSourceId) : false;
      const isDupByUrl = rUrl ? extUrls.has(rUrl) : false;

      if (isDupById || isDupByUrl) {
        // If duplicate, prefer external entry; but propagate recipeId if possible
        // Try to attach recipeId to the external entry that matched
        const matchIndex = merged.findIndex(
          (m) =>
            (m.sourceId && String(m.sourceId) === rSourceId) ||
            (m.url && rUrl && normalizeUrl(m.url) === rUrl),
        );
        if (matchIndex !== -1 && !merged[matchIndex].recipeId) {
          merged[matchIndex].recipeId = r.id;
        }
        continue;
      }

      merged.push({
        id: r.id,
        title: r.title,
        image: r.imageUrl || r.fallbackImageUrl || undefined,
        readyInMinutes: r.prepTime || undefined,
        servings: r.servings || undefined,
        summary: undefined,
        nutrition: r.nutrition || undefined,
        source: "db",
        sourceId: r.sourceId || r.id,
        url: r.sourceUrl || null,
        recipeId: r.id,
      });
    }

    // Cache merged results
    extCache.set(cacheKey, { ts: Date.now(), results: merged });

    return NextResponse.json({ results: merged, page, pageSize });
  } catch (error) {
    console.error("Error in /api/recipes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
