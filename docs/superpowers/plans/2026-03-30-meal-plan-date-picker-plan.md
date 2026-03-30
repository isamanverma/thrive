# Meal Plan Date Picker + User Preferences Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a Google Calendar-style date picker for meal plans and a user preferences system for storing settings like week start day.

**Architecture:** 
- Add UserPreference model to Prisma schema with weekStartDay and theme fields
- Create API routes for CRUD operations on user preferences
- Build a DateRangePicker component using shadcn Calendar + Popover
- Integrate into MealPlanHeader with custom range selection support

**Tech Stack:** Next.js, Prisma, shadcn/ui (calendar, popover, select, dropdown-menu), date-fns

---

## File Structure

### New Files to Create

1. `prisma/migrations/<timestamp>_add_user_preferences/migration.sql` - Database migration
2. `src/components/ui/date-range-picker.tsx` - New DateRangePicker component
3. `src/components/dashboard/meal-plans/WeekStartSelector.tsx` - Week start day selector
4. `src/hooks/useUserPreferences.ts` - Hook for user preferences
5. `src/app/api/user/preferences/route.ts` - API route for preferences

### Files to Modify

1. `prisma/schema.prisma` - Add UserPreference model
2. `src/app/api/user/preferences/route.ts` - Create if not exists
3. `src/components/dashboard/meal-plans/MealPlanHeader.tsx` - Use DateRangePicker
4. `src/components/dashboard/meal-plans/hooks/useMealPlanData.ts` - Support custom date ranges

---

## Task 1: Add shadcn components

**Files:** N/A

- [ ] **Step 1: Install shadcn components**

```bash
cd /Users/amankumarverma/Code/thrive
npx shadcn@latest add calendar popover select dropdown-menu input -y
```

Expected: Components added to src/components/ui/

---

## Task 2: Update Prisma Schema

**Files:**
- Modify: `prisma/schema.prisma:12-30`

- [ ] **Step 1: Add UserPreference model**

Add after User model:

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

- [ ] **Step 2: Add preferences relation to User model**

In User model, add:

```prisma
preferences UserPreference?
```

- [ ] **Step 3: Generate migration**

```bash
cd /Users/amankumarverma/Code/thrive
npx prisma migrate dev --name add_user_preferences
```

Expected: Migration created and applied

---

## Task 3: Create API Route for User Preferences

**Files:**
- Create: `src/app/api/user/preferences/route.ts`

- [ ] **Step 1: Create the API route**

```typescript
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let preferences = await prisma.userPreference.findUnique({
    where: { userId },
  });

  if (!preferences) {
    preferences = await prisma.userPreference.create({
      data: { userId },
    });
  }

  return NextResponse.json(preferences);
}

export async function PATCH(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { weekStartDay, theme } = body;

  const preferences = await prisma.userPreference.upsert({
    where: { userId },
    update: {
      ...(weekStartDay !== undefined && { weekStartDay }),
      ...(theme !== undefined && { theme }),
    },
    create: {
      userId,
      weekStartDay: weekStartDay ?? 1,
      theme: theme ?? "system",
    },
  });

  return NextResponse.json(preferences);
}
```

---

## Task 4: Create useUserPreferences Hook

**Files:**
- Create: `src/hooks/useUserPreferences.ts`

- [ ] **Step 1: Create the hook**

```typescript
import { useState, useEffect, useCallback } from "react";

interface UserPreferences {
  weekStartDay: number;
  theme: string;
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    weekStartDay: 1,
    theme: "system",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPreferences() {
      try {
        const res = await fetch("/api/user/preferences");
        if (res.ok) {
          const data = await res.json();
          setPreferences({
            weekStartDay: data.weekStartDay ?? 1,
            theme: data.theme ?? "system",
          });
        }
      } catch (error) {
        console.error("Failed to load preferences:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPreferences();
  }, []);

  const updatePreferences = useCallback(
    async (updates: Partial<UserPreferences>) => {
      try {
        const res = await fetch("/api/user/preferences", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        if (res.ok) {
          const data = await res.json();
          setPreferences({
            weekStartDay: data.weekStartDay ?? 1,
            theme: data.theme ?? "system",
          });
        }
      } catch (error) {
        console.error("Failed to update preferences:", error);
      }
    },
    []
  );

  return { preferences, isLoading, updatePreferences };
}
```

---

## Task 5: Create DateRangePicker Component

**Files:**
- Create: `src/components/ui/date-range-picker.tsx`

- [ ] **Step 1: Create the DateRangePicker component**

This is a complex component - see the full implementation in the spec. Key features:
- Popover trigger showing formatted date range
- Calendar grid with range selection
- Quick actions (Today, This Week, Last Week)
- Week start day selector in settings

