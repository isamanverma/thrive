"use client";

import * as React from "react";
import { format, differenceInDays, addDays } from "date-fns";
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
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const formatRange = (range: DateRange) => {
    if (!range.from || !range.to) return "Select dates";
    const days = differenceInDays(range.to, range.from) + 1;
    return `${format(range.from, "MMM d")} — ${format(range.to, "MMM d")} (${days} days)`;
  };

  const handleRangeSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range?.from) return;

    if (range.to) {
      // User completed selecting a range
      const days = differenceInDays(range.to, range.from) + 1;
      const clampedDays = Math.max(3, Math.min(7, days));
      const adjustedTo = addDays(range.from, clampedDays - 1);

      onChange({ from: range.from, to: adjustedTo }, clampedDays);
      setIsOpen(false);
    }
  };

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
          {/* Header */}
          <div className="px-3 py-2 border-b">
            <span className="text-sm font-medium">Select start and end date (3-7 days)</span>
          </div>

          {/* Calendar with range selection */}
          <Calendar
            mode="range"
            selected={{ from: value.from, to: value.to }}
            onSelect={handleRangeSelect}
            numberOfMonths={1}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
