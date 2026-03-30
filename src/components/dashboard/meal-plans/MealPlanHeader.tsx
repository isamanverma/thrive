import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, format } from "date-fns";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import type { ViewMode } from "./types";
import { useMemo, useCallback } from "react";

interface MealPlanHeaderProps {
  viewMode: ViewMode;
  currentDate: Date;
  dayCount: number;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigate: (direction: "prev" | "next" | "today" | "date", date?: Date, newDayCount?: number) => void;
}

export function MealPlanHeader({
  viewMode,
  currentDate,
  dayCount,
  onViewModeChange,
  onNavigate,
}: MealPlanHeaderProps) {
  const { updatePreferences } = useUserPreferences();
  const isDaily = viewMode === "daily";

  const currentRange = useMemo(() => {
    return {
      from: currentDate,
      to: addDays(currentDate, isDaily ? 0 : dayCount - 1),
    };
  }, [currentDate, dayCount, isDaily]);

  const handleRangeChange = useCallback((range: { from: Date; to: Date }, newDayCount: number) => {
    updatePreferences({ dayCount: newDayCount });
    onNavigate("date", range.from, newDayCount);
  }, [onNavigate, updatePreferences]);

  const isToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(currentDate);
    checkDate.setHours(0, 0, 0, 0);
    return today.getTime() === checkDate.getTime();
  };

  const navigateBy = isDaily ? 1 : dayCount;

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left: spacer */}
      <div className="w-[100px]" />

      {/* Center: Navigation + Date picker + Today */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate("date", addDays(currentDate, -navigateBy))}
          className="h-8 w-8"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <DateRangePicker
          value={currentRange}
          onChange={handleRangeChange}
          dayCount={isDaily ? 1 : dayCount}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate("date", addDays(currentDate, navigateBy))}
          className="h-8 w-8"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        {!isToday() && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("today")}
            className="text-xs font-medium h-8 ml-1"
          >
            Today
          </Button>
        )}
      </div>

      {/* Right: Day/Multi-Day switch */}
      <div className="flex rounded-lg border border-border/60 overflow-hidden">
        <button
          type="button"
          onClick={() => onViewModeChange("daily")}
          className={`px-4 py-1.5 text-xs font-medium transition-colors ${
            isDaily
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
            !isDaily
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
