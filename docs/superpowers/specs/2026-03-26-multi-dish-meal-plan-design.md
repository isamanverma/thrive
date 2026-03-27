# Multi-Dish Meal Plan Redesign

## Problem

The current meal plan grid supports only **one recipe per meal slot** (e.g., just "Egg Fried Rice" for lunch). In reality, a meal consists of multiple dishes with quantities (e.g., 1 bowl Egg Fried Rice + 0.5 bowl Manchow Soup + 1 Fried Chicken + 1 Diet Coke). Additionally:

- Calorie stats are **hardcoded** — not calculated from actual meals
- The UI has non-functional elements (Generate button, empty circle) adding clutter
- Each grid cell shows one dish with no way to compose a full meal

## Design Decisions

| Decision          | Choice                                                           |
| ----------------- | ---------------------------------------------------------------- |
| Overlay style     | Drawer (slides from right)                                       |
| Quantity input    | Number + unit selector (bowl, cup, piece, serving, plate, glass) |
| Fix calorie stats | Yes — calculate live from meal data                              |
| Database approach | Junction table (MealDish)                                        |

---

## 1. Database Schema Changes

### New Model: `MealDish`

```prisma
model MealDish {
  id             String       @id @default(uuid())
  mealPlanItemId String
  recipeId       String
  quantity       Float        @default(1)
  unit           String       @default("serving")
  order          Int          @default(0)
  mealPlanItem   MealPlanItem @relation(fields: [mealPlanItemId], references: [id], onDelete: Cascade)
  recipe         Recipe       @relation(fields: [recipeId], references: [id])

  @@index([mealPlanItemId])
}
```

### Updated `MealPlanItem`

Add the reverse relation:

```prisma
model MealPlanItem {
  // ... existing fields ...
  dishes MealDish[]   // NEW
}
```

The existing `@@unique([mealPlanId, dayOfWeek, mealType])` stays — one MealPlanItem per slot, many dishes inside it.

### Migration

- Run `npx prisma migrate dev --name add-meal-dishes`
- Migrate existing single-dish MealPlanItems: for each item with a `cachedRecipeId`, create a corresponding `MealDish` row with `quantity: 1, unit: "serving"`

---

## 2. API Changes

### `GET /api/meal-plans/current`

- Include `dishes` (with nested `recipe`) in the Prisma query response
- Shape: `{ mealPlanItems: [{ dayOfWeek, mealType, dishes: [{ quantity, unit, recipe: { title, nutrition, imageUrl } }] }] }`
- Remove hardcoded calorie values — return raw nutrition data per dish

### `POST /api/meal-plans/update-meal`

Update to accept a `dishes` array instead of a single recipe:

```json
{
  "dayOfWeek": 1,
  "mealType": "lunch",
  "dishes": [
    { "recipeId": "abc123", "quantity": 1, "unit": "bowl" },
    { "recipeId": "def456", "quantity": 0.5, "unit": "bowl" }
  ]
}
```

- Upsert MealPlanItem for the slot
- Delete existing MealDish rows for that item
- Create new MealDish rows from the array
- Return the updated item with dishes + recipes

### `POST /api/meal-plans/update-dish` (NEW — optional, for single-dish edits)

For quick quantity/unit changes without replacing the entire meal:

```json
{
  "mealPlanItemId": "uuid",
  "dishId": "uuid",
  "quantity": 2,
  "unit": "piece"
}
```

---

## 3. UI Changes

### 3a. Remove Clutter from `MealPlanHeader.tsx`

**Remove:**

- "Regenerate Week" / "Regenerate Day" button (lines 56-59) — it's a TODO stub
- Empty `<div className="w-8 h-8 bg-input rounded-full"></div>` (line 61)

**Keep:**

- Title "Weekly Meal Planner"
- Weekly/Daily view toggle

### 3b. Meal Grid Cell — Updated Appearance

When a slot has dishes, show a compact summary card inside the cell:

```
┌─────────────────────────┐
│ 🍳 Egg Fried Rice       │
│ 🥣 Manchow Soup (0.5x)  │
│ 🍗 Fried Chicken        │
│ ─────────────────────── │
│ 3 dishes · 820 kcal     │
└─────────────────────────┘
```

- List up to 2-3 dish names (truncate with "+2 more" if more)
- Show total calorie count for the slot at the bottom
- Click opens the drawer

When empty, keep the current dashed-border "+" placeholder.

### 3c. New Component: `MealDrawer.tsx`

A shadcn Drawer component that opens when clicking a meal slot. Layout:

