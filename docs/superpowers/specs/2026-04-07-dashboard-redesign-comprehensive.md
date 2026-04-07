# Dashboard Redesign - Comprehensive Fixes & Layout Improvement

**Date**: April 7, 2026  
**Status**: Approved  
**Timeline**: 1 week  
**Approach**: Modern Dashboard Redesign (Approach B)

## Problem Statement

The current dashboard has critical issues affecting user experience:

1. **Meal completion tracking doesn't persist** - UI toggles work but don't save to database
2. **Incorrect calorie calculations** - weekly chart uses today's target for all days, causing inaccurate progress tracking
3. **Exercise data is hardcoded** - dummy data instead of real user exercises
4. **Poor layout** - date picker alignment issues, unbalanced content distribution
5. **Missing database schema** - no completion fields on meals/exercises

## Solution Overview

Comprehensive redesign addressing all issues simultaneously through:

- Database schema enhancements for proper completion tracking
- Fixed calorie calculation system with accurate daily targets
- Clean half-and-half layout with centered date picker
- Real-time state management with optimistic UI updates

## 1. Database Schema Enhancement

### Current Schema Issues

- `MealPlanItem` has no `completed` field
- `ExercisePlanItem` doesn't exist (using dummy data)
- `Progress` table only tracks `caloriesConsumed`, not individual completions

### Required Schema Changes

#### 1.1 MealPlanItem Table Enhancement

```sql
ALTER TABLE "MealPlanItem" ADD COLUMN "completed" BOOLEAN NOT NULL DEFAULT false;
```

#### 1.2 New ExercisePlanItem Table

```sql
CREATE TABLE "ExercisePlanItem" (
  id TEXT NOT NULL PRIMARY KEY,
  userId TEXT NOT NULL,
  exerciseId TEXT NOT NULL,
  date DATE NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  sets INTEGER,
  reps INTEGER,
  duration INTEGER,
  createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ExercisePlanItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
```

#### 1.3 Progress Table Enhancement

```sql
ALTER TABLE "Progress" ADD COLUMN "mealsCompleted" INTEGER DEFAULT 0;
ALTER TABLE "Progress" ADD COLUMN "totalMeals" INTEGER DEFAULT 0;
ALTER TABLE "Progress" ADD COLUMN "exercisesCompleted" INTEGER DEFAULT 0;
ALTER TABLE "Progress" ADD COLUMN "totalExercises" INTEGER DEFAULT 0;
```

### 1.4 New API Endpoints

#### Meal Completion

- **PUT /api/meals/[id]/complete**
  - Toggle meal completion status
  - Update daily progress tracking
  - Recalculate calories consumed

#### Exercise Completion

- **PUT /api/exercises/[id]/complete**
  - Toggle exercise completion status
  - Update daily progress tracking

#### Exercise Data

- **GET /api/exercises**
  - Replace dummy exercise data
  - Return real user exercise plans

## 2. Accurate Calorie Calculation System

### Current Calculation Issues

#### 2.1 Weekly Chart Bug (Lines 100-110 in dashboard page)

```typescript
// WRONG: Uses today's target for all days
const weeklyMealCompletion = data?.weeklyData.map((d) =>
  d.caloriesConsumed !== null
    ? Math.min(
        100,
        Math.round(
          (d.caloriesConsumed / Math.max(data.stats.totalCaloriesToday, 1)) *
            100,
        ),
      )
    : 0,
) ?? [0, 0, 0, 0, 0, 0, 0];
```

#### 2.2 Adherence Calculation Bug (Lines 115-126)

Uses wrong daily targets for calculating 80% adherence threshold.

### Fixed Calculation System

#### 2.1 Daily Target Resolution

- Store daily calorie targets in Progress table
- Calculate targets based on user's goals and meal plans for that specific day
- Use correct daily targets for weekly progress calculations

#### 2.2 Real-time Calorie Updates

```typescript
// When meal completed: add calories
completedCalories += meal.recipe.calories;

// When meal uncompleted: subtract calories
completedCalories -= meal.recipe.calories;
```

#### 2.3 Enhanced resolveCalories Function

- Improve nutrition data extraction from recipe.nutrition
- Add fallback mechanisms for missing calorie data
- Proper error handling and logging

#### 2.4 Progress Tracking Enhancement

```typescript
interface DailyProgress {
  date: Date;
  caloriesTarget: number;
  caloriesConsumed: number;
  mealsCompleted: number;
  totalMeals: number;
  exercisesCompleted: number;
  totalExercises: number;
}
```

## 3. Clean Half-and-Half Layout Design

### Current Layout Issues

- Date picker extremely right-aligned
- Unbalanced content distribution
- Weekly progress chart taking unnecessary space
- Poor visual hierarchy

### New Layout Structure

#### 3.1 Top Section

- **DashboardHeader**: Left-aligned greeting
- **DateRangePicker**: Centered horizontally with navigation arrows
- **Streak/Today buttons**: Right side of date picker

#### 3.2 Daily Progress Panel (Keep)

