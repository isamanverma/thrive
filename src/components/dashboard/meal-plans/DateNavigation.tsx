import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ViewMode } from "./types";
import { useState, useRef, useEffect } from "react";

interface DateNavigationProps {
  viewMode: ViewMode;
  currentDate: Date;
  onNavigate: (direction: "prev" | "next" | "today" | "date", date?: Date) => void;
  onGoToToday?: () => void;
}

export function DateNavigation({
  viewMode,
  currentDate,
  onNavigate,
  onGoToToday,
}: DateNavigationProps) {
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

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

  const isCurrentWeek = () => {
    const today = new Date();
    const currentWeekStart = new Date(currentDate);
    const mondayOffset = currentDate.getDay() === 0 ? -6 : 1 - currentDate.getDay();
    currentWeekStart.setDate(currentDate.getDate() + mondayOffset);
    currentWeekStart.setHours(0, 0, 0, 0);

    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
    currentWeekEnd.setHours(23, 59, 59, 999);

    return today >= currentWeekStart && today <= currentWeekEnd;
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
    const dayOfWeek = newDate.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    newDate.setDate(newDate.getDate() + mondayOffset);
    onNavigate("date", newDate);
    setShowMonthPicker(false);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        {!isCurrentWeek() && onGoToToday && (
          <Button
            variant="outline"
            size="sm"
            onClick={onGoToToday}
            className="text-xs font-medium"
          >
            Today
          </Button>
        )}
        <div className="relative" ref={pickerRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMonthPicker(!showMonthPicker)}
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            <CalendarIcon className="w-4 h-4" />
            {getCurrentMonthYear()}
          </Button>
          {showMonthPicker && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-popover border border-border rounded-lg shadow-lg p-4 min-w-[280px]">
              <div className="grid grid-cols-4 gap-2">
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

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate("prev")}
          className="h-8 w-8"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate("next")}
          className="h-8 w-8"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
