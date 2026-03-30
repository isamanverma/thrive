"use client";

import * as React from "react";
import { format, addDays, startOfWeek, endOfWeek } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  weekStartDay?: number;
  onWeekStartChange?: (day: number) => void;
}

export function DateRangePicker({
  value,
  onChange,
  weekStartDay = 1,
  onWeekStartChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedRange, setSelectedRange] = React.useState<DateRange>(value);

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const formatRange = (range: DateRange) => {
    if (!range.from || !range.to) return "Select dates";
    return `${format(range.from, "MMM d")} — ${format(range.to, "MMM d, yyyy")}`;
  };

  const handleQuickAction = (action: "today" | "thisWeek" | "lastWeek") => {
    const today = new Date();
    let newRange: DateRange;

    switch (action) {
      case "today":
        newRange = { from: today, to: today };
        break;
      case "thisWeek":
        newRange = {
          from: startOfWeek(today, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 }),
          to: endOfWeek(today, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 }),
        };
        break;
      case "lastWeek":
        const lastWeekStart = addDays(startOfWeek(today, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 }), -7);
        newRange = {
          from: lastWeekStart,
          to: addDays(lastWeekStart, 6),
        };
        break;
    }
    setSelectedRange(newRange);
    onChange(newRange);
    setIsOpen(false);
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
          <div className="flex items-center justify-between border-b px-3 py-2">
            <span className="text-sm font-medium">Select week</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  Week starts on
                </div>
                {weekDays.map((day, idx) => (
                  <DropdownMenuItem
                    key={day}
                    onClick={() => onWeekStartChange?.(idx)}
                    className={cn(weekStartDay === idx && "bg-accent")}
                  >
                    {day}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Calendar */}
          <Calendar
            mode="range"
            selected={{ from: selectedRange.from, to: selectedRange.to }}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                const weekRange = {
                  from: startOfWeek(range.from, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 }),
                  to: endOfWeek(range.from, { weekStartsOn: weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6 }),
                };
                setSelectedRange(weekRange);
                onChange(weekRange);
                setIsOpen(false);
              }
            }}
            numberOfMonths={1}
            weekStartsOn={weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6}
          />

          {/* Quick actions */}
          <div className="flex gap-1 border-t px-3 py-2">
            <Button variant="ghost" size="sm" onClick={() => handleQuickAction("today")}>
              Today
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleQuickAction("thisWeek")}>
              This Week
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleQuickAction("lastWeek")}>
              Last Week
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
