"use client";

import * as React from "react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange, dayCount: number) => void;
  dayCount?: number;
  onDayCountChange?: (count: number) => void;
}

export function DateRangePicker({
  value,
  onChange,
  dayCount = 7,
  onDayCountChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDayCount, setSelectedDayCount] = React.useState(dayCount);

  // Sync with prop changes
  React.useEffect(() => {
    setSelectedDayCount(dayCount);
  }, [dayCount]);

  const formatRange = (range: DateRange) => {
    if (!range.from || !range.to) return "Select dates";
    return `${format(range.from, "MMM d")} — ${format(range.to, "MMM d, yyyy")}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    const newRange = {
      from: date,
      to: addDays(date, selectedDayCount - 1),
    };
    onChange(newRange, selectedDayCount);
    setIsOpen(false);
  };

  const handleQuickAction = (action: "today" | "tomorrow") => {
    const today = new Date();
    const start = action === "tomorrow" ? addDays(today, 1) : today;
    const newRange = {
      from: start,
      to: addDays(start, selectedDayCount - 1),
    };
    onChange(newRange, selectedDayCount);
    setIsOpen(false);
  };

  const handleDayCountSelect = (count: number) => {
    setSelectedDayCount(count);
    onDayCountChange?.(count);
    if (value.from) {
      const newRange = {
        from: value.from,
        to: addDays(value.from, count - 1),
      };
      onChange(newRange, count);
    }
  };

  const dayOptions = [3, 4, 5, 6, 7];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-center text-center font-normal gap-2">
          <CalendarIcon className="h-4 w-4" />
          {formatRange(value)}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <div className="flex flex-col">
          {/* Day count selector */}
          <div className="flex items-center justify-center gap-1 border-b px-3 py-2">
            {dayOptions.map((count) => (
              <Button
                key={count}
                variant={selectedDayCount === count ? "default" : "ghost"}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => handleDayCountSelect(count)}
              >
                {count}D
              </Button>
            ))}
          </div>

          {/* Calendar */}
          <Calendar
            mode="single"
            selected={value.from}
            onSelect={handleDateSelect}
            numberOfMonths={1}
          />

          {/* Quick actions */}
          <div className="flex gap-1 border-t px-3 py-2">
            <Button variant="ghost" size="sm" onClick={() => handleQuickAction("today")}>
              Today
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleQuickAction("tomorrow")}>
              Tomorrow
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