```typescript
"use client";

import * as React from "react";
import { format, addDays, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  weekStartDay?: number;
  onWeekStartChange?: (day: number) => void;
}

export function DateRangePicker({
  value,
  onChange,
  weekStartDay = 1,
  onWeekStartChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRange, setSelectedRange] = React.useState<DateRange>(value);
  const [selectingEnd, setSelectingEnd] = React.useState(false);

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const formatRange = (range: DateRange) => {
    if (!range.from || !range.to) return "Select dates";
    return `${format(range.from, "MMM d")} — ${format(range.to, "MMM d, yyyy")}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (!selectingEnd) {
      setSelectedRange({ from: date, to: date });
      setSelectingEnd(true);
    } else {
      const newRange = {
        from: date < selectedRange.from ? date : selectedRange.from,
        to: date > selectedRange.from ? date : selectedRange.from,
      };
      setSelectedRange(newRange);
      setSelectingEnd(false);
    }
  };

  const isInRange = (date: Date) => {
    if (!selectedRange.from || !selectedRange.to) return false;
    return isWithinInterval(date, { start: selectedRange.from, end: selectedRange.to });
  };

  const handleQuickAction = (action: "today" | "thisWeek" | "lastWeek") => {
    const today = new Date();
    let newRange: DateRange;

    switch (action) {
      case "today":
        newRange = { from: today, to: today };
        break;
      case "thisWeek":
        newRange = {
          from: startOfWeek(today, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 }),
          to: endOfWeek(today, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 }),
        };
        break;
      case "lastWeek":
        const lastWeekStart = addDays(startOfWeek(today, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 }), -7);
        newRange = {
          from: lastWeekStart,
          to: addDays(lastWeekStart, 6),
        };
        break;
    }
    setSelectedRange(newRange);
  };

  const handleApply = () => {
    onChange(selectedRange);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatRange(value)}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-3 py-2">
            <span className="text-sm font-medium">Select dates</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  Week starts on
                </div>
                {weekDays.map((day, idx) => (
                  <DropdownMenuItem
                    key={day}
                    onClick={() => onWeekStartChange?.(idx)}
                    className={cn(weekStartDay === idx && "bg-accent")}
                  >
                    {day}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Calendar */}
          <div className="p-3">
            <Calendar
              mode="range"
              selected={{ from: selectedRange.from, to: selectedRange.to }}
              onSelect={(range) => {
                if (range?.from) setSelectedRange({ ...selectedRange, from: range.from });
                if (range?.to) setSelectedRange({ ...selectedRange, to: range.to });
              }}
              numberOfMonths={1}
              weekStartsOn={weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6}
            />
          </div>

          {/* Range inputs */}
          <div className="flex items-center gap-2 px-3 pb-2">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground">From</label>
              <Input
                type="date"
                value={selectedRange.from ? format(selectedRange.from, "yyyy-MM-dd") : ""}
                onChange={(e) =>
                  setSelectedRange({ ...selectedRange, from: new Date(e.target.value) })
                }
                className="h-8 text-xs"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground">To</label>
              <Input
                type="date"
                value={selectedRange.to ? format(selectedRange.to, "yyyy-MM-dd") : ""}
                onChange={(e) =>
                  setSelectedRange({ ...selectedRange, to: new Date(e.target.value) })
                }
                className="h-8 text-xs"
              />
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex items-center justify-between border-t px-3 py-2">
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => handleQuickAction("today")}>
                Today
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleQuickAction("thisWeek")}>
                This Week
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleQuickAction("lastWeek")}>
                Last Week
              </Button>
            </div>
            <Button size="sm" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

---

## Task 6: Update MealPlanHeader to Use DateRangePicker

**Files:**
- Modify: `src/components/dashboard/meal-plans/MealPlanHeader.tsx`

- [ ] **Step 1: Update imports and component**

Replace the current navigation with DateRangePicker:

```typescript
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useUserPreferences } from "@/hooks/useUserPreferences";
// ... existing imports

export function MealPlanHeader({
  viewMode,
  currentDate,
  onViewModeChange,
  onNavigate,
}: MealPlanHeaderProps) {
  const { preferences, updatePreferences } = useUserPreferences();
  
  // Calculate current date range
  const currentRange = React.useMemo(() => {
    const startOfWeek = new Date(currentDate);
    const mondayOffset = currentDate.getDay() === 0 ? -6 : 1 - currentDate.getDay();
    startOfWeek.setDate(currentDate.getDate() + mondayOffset);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return { from: startOfWeek, to: endOfWeek };
  }, [currentDate]);

  const handleRangeChange = (range: { from: Date; to: Date }) => {
    onNavigate("date", range.from);
  };

  const handleWeekStartChange = (day: number) => {
    updatePreferences({ weekStartDay: day });
  };

  return (
    <div className="relative flex items-center justify-between mb-6">
      {/* Left: DateRangePicker */}
      <DateRangePicker
        value={currentRange}
        onChange={handleRangeChange}
        weekStartDay={preferences.weekStartDay}
        onWeekStartChange={handleWeekStartChange}
      />

      {/* Right: Day/Week switch */}
      <div className="flex rounded-lg border border-border/60 overflow-hidden">
        {/* ... existing toggle code */}
      </div>
    </div>
  );
}
```

