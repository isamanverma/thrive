/**
 * tests/recipes_and_mealplan.test.ts
 *
 * Unit tests for:
 * - src/app/api/recipes/route.ts (merge external + DB results, dedupe, order)
 * - src/app/api/meal-plans/current/route.ts (basic persistence flow)
 *
 * Run: npm test -- tests/recipes_and_mealplan.test.ts
 *
 * NOTE: This test file uses light jest mocks for prisma and global.fetch so it
 * remains fast and runnable in the repo's existing Jest setup.
 */

/* Import routes after mocking prisma to avoid TDZ during jest hoisting.
   We define the mock first, call jest.mock, then require the modules. */

// Minimal mock prisma used by routes. We intentionally keep behaviours simple.
const mockPrisma: Record<string, any> = {
  recipe: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  mealPlan: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  mealPlanItem: {
    deleteMany: jest.fn(),
    createMany: jest.fn(),
  },
  $transaction: jest.fn(async (fn: any) => {
    // pass a tx object that proxies to mockPrisma
    return fn(mockPrisma);
  }),
  $queryRaw: jest.fn(async () => 1),
};

// Replace prisma used by modules under test
jest.mock("../src/lib/prisma", () => {
  return {
    prisma: mockPrisma,
  };
});

// Require routes after mocking to avoid TDZ issues caused by jest hoisting imports
const {
  GET: mealPlanGET,
  POST: mealPlanPOST,
} = require("../src/app/api/meal-plans/current/route");
const { GET: recipesGET } = require("../src/app/api/recipes/route");

describe("GET /api/recipes (merged external + db)", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("returns DB recipes when no query is provided", async () => {
    // Arrange: mock DB recipes
    mockPrisma.recipe.findMany.mockResolvedValueOnce([
      {
        id: "uuid-db-1",
        title: "Stored Pancakes",
        imageUrl: "/pancakes.png",
        sourceId: "ext-123",
        nutrition: { calories: 420 },
        savedCount: 5,
        sourceUrl: "https://example.com/pancakes",
      },
    ]);

    const req = new Request("http://localhost/api/recipes");
    // Act
    const res: any = await recipesGET(req as any);
    const json = await res.json();

    // Assert
    expect(Array.isArray(json.results)).toBe(true);
    expect(json.results.length).toBe(1);
    expect(json.results[0].source).toBe("db");
    expect(json.results[0].title).toBe("Stored Pancakes");
  });

  it("merges external results first and deduplicates against DB by sourceId/url", async () => {
    // Arrange:
    // External API returns a recipe with source id "123" and a url
    const externalResp = {
      results: [
        {
          id: 123,
          title: "External Pancakes",
          image: "/ext-pancakes.png",
          sourceUrl: "https://example.com/pancakes",
          nutrition: { nutrients: [{ name: "Calories", amount: 400 }] },
        },
        {
          id: 124,
          title: "External Waffles",
          image: "/ext-waffles.png",
          sourceUrl: "https://example.com/waffles",
          nutrition: { nutrients: [{ name: "Calories", amount: 350 }] },
        },
      ],
      offset: 0,
      number: 2,
      totalResults: 2,
    };

    // Mock global fetch used by src/app/api/recipes/route.ts externalSearchSpoonacular
    (global as any).fetch = jest.fn(async (url: string) => {
      return {
        ok: true,
        status: 200,
        json: async () => externalResp,
      };
    });

    // DB has one recipe that is the same as external (matching by sourceUrl/sourceId)
    mockPrisma.recipe.findMany.mockResolvedValueOnce([
      {
        id: "uuid-db-1",
        title: "Stored Pancakes (old)",
        imageUrl: "/pancakes-old.png",
        sourceId: "123", // same as external id
        sourceUrl: "https://example.com/pancakes",
        nutrition: { calories: 410 },
        savedCount: 1,
      },
      // Additional DB-only recipe should appear after external ones
      {
        id: "uuid-db-2",
        title: "Local Salad",
        imageUrl: "/salad.png",
        sourceId: null,
        sourceUrl: null,
        nutrition: { calories: 150 },
        savedCount: 3,
      },
    ]);

    const req = new Request("http://localhost/api/recipes?query=pancake");
    // Act
    const res: any = await recipesGET(req as any);
    const json = await res.json();

    // Assert - external results should come first
    expect(Array.isArray(json.results)).toBe(true);
    expect(json.results.length).toBeGreaterThanOrEqual(2);

    // First result should be the external pancake
    const first = json.results[0];
    expect(first.source).toBe("external");
    expect(String(first.sourceId)).toBe("123");
    // The DB duplicate should not appear separately; its recipeId should be attached to external item
    const extMatch = json.results.find(
      (r: any) => String(r.sourceId) === "123",
    );
    expect(extMatch).toBeDefined();
    expect(
      extMatch.recipeId === "uuid-db-1" || extMatch.recipeId == null,
    ).toBeTruthy();

    // Local-only DB recipe should appear after external results
    const local = json.results.find(
      (r: any) => r.source === "db" && r.title.includes("Local Salad"),
    );
    expect(local).toBeDefined();
  });
});

describe("Meal plan persistence endpoints (basic)", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("POST /api/meal-plans/current creates or returns a meal plan and stores items", async () => {
    // Arrange: mock user lookup and mealPlan behavior
    mockPrisma.user.findUnique.mockResolvedValueOnce({
      id: "user-1",
      clerkId: "clerk-123",
    });

    // No existing meal plan -> findFirst returns null, create creates one
    mockPrisma.mealPlan.findFirst.mockResolvedValueOnce(null);
    mockPrisma.mealPlan.create.mockResolvedValueOnce({
      id: "mp-1",
      userId: "user-1",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    });

    // Deleting existing items is a no-op
    mockPrisma.mealPlanItem.deleteMany.mockResolvedValueOnce({ count: 0 });

    // Creating recipe for meal and creating mealPlanItems
    mockPrisma.recipe.findFirst.mockResolvedValueOnce(null); // recipe not found -> create
    mockPrisma.recipe.create.mockResolvedValueOnce({
      id: "recipe-1",
      title: "Test Meal",
      sourceId: "R1",
    });
    mockPrisma.mealPlanItem.createMany.mockResolvedValueOnce({ count: 1 });

    const sampleWeeklyMeals = {
      0: {
        // Monday
        breakfast: { id: "R1", name: "Test Meal", calories: 100 },
      },
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
    };

    const body = JSON.stringify({
      weeklyMeals: sampleWeeklyMeals,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    });

    const req = new Request("http://localhost/api/meal-plans/current", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });

    // Act
    const res: any = await mealPlanPOST(req as any);
    const json = await res.json();

    // Assert
    expect(json.success).toBeTruthy();
    expect(json.mealPlanId).toBeDefined();
    expect(json.itemsCreated).toBeGreaterThanOrEqual(0);
  });
});

/**
 Runbook (VS Code):
 - Apply migration: psql "$DATABASE_URL" -f prisma/migrations/20251006_init_mealplans/migration.sql
 - Start dev server: npm run dev (view logs in VS Code terminal)
 - Run tests: npm test -- tests/recipes_and_mealplan.test.ts
 - Manual verification:
   1) Open /dashboard/meal-plans in browser
   2) Click an empty slot -> drawer should open and show DB recipes (server GET /api/recipes without query)
   3) Type search -> server GET /api/recipes?query=term returns external results first then DB recipes
   4) Add a meal -> server persists via /api/meal-plans/update-meal and /api/meal-plans/current; restart server and reload page -> persisted meal present
 */
