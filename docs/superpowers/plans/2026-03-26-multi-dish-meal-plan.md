# Multi-Dish Meal Plan Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the meal plan from one-recipe-per-slot to multi-dish-per-slot with quantities, units, and live calorie calculation.

**Architecture:** Add a `MealDish` junction table linking `MealPlanItem` to multiple `Recipe` records with quantity/unit. Update API to serve dishes, build a new Drawer component for dish management, and wire up real calorie calculations.

**Tech Stack:** Next.js 15, Prisma/PostgreSQL, Tailwind CSS, shadcn/ui (Drawer), Framer Motion

---

## File Map

| File                                                           | Action                                       |
| -------------------------------------------------------------- | -------------------------------------------- |
| `prisma/schema.prisma`                                         | Add `MealDish` model + relation              |
| `src/components/dashboard/meal-plans/types.ts`                 | Add `Dish` type, update `WeeklyMeals`        |
| `src/app/api/meal-plans/current/route.ts`                      | Include dishes in GET, handle dishes in POST |
| `src/app/api/meal-plans/update-meal/route.ts`                  | Accept dishes array                          |
| `src/components/dashboard/meal-plans/MealPlanHeader.tsx`       | Remove generate button + circle              |
| `src/components/dashboard/meal-plans/MealDrawer.tsx`           | **NEW** — dish management drawer             |
| `src/components/dashboard/meal-plans/MealSlotCard.tsx`         | **NEW** — compact multi-dish grid cell       |
| `src/components/dashboard/meal-plans/MealTypeRow.tsx`          | Use MealSlotCard + drawer trigger            |
| `src/components/dashboard/meal-plans/hooks/useMealPlanData.ts` | Real calorie calculations                    |
| `src/components/dashboard/meal-plans/WeeklyStatsCard.tsx`      | Accept computed stats                        |
| `src/components/dashboard/meal-plans/DailyStatsCard.tsx`       | Accept computed stats                        |
| `src/components/dashboard/meal-plans/DailyMealGrid.tsx`        | Update for multi-dish                        |
| `src/components/dashboard/meal-plans/index.ts`                 | Export new components                        |
| `src/lib/mealPlanClient.ts`                                    | Add `updateMealDishesAPI`                    |
| `src/app/dashboard/meal-plans/page.tsx`                        | Wire up drawer + real daily stats            |

---

### Task 1: Database Schema + Migration

**Files:**

- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add MealDish model to schema**

- [ ] **Step 2: Run Prisma migration**

- [ ] **Step 3: Write data migration to convert existing single-dish MealPlanItems**

---

### Task 2: Update Frontend Types

**Files:**

- Modify: `src/components/dashboard/meal-plans/types.ts`

- [ ] **Step 1: Add Dish interface and update WeeklyMeals to support dishes array**

---

### Task 3: Update API — GET with dishes

**Files:**

- Modify: `src/app/api/meal-plans/current/route.ts`

- [ ] **Step 1: Update GET query to include dishes with recipes**
- [ ] **Step 2: Update response shape to include dishes per meal slot**
- [ ] **Step 3: Update POST to accept and persist dishes array**

---

### Task 4: Update API — update-meal with dishes

**Files:**

- Modify: `src/app/api/meal-plans/update-meal/route.ts`

- [ ] **Step 1: Accept dishes array in request body**
- [ ] **Step 2: Upsert MealPlanItem, delete existing MealDishes, create new ones**

---

### Task 5: Remove clutter from MealPlanHeader

**Files:**

- Modify: `src/components/dashboard/meal-plans/MealPlanHeader.tsx`

- [ ] **Step 1: Remove Regenerate button and empty circle**

---

### Task 6: Update API client

**Files:**

- Modify: `src/lib/mealPlanClient.ts`

- [ ] **Step 1: Add `updateMealDishesAPI` function**

---

### Task 7: Create MealSlotCard component

**Files:**

- Create: `src/components/dashboard/meal-plans/MealSlotCard.tsx`

- [ ] **Step 1: Build compact multi-dish summary card for grid cells**

---

### Task 8: Create MealDrawer component

**Files:**

- Create: `src/components/dashboard/meal-plans/MealDrawer.tsx`

- [ ] **Step 1: Build drawer with search, add dishes, quantity/unit inputs, live calorie totals**

---

### Task 9: Update MealTypeRow for multi-dish

**Files:**

- Modify: `src/components/dashboard/meal-plans/MealTypeRow.tsx`

- [ ] **Step 1: Replace MealPlanCard with MealSlotCard, wire drawer open callback**

---

### Task 10: Fix calorie calculations

**Files:**

- Modify: `src/components/dashboard/meal-plans/hooks/useMealPlanData.ts`
- Modify: `src/components/dashboard/meal-plans/WeeklyStatsCard.tsx`
- Modify: `src/components/dashboard/meal-plans/DailyStatsCard.tsx`

- [ ] **Step 1: Add dish-aware calorie helpers in useMealPlanData**
- [ ] **Step 2: Update WeeklyStatsCard to show real averages**
- [ ] **Step 3: Update DailyStatsCard to show real totals**

---

### Task 11: Wire up page + DailyMealGrid

**Files:**

- Modify: `src/app/dashboard/meal-plans/page.tsx`
- Modify: `src/components/dashboard/meal-plans/DailyMealGrid.tsx`
- Modify: `src/components/dashboard/meal-plans/index.ts`

- [ ] **Step 1: Add MealDrawer state to page**
- [ ] **Step 2: Update DailyMealGrid for multi-dish**
- [ ] **Step 3: Export new components**

---

### Task 12: Build + verify

- [ ] **Step 1: Run `npm run build` and fix any errors**
- [ ] **Step 2: Manual verification of the flow**
