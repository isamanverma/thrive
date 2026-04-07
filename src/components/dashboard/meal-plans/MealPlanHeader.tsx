import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, format, startOfWeek } from "date-fns";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import type { ViewMode } from "./types";
import { useMemo, useCallback } from "react";

interface MealPlanHeaderProps {
  viewMode: ViewMode;
  currentDate: Date;
  dayCount: number;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigate: (
    direction: "prev" | "next" | "today" | "date",
    date?: Date,
    newDayCount?: number,
  ) => void;
}

export function MealPlanHeader({
  viewMode,
  currentDate,
  dayCount,
  onViewModeChange,
  onNavigate,
}: MealPlanHeaderProps) {
  const isDaily = viewMode === "daily";

  // For multi-day, ensure dayCount is at least 3
  const multiDayCount = Math.max(3, dayCount);

  const currentRange = useMemo(() => {
    return {
      from: currentDate,
      to: addDays(currentDate, isDaily ? 0 : multiDayCount - 1),
    };
  }, [currentDate, multiDayCount, isDaily]);

  const handleRangeChange = useCallback(
    (range: { from: Date; to: Date }, newDayCount: number) => {
      onNavigate("date", range.from, newDayCount);
    },
    [onNavigate],
  );

  const handleSingleDateSelect = useCallback(
    (date: Date) => {
      onNavigate("date", date, 1);
    },
    [onNavigate],
  );

  const isToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(currentDate);
    checkDate.setHours(0, 0, 0, 0);
    return today.getTime() === checkDate.getTime();
  };

  const navigateBy = isDaily ? 1 : multiDayCount;

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
        {isDaily ? (
          <DateRangePicker
            value={currentRange}
            onChange={(range) => handleSingleDateSelect(range.from)}
            dayCount={1}
          />
        ) : (
          <DateRangePicker
            value={currentRange}
            onChange={handleRangeChange}
            dayCount={multiDayCount}
          />
        )}
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
          onClick={() => {
            onNavigate("today");
            onViewModeChange("daily");
          }}
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
          onClick={() => {
            const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
            onNavigate("date", monday, 7);
            onViewModeChange("weekly");
          }}
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
