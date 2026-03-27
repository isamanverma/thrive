# Viewport Prefetch + Loading States Plan

## Goal

Enable instant-feeling navigation across the entire app by ensuring:

1. All `<Link>` components prefetch their target pages when scrolled into viewport
2. Every route has a `loading.tsx` skeleton so navigations feel instant

## Current State

- **No `loading.tsx` files** exist anywhere — navigations show blank/spinner until data loads
- **All `<Link>` usage** already uses Next.js default `prefetch={true}` behavior, but some links are dynamically generated (sidebar items, recipe cards) and may need explicit attention
- **Pages are mostly client components** — so prefetching serves the JS bundle ahead of time

## Changes

### 1. Add `loading.tsx` to Every Route Group

Create skeleton loading UI for each route. Each `loading.tsx` mimics the layout shape of its page.

| Route                          | File to Create                                    | Skeleton Style                       |
| ------------------------------ | ------------------------------------------------- | ------------------------------------ |
| `/` (landing)                  | `src/app/loading.tsx`                             | Full-page hero + bento grid skeleton |
| `/dashboard`                   | `src/app/dashboard/loading.tsx`                   | Dashboard card grid skeleton         |
| `/dashboard/meal-plans`        | `src/app/dashboard/meal-plans/loading.tsx`        | Weekly grid skeleton                 |
| `/dashboard/recipe-explorer`   | `src/app/dashboard/recipe-explorer/loading.tsx`   | Recipe card grid skeleton            |
| `/dashboard/saved-recipes`     | `src/app/dashboard/saved-recipes/loading.tsx`     | Recipe card grid skeleton            |
| `/dashboard/exercise-plans`    | `src/app/dashboard/exercise-plans/loading.tsx`    | Exercise card grid skeleton          |
| `/dashboard/exercise-explorer` | `src/app/dashboard/exercise-explorer/loading.tsx` | Exercise card grid skeleton          |
| `/dashboard/saved-exercises`   | `src/app/dashboard/saved-exercises/loading.tsx`   | Exercise card grid skeleton          |
| `/dashboard/profile`           | `src/app/dashboard/profile/loading.tsx`           | Profile form skeleton                |
| `/dashboard/settings`          | `src/app/dashboard/settings/loading.tsx`          | Settings tabs skeleton               |
| `/dashboard/notifications`     | `src/app/dashboard/notifications/loading.tsx`     | Notification list skeleton           |
| `/dashboard/progress-tracker`  | `src/app/dashboard/progress-tracker/loading.tsx`  | Stats cards + charts skeleton        |
| `/recipe/[id]`                 | `src/app/recipe/[id]/loading.tsx`                 | Recipe detail skeleton               |
| `/onboarding`                  | `src/app/onboarding/loading.tsx`                  | Onboarding step skeleton             |

### 2. Ensure All Links Have Viewport Prefetch

Verify that all `<Link>` components across the app properly prefetch. The default `prefetch={true}` in Next.js 16 already prefetches when the link enters the viewport. Audit and fix:

- **`src/components/app-sidebar.tsx`** — sidebar links (already default prefetch, verify)
- **`src/app/page.tsx`** — landing page CTAs to `/sign-up`, `/sign-in`, `/dashboard`
- **`src/components/landing/MagneticButton.tsx`** — generic link wrapper
- **`src/components/recipe-search.tsx`** — recipe card links (opens in new tab, may need `prefetch={true}` explicitly)
- **`src/app/recipe/[id]/page.tsx`** — any internal links

### 3. Reuse Existing Skeleton Component

`src/components/ui/skeleton.tsx` already exists and is used in recipe pages, meal plans, and sidebar. Create a small `PageSkeleton` wrapper component that composes the existing `Skeleton` into common layout patterns (card grid, form, stats row) for DRY loading.tsx files.

## Implementation Order

1. Create shared skeleton primitives (`PageSkeleton`, `CardSkeleton`, `GridSkeleton`)
2. Add `loading.tsx` files — start with landing page root, then dashboard and all sub-routes
3. Audit all `<Link>` usage for prefetch correctness
4. Build and verify no compilation errors

## Verification

- `npm run build` — no TypeScript or compilation errors
- Manual test: navigate between dashboard pages — should show skeleton instantly, then content loads
- Check sidebar navigation — each item should feel instant with skeleton flash
