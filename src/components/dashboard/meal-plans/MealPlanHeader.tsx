import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import type { ViewMode } from "./types";
import { useMemo } from "react";
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

  return (
    <div className="relative flex items-center justify-between mb-6">
      {/* Left: Today button */}
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
