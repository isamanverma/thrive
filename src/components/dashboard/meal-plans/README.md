# Meal Plans Components

This directory contains modular components for the meal planning feature, extracted from the original 1000+ line page component for better maintainability.

## Components Structure

### Core Components

- **`MealPlanHeader`** - Header with view toggle, regenerate button, and user avatar
- **`DateNavigation`** - Date navigation with previous/next buttons
- **`WeeklyStatsCard`** - Displays weekly nutrition statistics
- **`DailyStatsCard`** - Displays daily nutrition breakdown
- **`WeeklyMealGrid`** - Main weekly view with drag-and-drop functionality
- **`DailyMealGrid`** - Simple 4-column grid for daily view
- **`MealTypeRow`** - Individual rows for each meal type in weekly view

### Utilities

- **`types.ts`** - Shared TypeScript interfaces and types
- **`hooks/useMealPlanData.ts`** - Custom hook for state management and calculations
- **`index.ts`** - Barrel export for clean imports

## Usage

```tsx
import {
  MealPlanHeader,
  DateNavigation,
  WeeklyStatsCard,
  DailyStatsCard,
  WeeklyMealGrid,
  DailyMealGrid,
  useMealPlanData,
  type MealPlanItem,
} from "@/components/dashboard/meal-plans";
```

## Benefits of This Structure

1. **Maintainability** - Each component has a single responsibility
2. **Reusability** - Components can be reused across different pages
3. **Testability** - Smaller components are easier to unit test
4. **Performance** - Better tree-shaking and code splitting opportunities
5. **Readability** - Main page component reduced from 1000+ lines to ~100 lines

## State Management

The `useMealPlanData` hook centralizes:

- Meal plan data and weekly meals state
- Drag and drop state management
- Date navigation logic
- Weekly statistics calculations
- Sample meal data

## Type Safety

All components use TypeScript with proper interfaces defined in `types.ts` for:

- Meal plan items structure
- Weekly meals organization
- Statistics data
- Drag and drop state
- View modes and meal types
