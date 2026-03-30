import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays } from "date-fns";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import type { ViewMode } from "./types";
import { useMemo } from "react";

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
  const dayCount = preferencesLoading ? 7 : preferences.dayCount;

  const currentRange = useMemo(() => {
    return {
      from: currentDate,
      to: addDays(currentDate, dayCount - 1),
    };
  }, [currentDate, dayCount]);

  const handleRangeChange = (range: { from: Date; to: Date }, newDayCount?: number) => {
    if (newDayCount !== undefined && newDayCount !== dayCount) {
      updatePreferences({ dayCount: newDayCount });
    }
    onNavigate("date", range.from);
  };

  const handleDayCountChange = (count: number) => {
    updatePreferences({ dayCount: count });
  };

  const isCurrentRange = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const rangeEnd = addDays(currentDate, dayCount - 1);
    return today >= currentDate && today <= rangeEnd;
  };

  const formatRange = (date: Date, count: number) => {
    const endDate = addDays(date, count - 1);
    const start = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const end = endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${start} — ${end}`;
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
        {!isCurrentRange() && (
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
          dayCount={dayCount}
          onDayCountChange={handleDayCountChange}
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
          Multi-Day
        </button>
      </div>
    </div>
  );
}
