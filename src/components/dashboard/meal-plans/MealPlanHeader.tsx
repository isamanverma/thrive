import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import type { ViewMode } from "./types";
import { useState, useRef, useEffect, useMemo } from "react";
import { startOfWeek, endOfWeek } from "date-fns";

interface MealPlanHeaderProps {
  viewMode: ViewMode;
  currentDate: Date;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigate: (direction: "prev" | "next" | "today" | "date", date?: Date) => void;
}

export function MealPlanHeader({
  viewMode,
  currentDate,
  onViewModeChange,
  onNavigate,
}: MealPlanHeaderProps) {
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const { preferences, isLoading: preferencesLoading, updatePreferences } = useUserPreferences();
  const weekStartDay = preferencesLoading ? 1 : preferences.weekStartDay;

  const currentRange = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
    const end = endOfWeek(currentDate, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
    return { from: start, to: end };
  }, [currentDate, weekStartDay]);

  const handleRangeChange = (range: { from: Date; to: Date }) => {
    onNavigate("date", range.from);
  };

  const handleWeekStartChange = (day: number) => {
    updatePreferences({ weekStartDay: day });
  };

  const isCurrentWeek = () => {
    const today = new Date();
    const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
    const currentWeekEnd = endOfWeek(currentDate, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 });

    return today >= currentWeekStart && today <= currentWeekEnd;
  };

  const formatWeekRange = (date: Date) => {
    const startOfWeekDate = startOfWeek(date, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
    const endOfWeekDate = endOfWeek(date, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 });

    const start = startOfWeekDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const end = endOfWeekDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const year = endOfWeekDate.getFullYear();

    return `${start} — ${end}, ${year}`;
  };

  const formatDayDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const getCurrentMonthYear = () => {
    return currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowMonthPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMonthSelect = (month: number, year: number) => {
    const newDate = new Date(year, month, 1);
    const firstDayOfMonth = startOfWeek(newDate, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
    onNavigate("date", firstDayOfMonth);
    setShowMonthPicker(false);
  };

  return (
    <div className="relative flex items-center justify-between mb-6">
      {/* Left: Today button + Month picker */}
      <div className="flex items-center gap-2">
        {!isCurrentWeek() && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("today")}
            className="text-xs font-medium h-8"
          >
            Today
          </Button>
        )}
        <div className="relative" ref={pickerRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMonthPicker(!showMonthPicker)}
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:bg-muted h-8"
          >
            <CalendarIcon className="w-4 h-4" />
            {getCurrentMonthYear()}
          </Button>
          {showMonthPicker && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-popover border border-border rounded-lg shadow-lg p-4 min-w-[240px]">
              <div className="grid grid-cols-4 gap-1">
                {months.map((month, idx) => (
                  <button
                    key={month}
                    onClick={() => handleMonthSelect(idx, currentDate.getFullYear())}
                    className={`px-2 py-1.5 text-xs rounded-md transition-colors ${
                      currentDate.getMonth() === idx
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {month.slice(0, 3)}
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <select
                  value={currentDate.getFullYear()}
                  onChange={(e) => handleMonthSelect(currentDate.getMonth(), parseInt(e.target.value))}
                  className="w-full px-2 py-1.5 text-xs bg-background border border-border rounded-md"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Navigation arrows + Date display */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate("prev")}
          className="h-8 w-8"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <DateRangePicker
          value={currentRange}
          onChange={handleRangeChange}
          weekStartDay={weekStartDay}
          onWeekStartChange={handleWeekStartChange}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate("next")}
          className="h-8 w-8"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Right: Day/Week switch */}
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
    </div>
  );
}