---

## Task 7: Fix DateRangePicker Imports

**Files:**
- Modify: `src/components/ui/date-range-picker.tsx`

- [ ] **Step 1: Add missing Input import**

In the imports section, add:

```typescript
import { Input } from "@/components/ui/input";
```

Note: Task 1 already adds input component, this is just for reference.

---

## Task 8: Update useMealPlanData for Custom Date Ranges

**Files:**
- Modify: `src/components/dashboard/meal-plans/hooks/useMealPlanData.ts:416-445`

- [ ] **Step 1: Update getTodayInCurrentWeek to accept weekStartDay**

The function should accept the user's weekStartDay preference:

```typescript
const getTodayInCurrentWeek = (weekStartDay: number = 1): number | null => {
  const today = new Date();
  const currentWeekStart = new Date(currentDate);
  const mondayOffset = currentDate.getDay() === 0 ? -6 : 1 - currentDate.getDay();
  currentWeekStart.setDate(currentDate.getDate() + mondayOffset);
  currentWeekStart.setHours(0, 0, 0, 0);

  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
  currentWeekEnd.setHours(23, 59, 59, 999);

  if (today >= currentWeekStart && today <= currentWeekEnd) {
    const dayIndex = (today.getDay() - weekStartDay + 7) % 7;
    return dayIndex;
  }
  return null;
};
```

- [ ] **Step 2: Update todayInCurrentWeek useMemo**

Ensure it passes the weekStartDay preference to getTodayInCurrentWeek. The preference should be loaded from useUserPreferences and passed through.

---

## Task 9: Update MealPlanHeader with WeekStartDay Support

**Files:**
- Modify: `src/components/dashboard/meal-plans/MealPlanHeader.tsx:457-465`

- [ ] **Step 1: Fix currentRange to use weekStartDay preference**

```typescript
// Calculate current date range
const currentRange = React.useMemo(() => {
  const startOfWeek = new Date(currentDate);
  const dayOfWeek = currentDate.getDay();
  const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  // Use preference or default to Monday
  const wsDay = preferences.weekStartDay ?? 1;
  const userOffset = (dayOfWeek - wsDay + 7) % 7;
  startOfWeek.setDate(currentDate.getDate() - userOffset);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return { from: startOfWeek, to: endOfWeek };
}, [currentDate, preferences.weekStartDay]);

- [ ] **Step 2: Include full Day/Week toggle code**

Replace the placeholder `/* ... existing toggle code */` with:

```typescript
<div className="flex rounded-lg border border-border/60 overflow-hidden">
  <button
    type="button"
    onClick={() => onViewModeChange("daily")}
    className={`px-4 py-1.5 text-xs font-medium transition-colors ${
      viewMode === "daily"
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`}
  >
    Day
  </button>
  <button
    type="button"
    onClick={() => onViewModeChange("weekly")}
    className={`px-4 py-1.5 text-xs font-medium transition-colors ${
      viewMode === "weekly"
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`}
  >
    Week
  </button>
</div>
```

---

## Task 10: Test the Integration

**Files:** N/A

- [ ] **Step 1: Start dev server**

```bash
cd /Users/amankumarverma/Code/thrive
npm run dev
```

- [ ] **Step 2: Navigate to meal plans**

Open http://localhost:3000/dashboard/meal-plans

- [ ] **Step 3: Test date picker**
- Click the date range button - popover should open
- Click two dates to select a range
- Click "Apply" - the view should update
- Click "Today" - should jump to current date
- Click "This Week" - should show current week
- Click settings gear - should show week start options
- Change week start - calendar should re-render

- [ ] **Step 4: Test persistence**
- Change week start day preference
- Refresh page - preference should persist

- [ ] **Step 5: Test custom range**
- Select a non-week-aligned range (e.g., Wednesday to Tuesday)
- Verify the meal plan shows that specific range

---

## Task 11: Commit

- [ ] **Step 1: Commit all changes**

```bash
git add -A
git commit -m "feat: add flexible date picker and user preferences

- Add UserPreference model to Prisma schema
- Create API route for user preferences CRUD
- Add useUserPreferences hook
- Create DateRangePicker component with:
  - Google Calendar-style popup
  - Custom range selection (any date to any date)
  - Quick actions (Today, This Week, Last Week)
  - Week start day selector
- Update MealPlanHeader to use DateRangePicker
- Persist weekStartDay preference to database"
```
