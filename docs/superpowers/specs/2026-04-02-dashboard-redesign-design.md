# Dashboard Redesign: Daily Progress Panel + Bento Grid

**Date:** 2026-04-02  
**Status:** Revised — post-review fixes applied

## Summary

Replace the generic 4 stat-card row on the Thrive dashboard with a unified Daily Progress Panel and restructure the page into a bento-grid layout. The goal is an at-a-glance overview where all key information is visible, visually cohesive, and free of redundant card containers.

## Problem

The current dashboard opens with 4 disconnected stat cards (Calories, Remaining, Meals, Streak) that feel like filler — generic dashboard boilerplate disconnected from the actual content. Below them, every section (Meals, Exercise, Weekly Progress) is wrapped in its own `Card` container, creating visual noise.

## Design Decisions

### Layout Architecture

```
┌─────────────────────────────────────────────────────┐
│  Good morning, Aman          Mon Apr 7  ◀ ▶  🔥 12  │  ← Top bar
├─────────────────────────────────────────────────────┤
│                                                     │
│   Calories        Meals Today       Exercise         │  ← Progress panel
│   [ring] 1247     B ✓ L ◑ D ○       30 min planned   │
│   / 2100 kcal     2 of 4 done       [progress bar]   │
│                                                     │
├──────────────────────────────┬──────────────────────┤
│                              │                      │
│  Meals (col-span-2)          │  Exercise            │  ← Bento grid
│  ─────────────────           │  (col-span-1)        │
│  🍳 Breakfast  [actions]     │  🏃 Morning Run      │
│  🥗 Lunch      [actions]     │  💪 Full Body        │
│  🍽️ Dinner     [actions]     │                      │
│  🍎 Snack      [actions]     │                      │
│                              │                      │
├──────────────────────────────┴──────────────────────┤
│                                                     │
│  Weekly Progress — 72% adherence                    │  ← Chart
│  [line chart, h-56, no Y-axis]                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Section 1: Merged Top Bar

**What changes:** `DashboardHeader` and `DateSelector` composed inline in `page.tsx` — NOT merged into `DashboardHeader.tsx`.

- **Left:** Greeting — `text-2xl` (down from `text-3xl`), same dynamic name logic from `DashboardHeader`
- **Right:** `DateRangePicker` from `@/components/ui/date-range-picker` (same component used in meal plans page) + streak badge inline
  - Use `dayCount={1}` for single-day selection
  - `value` = `{ from: selectedDate, to: selectedDate }`
  - `onChange` = update `selectedDate` state
  - Remove the existing `DateSelector` component from the dashboard entirely — it is replaced by `DateRangePicker`
  - Add prev/next chevron buttons flanking the picker (same pattern as `MealPlanHeader`)
  - Add a "Today" button when the selected date is not today (same pattern as `MealPlanHeader`)
- **Streak badge:** Uses `data.stats.streakDays` from `useDashboardData`. Shown only when `streakDays > 0`. Format: `🔥 {n} day{n > 1 ? 's' : ''}`
- **Mobile:** Stacks vertically, greeting on top, date + streak below
- **Architecture decision:** Compose inline in `page.tsx`. `DashboardHeader` remains a standalone component for the greeting only. The `DateSelector` and streak badge are rendered in `page.tsx` next to it. This avoids prop-drilling streak data into `DashboardHeader` and keeps the two data-fetching paths (user fetch in `DashboardHeader`, dashboard data fetch in `page.tsx`) independent — each renders when ready.

### Section 2: Daily Progress Panel

**Replaces:** The 4 stat cards entirely.

**Structure:** Single full-width section, no card wrapper. Uses `border-t border-b` with `py-6` for visual grouping.

**Three-column grid** (`grid-cols-3` on desktop, `grid-cols-1` on mobile):

| Column       | Content                                       | Visual                                     |
| ------------ | --------------------------------------------- | ------------------------------------------ |
| **Calories** | Circular progress ring + `1,247 / 2,100 kcal` | SVG ring (see specs below)                 |
| **Meals**    | `2 of 4 completed` + meal type indicators     | Breakfast ✓ · Lunch ◑ · Dinner ○ · Snack ○ |
| **Exercise** | `30 min planned` + mini progress bar          | Duration text + thin progress bar          |

**Calorie ring SVG specs:**

- Container: `w-28 h-28` on desktop, `w-20 h-20` on mobile
- SVG: `viewBox="0 0 120 120"`
- Background circle: `cx="60" cy="60" r="48"`, `stroke="currentColor"`, `strokeWidth="8"`, `fill="none"`, color `text-muted/10`
- Progress circle: same dimensions, `strokeWidth="8"`, `fill="none"`, `strokeLinecap="round"`, rotated `-90deg` so progress starts at top
- `stroke-dasharray` = `2 * π * 48` ≈ `301.59`
- `stroke-dashoffset` = `301.59 * (1 - progress)` where `progress = min(caloriesConsumed / totalCalories, 1)`
- **Color strategy:** The ring uses a single amber/orange accent at varying opacity — not multi-color. `text-amber-500` when on-track (≥80%), `text-amber-400` when moderate (50-79%), `text-amber-300` when behind (<50%). This maintains the single-accent rule while providing semantic feedback through opacity/intensity.
- **Over-consumption:** When `caloriesConsumed > totalCalories`, the ring caps at 100% (full circle) and the number displays in `text-rose-500` to signal overage. The ring itself stays amber.
- **Zero-calorie goal:** When `totalCaloriesToday === 0`, show `—` instead of the ring. Display "No calorie target set" as helper text.
- **Animation:** On mount, animate `stroke-dashoffset` from full circumference to target value using spring easing (`type: "spring", stiffness: 80, damping: 16`)

**Meals status:**

- Meal completion is binary (`completed: boolean`). The `◑` (half-filled circle) symbol is NOT used — it was an error in the original spec. Use `✓` (check, completed) or `○` (circle, not completed) only.
- Display: list each meal type with its status icon, e.g., `Breakfast ✓  Lunch ○  Dinner ○  Snack ○`
- Count: `2 of 4 completed` above the type indicators

**Exercise summary:**

- Total planned duration from exercise list (sum of all exercise durations, parsed from "30 minutes" strings)
- Completed exercises count: `1 of 2 done`
- Mini progress bar: `h-1.5`, `rounded-full`, `bg-amber-500/20` track, `bg-amber-500` fill

**Design details:**

- No card box — uses `divide-x` between columns, `border-t border-b` for the section
- Numbers use `tabular-nums`
- Subtle labels in `text-muted-foreground text-sm`
- On mobile: 3 stacked rows, each with a left-aligned label and right-aligned value, separated by `divide-y`

### Section 3: Bento Grid — Meals + Exercise

**Grid:** `grid grid-cols-1 md:grid-cols-3 gap-6`

**Meals tile (col-span-2):**

- Header: "Meals" + `Badge` showing count (`4 today`)
- List uses `divide-y divide-border/50` — no individual card wrappers
- Each row:
  - Image: 48x48 rounded, `object-cover`
  - Name: `font-medium`, completed meals get `line-through opacity-50`
  - Type: small `Badge` (Breakfast/Lunch/Dinner/Snack)
  - Actions: Check, Repeat, Bookmark — smaller than current (`size="icon"`)
- **Empty state:** Centered text "No meals planned for this day" + "Generate meal plan" button linking to `/dashboard/meal-plans`
- **Motion:** Staggered mount animation using `motion.ul` as parent with `variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 60 } } }`. Each `motion.li` child has `variants = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }`.

**Exercise tile (col-span-1):**

- Header: "Exercise" + `Dumbbell` icon
- Compact list, same `divide-y` pattern
- Each row: icon (HeartPulse/Dumbbell), name, duration, toggle
- Progress bar: thinner (`h-1.5`), integrated below the row
- **Empty state:** "No exercise planned" + "Browse exercises" CTA linking to `/dashboard/exercise-plans`

### Section 4: Weekly Progress Chart

**Full-width**, no card wrapper.

- Header row: "Weekly Progress" + adherence percentage badge
- **Adherence formula:** `adherence = (number of days this week where caloriesConsumed >= 80% of that day's totalCalories) / 7 * 100`, rounded to nearest integer. Display as `72% adherence` in a `Badge`. If `weeklyData` has fewer than 7 days, use the available day count as denominator.
- Chart height: `h-56` (up from `h-40`)
- Y-axis: already hidden (`<YAxis hide />`) — no change needed
- Cleaner grid: `stroke-muted/20`, no vertical lines
- Legend: inline dots with labels below chart
- **Exercise data:** Currently hardcoded dummy array `[60, 65, 70, 68, 75, 78, 72]`. Add a `TODO` comment: `// TODO: Replace with real exercise data from API when available`. The chart component accepts `exerciseData` as a prop — when real data is available, pass it from the parent.

### Visual Design Rules

- **Accent color:** Amber/orange (existing brand). Semantic feedback uses opacity/intensity variants of amber, not different hues. Exception: over-consumption numbers use `text-rose-500` as an error state, not an accent.
- **Typography:** Space Grotesk for headings, Plus Jakarta Sans for body (existing fonts)
- **Shadows:** Diffusion shadow only on the top bar if sticky. No card shadows
- **Borders:** `border-border/50` for dividers, `border-border` for section boundaries
- **Spacing:** `gap-6` between sections, `p-6` inside bento tiles
- **Radius:** `rounded-xl` for interactive elements, `rounded-2xl` for bento tile backgrounds if used

### Motion & Micro-interactions

- **Calorie ring:** Animate `stroke-dashoffset` on mount (spring easing)
- **Meal list:** Staggered entrance, 60ms per item via framer-motion `staggerChildren`
- **Completion toggle:** Scale bounce on check (`scale-[0.98]` on active, spring back)
- **Progress panel:** Subtle fade-in on data load
- **All motion:** Use `motion/react` (already installed as `motion` v12)

### Component Changes

| Component                         | Change                                                       |
| --------------------------------- | ------------------------------------------------------------ |
| `DashboardHeader.tsx`             | Reduce heading size (`text-2xl`)                             |
| `page.tsx`                        | Complete rewrite of layout structure, compose top bar inline |
| `MealCard.tsx`                    | Simplify — remove MagicCard wrapper, make list-row style     |
| `ExerciseCard.tsx`                | Simplify — remove MagicCard wrapper, make compact            |
| `WeeklyProgressChart.tsx`         | Make taller, accept adherence prop                           |
| **NEW: `DailyProgressPanel.tsx`** | Calories ring + meals status + exercise summary              |

### Data Requirements

No new API calls needed. All data comes from existing `useDashboardData` hook:

- `data.stats.caloriesConsumedToday`, `data.stats.totalCaloriesToday`, `data.stats.caloriesRemaining`
- `data.stats.streakDays`
- `data.todayMeals` (with completion status)
- `data.weeklyData` for chart
- Exercise data still uses dummy data (known limitation)

### Dual-Fetch Loading Strategy

`DashboardHeader` fetches user data independently (`getUserByClerkId`). `page.tsx` fetches dashboard data (`useDashboardData`). These are independent:

- `DashboardHeader` shows "Good morning, ..." with its own loading state (`...` placeholder)
- `page.tsx` shows full-page skeleton until dashboard data loads
- No coordination needed — both render independently. The greeting appears first, then the rest of the page fades in.

### Mobile Behavior

- All sections stack to single column
- Progress panel: 3 rows instead of 3 columns, separated by `divide-y`
- Bento grid: meals full-width, exercise below it
- Date selector: `DateRangePicker` with chevrons + Today button (same as meal plans `MealPlanHeader`)
- Touch targets: minimum 44px

### Files Modified

1. `src/app/dashboard/page.tsx` — main layout rewrite
2. `src/components/dashboard/DashboardHeader.tsx` — smaller heading (`text-2xl`)
3. `src/components/dashboard/MealCard.tsx` — list-row variant
4. `src/components/dashboard/ExerciseCard.tsx` — compact variant
5. `src/components/dashboard/WeeklyProgressChart.tsx` — taller, accept adherence prop
6. `src/components/dashboard/DailyProgressPanel.tsx` — **NEW**

### Loading State

- Skeleton for progress panel: circular skeleton for ring (`rounded-full`), 2 text line skeletons per column
- Skeleton for meal rows: 3 rows of image + text placeholders
- Skeleton for exercise: 2 rows of icon + text placeholders
- Skeleton for chart: rectangular placeholder with shimmer

### Error State

- Inline error banner below top bar (same as current, but less intrusive)
- Single error state from `useDashboardData` — if it fails, show error banner. No per-section error granularity since the hook is a single data source.

### Known Issues in Current Code (Not Fixed in This PR)

1. **Weekly meal completion calculation:** `page.tsx:89-99` divides `caloriesConsumed / totalCaloriesToday` which uses today's total for all week days. This is semantically incorrect but is a data-layer issue. The chart will continue using this calculation until the API is fixed.
2. **Exercise data:** Hardcoded dummy data. No persistence.
3. **Time-based greeting:** Currently always says "Good morning" regardless of time of day. Not changing in this PR.
