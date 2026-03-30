"use client";

import * as React from "react";
import { format, addDays, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

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
  const [selectingEnd, setSelectingEnd] = React.useState(false);

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const formatRange = (range: DateRange) => {
    if (!range.from || !range.to) return "Select dates";
    return `${format(range.from, "MMM d")} — ${format(range.to, "MMM d, yyyy")}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (!selectingEnd) {
      setSelectedRange({ from: date, to: date });
      setSelectingEnd(true);
    } else {
      const newRange = {
        from: date < selectedRange.from ? date : selectedRange.from,
        to: date > selectedRange.from ? date : selectedRange.from,
      };
      setSelectedRange(newRange);
      setSelectingEnd(false);
    }
  };

  const isInRange = (date: Date) => {
    if (!selectedRange.from || !selectedRange.to) return false;
    return isWithinInterval(date, { start: selectedRange.from, end: selectedRange.to });
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
  };

  const handleApply = () => {
    onChange(selectedRange);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatRange(value)}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-3 py-2">
            <span className="text-sm font-medium">Select dates</span>
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
          <div className="p-3">
            <Calendar
              mode="range"
              selected={{ from: selectedRange.from, to: selectedRange.to }}
              onSelect={(range) => {
                if (range?.from) setSelectedRange({ ...selectedRange, from: range.from });
                if (range?.to) setSelectedRange({ ...selectedRange, to: range.to });
              }}
              numberOfMonths={1}
              weekStartsOn={weekStartDay as 0 | 1 | 2 | 3 | 4 | 5 | 6}
            />
          </div>

          {/* Range inputs */}
          <div className="flex items-center gap-2 px-3 pb-2">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground">From</label>
              <Input
                type="date"
                value={selectedRange.from ? format(selectedRange.from, "yyyy-MM-dd") : ""}
                onChange={(e) =>
                  setSelectedRange({ ...selectedRange, from: new Date(e.target.value) })
                }
                className="h-8 text-xs"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground">To</label>
              <Input
                type="date"
                value={selectedRange.to ? format(selectedRange.to, "yyyy-MM-dd") : ""}
                onChange={(e) =>
                  setSelectedRange({ ...selectedRange, to: new Date(e.target.value) })
                }
                className="h-8 text-xs"
              />
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex items-center justify-between border-t px-3 py-2">
            <div className="flex gap-1">
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
            <Button size="sm" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
