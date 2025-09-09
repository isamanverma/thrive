import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ViewMode } from "./types";

interface DateNavigationProps {
  viewMode: ViewMode;
  currentDate: Date;
  onNavigate: (direction: "prev" | "next") => void;
}

export function DateNavigation({
  viewMode,
  currentDate,
  onNavigate,
}: DateNavigationProps) {
  const formatWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return `${startOfWeek.toLocaleDateString("en-US", { month: "long", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;
  };

  const formatDayDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <Button variant="ghost" size="sm" onClick={() => onNavigate("prev")}>
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <h2 className="text-lg font-medium text-gray-900">
        {viewMode === "weekly"
          ? formatWeekRange(currentDate)
          : formatDayDate(currentDate)}
      </h2>
      <Button variant="ghost" size="sm" onClick={() => onNavigate("next")}>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