```
┌─────────────────────────────────────┐
│  Lunch — Monday                     │
│                                     │
│  ┌─ Search bar ──────────────────┐  │
│  │ 🔍 Search dishes...           │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌─ Search Results ──────────────┐  │
│  │ 🍳 Egg Fried Rice      [Add]  │  │
│  │ 🥣 Manchow Soup        [Add]  │  │
│  │ 🍗 Fried Chicken       [Add]  │  │
│  └───────────────────────────────┘  │
│                                     │
│  ── Added to this meal ───────────  │
│                                     │
│  ┌─ Dish Row ────────────────────┐  │
│  │ 🍳 Egg Fried Rice             │  │
│  │ [1] [▼ serving]      [Remove] │  │
│  │ 420 kcal · 12g P · 58g C     │  │
│  └───────────────────────────────┘  │
│  ┌─ Dish Row ────────────────────┐  │
│  │ 🥣 Manchow Soup               │  │
│  │ [0.5] [▼ bowl]       [Remove] │  │
│  │ 75 kcal · 3g P · 10g C       │  │
│  └───────────────────────────────┘  │
│                                     │
│  ════════════════════════════════   │
│  Meal Total: 495 kcal               │
│  Protein: 15g  Carbs: 68g  Fat: 8g │
│  ════════════════════════════════   │
└─────────────────────────────────────┘
```

**Key behaviors:**

- Search uses the existing `/api/recipes` endpoint (DB + Spoonacular)
- "Add" button appends the dish to the list with defaults: `quantity: 1, unit: "serving"`
- Each added dish row has: quantity input, unit dropdown, remove button
- **Live calorie/macro calculation** — totals update instantly as quantity/unit changes
- On "Save" or drawer close, persist via `update-meal` API
- Unit dropdown options: `serving, bowl, cup, piece, plate, glass`
- Nutrition per dish = `recipe.nutrition × quantity` (unit is descriptive, not a conversion factor)

### 3d. Fix Calorie Calculations

#### `WeeklyStatsCard.tsx`

- Accept actual meal data as prop
- Calculate: sum all dish calories across all meals in each day, average across 7 days
- Protein/carbs/fat: same approach — sum dishes, average days

#### `DailyStatsCard.tsx`

- Accept actual meal data as prop
- Calculate total from all dishes across all 4 meal types
- Calories left = goal (2000 default) - total
- Macros: sum from all dishes

#### `useMealPlanData.ts`

- Add helper functions: `calculateDishCalories(dish)`, `calculateSlotCalories(dishes)`, `calculateDayCalories(dayMeals)`
- Nutrition = `recipe.nutrition.calories × dish.quantity`
- Update `calculateWeeklyStats()` to use real data instead of hardcoded values

### 3e. Update `MealPlanCard.tsx`

- When a slot has multiple dishes, show the compact summary (dish names + total calories)
- Click handler opens the drawer instead of the current MealDetailModal
- Single-dish slots can still show the current card layout but with a modified click target

### 3f. Update `DailyMealGrid.tsx`

- Pass real calculated stats to DailyStatsCard instead of hardcoded values
- Slot click opens the same drawer

---

## 4. Unit System

Units are **descriptive labels** — they don't trigger nutrition conversions. The nutrition math is:

```
dishCalories = recipe.baseCalories × dish.quantity
```

A "bowl" of rice at quantity 1 = full recipe nutrition. A "bowl" at quantity 0.5 = half.

Supported units (displayed in dropdown):

- `serving` (default)
- `bowl`
- `cup`
- `piece`
- `plate`
- `glass`

---

## 5. Data Migration

For existing MealPlanItems that have `cachedRecipeId` but no dishes:

```sql
INSERT INTO "MealDish" (id, "mealPlanItemId", "recipeId", quantity, unit, "order")
SELECT gen_random_uuid(), id, "cachedRecipeId", 1, 'serving', 0
FROM "MealPlanItem"
WHERE "cachedRecipeId" IS NOT NULL;
```

This ensures backward compatibility — existing meal plans work immediately.

---

## 6. File Changes Summary

| File                                                           | Action                                                  |
| -------------------------------------------------------------- | ------------------------------------------------------- |
| `prisma/schema.prisma`                                         | Add MealDish model, add dishes relation to MealPlanItem |
| `prisma/migrations/...`                                        | Auto-generated migration                                |
| `src/app/api/meal-plans/current/route.ts`                      | Include dishes in query, fix calorie response           |
| `src/app/api/meal-plans/update-meal/route.ts`                  | Accept dishes array, upsert + delete/create dishes      |
| `src/components/dashboard/meal-plans/MealPlanHeader.tsx`       | Remove generate button + circle                         |
| `src/components/dashboard/meal-plans/MealDrawer.tsx`           | **NEW** — drawer for adding/editing dishes              |
| `src/components/dashboard/meal-plans/MealPlanSlotCard.tsx`     | **NEW** — compact multi-dish summary for grid cells     |
| `src/components/dashboard/meal-plans/WeeklyStatsCard.tsx`      | Calculate from real data                                |
| `src/components/dashboard/meal-plans/DailyStatsCard.tsx`       | Calculate from real data                                |
| `src/components/dashboard/meal-plans/MealTypeRow.tsx`          | Update to use new slot card + drawer trigger            |
| `src/components/dashboard/meal-plans/DailyMealGrid.tsx`        | Update slot rendering + stats                           |
| `src/components/dashboard/meal-plans/types.ts`                 | Update types to include dishes array                    |
| `src/components/dashboard/meal-plans/hooks/useMealPlanData.ts` | Add dish-aware calorie calculations                     |
| `src/components/dashboard/MealPlanCard.tsx`                    | Update for multi-dish display                           |
