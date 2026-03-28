import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ViewMode } from "./types";

interface MealPlanHeaderProps {
  viewMode: ViewMode;
  currentDate: Date;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export function MealPlanHeader({
  viewMode,
  currentDate,
  onViewModeChange,
  onNavigate,
}: MealPlanHeaderProps) {
  const formatWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const start = startOfWeek.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const end = endOfWeek.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const year = endOfWeek.getFullYear();

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
    <div className="relative flex items-center justify-center mb-6">
      {/* Date nav — centered */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          onClick={() => onNavigate("prev")}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground tracking-tight min-w-[240px] text-center">
          {viewMode === "weekly"
            ? formatWeekRange(currentDate)
            : formatDayDate(currentDate)}
        </h1>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          onClick={() => onNavigate("next")}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Day/Week switch — extreme right */}
      <div className="absolute right-0 flex rounded-lg border border-border/60 overflow-hidden">
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