- Maintain current 3-column design (Calories, Meals, Exercise)
- Update with accurate calculations
- Keep CalorieRing with motion animations

#### 3.3 Main Content: 50/50 Split

```
┌─────────────────┬─────────────────┐
│    MEALS        │    EXERCISES    │
│   (Left 50%)    │   (Right 50%)   │
│                 │                 │
│ ☐ Breakfast     │ ☐ Morning Run   │
│ ☑ Lunch         │ ☐ Strength      │
│ ☐ Dinner        │ ☑ Yoga          │
│ ☐ Snacks        │ ☐ Cardio        │
└─────────────────┴─────────────────┘
```

#### 3.4 Remove Components

- **WeeklyProgressChart** component entirely
- **Adherence calculation** logic (lines 114-126)
- **Weekly progress section** in layout (lines 305-329)

### 3.5 Visual Improvements

- Consistent spacing using design system tokens
- Better card styling with subtle shadows and hover states
- Clear completion states with checkmarks and progress indicators
- Responsive design: stacks vertically on mobile
- Improved typography hierarchy

## 4. Real-time State Management

### 4.1 Optimistic UI Updates

```typescript
// Immediate visual feedback
const toggleMeal = async (mealId: string) => {
  // Update UI immediately
  updateLocalState(mealId);

  try {
    // Persist to backend
    await fetch(`/api/meals/${mealId}/complete`, { method: "PUT" });
  } catch (error) {
    // Rollback on failure
    revertLocalState(mealId);
    showErrorToast();
  }
};
```

### 4.2 Progress Ring Updates

- Real-time calorie calculations as meals are completed
- Smooth animations for progress changes
- Update completion percentages instantly

### 4.3 Error Handling

- Toast notifications for API failures
- Automatic retry mechanisms
- Graceful degradation when offline

## 5. Component Architecture

### 5.1 Enhanced Dashboard Page

- Clean up data fetching logic
- Remove weekly progress chart integration
- Implement half-and-half layout
- Add optimistic state management

### 5.2 Updated MealCard Component

- Connect to real completion API
- Better visual feedback for completion states
- Calorie display improvements

### 5.3 New ExerciseCard Component

- Replace dummy data with real exercises
- Completion tracking integration
- Consistent styling with MealCard

### 5.4 Updated DailyProgressPanel

- Accurate meal/exercise completion counts
- Real-time calorie ring updates
- Better responsive behavior

## 6. Implementation Phases

### Phase 1: Database & API (Days 1-2)

1. Run database migrations for schema changes
2. Implement new API endpoints for completion tracking
3. Update existing API to return completion states
4. Add real exercise data endpoint

### Phase 2: Backend Logic (Days 2-3)

1. Fix calorie calculation bugs in dashboard API
2. Enhance resolveCalories function
3. Implement real-time progress tracking
4. Add proper error handling and validation

### Phase 3: Frontend Redesign (Days 3-5)

1. Update dashboard layout to half-and-half split
2. Remove weekly progress chart components
3. Implement optimistic UI state management
4. Enhance MealCard and create new ExerciseCard

### Phase 4: Integration & Testing (Days 5-7)

1. Connect frontend to new APIs
2. Test completion tracking persistence
3. Verify calorie calculations accuracy
4. Mobile responsiveness testing
5. Error handling and edge case testing

## 7. Success Criteria

### 7.1 Data Persistence

- [ ] Meal completions persist across page refreshes
- [ ] Exercise completions save and load correctly
- [ ] Daily progress tracking works accurately

### 7.2 Accurate Calculations

- [ ] Calorie calculations use correct daily targets
- [ ] Progress percentages reflect actual completion rates
- [ ] Real-time updates work without page refresh

### 7.3 Improved Layout

- [ ] Date picker centered horizontally
- [ ] Meals and exercises split evenly (50/50)
- [ ] Weekly progress chart removed
- [ ] Clean, balanced visual hierarchy
- [ ] Responsive design on all screen sizes

### 7.4 User Experience

- [ ] Immediate visual feedback on completion toggles
- [ ] Smooth animations and transitions
- [ ] Proper error handling with user notifications
- [ ] Fast performance with optimistic updates

## 8. Technical Considerations

### 8.1 Database Migration Strategy

- Use Prisma migrations for schema changes
- Ensure backward compatibility during deployment
- Plan for data backfill if needed

### 8.2 Performance Optimization

- Implement proper caching for dashboard data
- Optimize API queries with proper indexing
- Use React Query for efficient state management

### 8.3 Error Boundary Implementation

- Add error boundaries around dashboard components
- Graceful fallbacks for data loading failures
- Comprehensive logging for debugging

## 9. Future Considerations

### 9.1 Analytics Foundation

- Design schema to support future meaningful charts
- Track user engagement with completion features
- Prepare for advanced progress visualization

### 9.2 Scalability

- Ensure database schema can handle growing user base
- Design APIs for future feature extensions
- Consider caching strategies for high traffic

This comprehensive redesign addresses all identified issues while maintaining development velocity and setting up a solid foundation for future enhancements.
