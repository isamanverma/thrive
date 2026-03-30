# Meal Plan Date Picker + User Preferences Design

## Overview

Implement a flexible, Google Calendar-style date picker for meal plans, plus a user preferences system to store settings like week start day.

## Goals

1. Allow users to navigate to any specific date/week
2. Support custom date range selection (e.g., Wed → Tue)
3. Allow users to set their preferred week start day
4. Persist preferences to database

---

## Part 1: User Preferences System

### Database Schema

Add to `prisma/schema.prisma`:

```prisma
model UserPreference {
  id           String   @id @default(uuid())
  userId       String   @unique
  weekStartDay Int      @default(1)  // 0=Sunday, 1=Monday, etc.
  theme        String   @default("system")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([userId])
}
```

Update User model:
```prisma
model User {
  // ... existing fields
  preferences UserPreference?
}
```

### API Routes

- `GET /api/user/preferences` - Get current user's preferences
- `PATCH /api/user/preferences` - Update preferences

### Hook

`useUserPreferences()` - React hook to load/save preferences with caching.

---

## Part 2: Date Range Picker Component

### UI Layout

```
┌─────────────────────────────────────────────────────┐
│  [Calendar Icon] Mar 24 — Mar 30, 2025    [▼]      │  ← Trigger button
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│  ◀ March 2025 ▶                      [⚙️ Settings] │  ← Header with nav
│  ┌─────────────────────────────────────────────┐   │
│  │ Mon  Tue  Wed  Thu  Fri  Sat  Sun          │   │
│  │  24   25   26   27   28   1    2           │   │
│  │  31   1    2    3    4    5    6           │   │  ← Calendar grid
│  │  7    8    9   10   11   12   13          │   │
│  │  ...                                     │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ From: [Mar 24 ▼]  To: [Mar 30 ▼]          │   │  ← Range inputs
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ─────────────────────────────────────────────────  │
│  [Today] [This Week] [Last Week]     [Apply]       │  ← Quick actions
└─────────────────────────────────────────────────────┘
```

### Features

1. **Trigger Button**
   - Shows formatted date range (e.g., "Mar 24 — Mar 30, 2025")
   - Calendar icon prefix
   - Opens popover on click

2. **Month Navigation**
   - Chevron buttons (◀ ▶) to go prev/next month
   - Click month/year text to open month picker dropdown

3. **Calendar Grid**
   - Shows days based on user's `weekStartDay` preference
   - Highlighted: current day (ring), selected range (background)
   - Click first date → click second date = range selected

4. **Range Inputs**
   - Two date inputs showing selected start/end
   - Can manually edit or use calendar picker

5. **Quick Actions Footer**
   - "Today" - jumps to current date
   - "This Week" - selects current week
   - "Last Week" - selects previous week
   - "Apply" button - confirms selection and closes

6. **Settings Gear (⚙️)**
   - Opens week start day selector dropdown
   - Options: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday

### Props Interface

```typescript
interface DateRangePickerProps {
  value: { from: Date; to: Date };
  onChange: (range: { from: Date; to: Date }) => void;
  minDate?: Date;
  maxDate?: Date;
  weekStartDay?: number; // 0-6, from preferences
  placeholder?: string;
}
```

---

## Part 3: Integration with Meal Plan

### Update MealPlanHeader.tsx

- Replace custom DateNavigation with DateRangePicker
- Pass current date range as value
- Handle onChange to navigate to selected week

### Update useMealPlanData.ts

- Accept custom date ranges (not just week-aligned)
- Adjust week calculations based on user's weekStartDay preference

---

## Acceptance Criteria

1. ✅ User can click trigger to open date picker popover
2. ✅ Calendar displays with correct week start day
3. ✅ User can select any date as start, any date as end
4. ✅ Selected range is visually highlighted
5. ✅ Quick actions work: Today, This Week, Last Week
6. ✅ Settings gear allows changing week start day
7. ✅ Week start preference persists after page reload
8. ✅ Date picker works in both weekly and daily view modes

---

## Dependencies

- `@shadcn/ui/calendar`
- `@shadcn/ui/popover`
- `@shadcn/ui/select`
- `@shadcn/ui/dropdown-menu`
- `date-fns` (for date manipulation - already in project)
