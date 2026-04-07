"use client";

import * as React from "react";
import {
  format,
  differenceInDays,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth,
  isToday,
  addMonths,
  min,
  max,
} from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange, dayCount: number) => void;
  dayCount?: number;
}

function isSameDate(a: Date, b: Date) {
  return isSameDay(a, b);
}

function isDateInRange(date: Date, from: Date, to: Date) {
  const d = date.getTime();
  const f = from.getTime();
  const t = to.getTime();
  return d >= Math.min(f, t) && d <= Math.max(f, t);
}

interface DragCalendarProps {
  value: DateRange;
  onSelect: (range: DateRange) => void;
  mode: "single" | "range";
}

function DragCalendar({ value, onSelect, mode }: DragCalendarProps) {
  const [displayMonth, setDisplayMonth] = React.useState(
    () => new Date(value.from),
  );
  const [dragStart, setDragStart] = React.useState<Date | null>(null);
  const [dragHover, setDragHover] = React.useState<Date | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const onSelectRef = React.useRef(onSelect);
  onSelectRef.current = onSelect;

  React.useEffect(() => {
    if (!isSameMonth(displayMonth, value.from)) {
      setDisplayMonth(new Date(value.from));
    }
  }, [value.from]);

  React.useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseUp = () => {
      if (dragStart && dragHover) {
        const from = min([dragStart, dragHover]);
        const to = max([dragStart, dragHover]);
        onSelectRef.current({ from, to });
      }
      setDragStart(null);
      setDragHover(null);
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging, dragStart, dragHover]);

  const handleDayMouseDown = (date: Date, e: React.MouseEvent) => {
    e.preventDefault();
    setDragStart(date);
    setDragHover(date);
    setIsDragging(true);
  };

  const handleDayMouseEnter = (date: Date) => {
    if (isDragging) {
      setDragHover(date);
    }
  };

  const handleDayMouseUp = (date: Date) => {
    if (isDragging && dragStart) {
      const from = min([dragStart, date]);
      const to = max([dragStart, date]);
      onSelect({ from, to });
      setDragStart(null);
      setDragHover(null);
      setIsDragging(false);
    }
  };

  const monthStart = startOfMonth(displayMonth);
  const gridStart = startOfWeek(monthStart);
  const monthEnd = endOfMonth(displayMonth);
  const gridEnd = endOfWeek(monthEnd);

  const weeks: Date[][] = [];
  let current = gridStart;
  while (current <= gridEnd) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current = addDays(current, 1);
    }
    weeks.push(week);
  }

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getRangeInfo = (date: Date) => {
    let from: Date | null = null;
    let to: Date | null = null;

    if (isDragging && dragStart && dragHover) {
      from = min([dragStart, dragHover]);
      to = max([dragStart, dragHover]);
    } else if (value.from && value.to) {
      from = value.from;
      to = value.to;
    }

    if (!from || !to)
      return {
        isRangeStart: false,
        isRangeMiddle: false,
        isRangeEnd: false,
        inRange: false,
      };

    const inRange = isDateInRange(date, from, to);
    const isRangeStart = isSameDate(date, from);
    const isRangeEnd = isSameDate(date, to);
    const isRangeMiddle = inRange && !isRangeStart && !isRangeEnd;

    return { isRangeStart, isRangeMiddle, isRangeEnd, inRange };
  };

  const isSingleDayRange = () => {
    let from: Date | null = null;
    let to: Date | null = null;

    if (isDragging && dragStart && dragHover) {
      from = min([dragStart, dragHover]);
      to = max([dragStart, dragHover]);
    } else if (value.from && value.to) {
      from = value.from;
      to = value.to;
    }

    return from && to && isSameDate(from, to);
  };

  return (
    <div className="p-3 w-[280px]" style={{ userSelect: "none" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => setDisplayMonth(addMonths(displayMonth, -1))}
          className="inline-flex items-center justify-center rounded-md w-8 h-8 hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <IconChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-sm font-semibold">
          {format(displayMonth, "MMMM yyyy")}
        </div>
        <button
          type="button"
          onClick={() => setDisplayMonth(addMonths(displayMonth, 1))}
          className="inline-flex items-center justify-center rounded-md w-8 h-8 hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <IconChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((name) => (
          <div
            key={name}
            className="text-[0.75rem] font-normal text-muted-foreground text-center"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Weeks */}
      <div className="space-y-0.5">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7">
            {week.map((date, di) => {
              const outside = !isSameMonth(date, displayMonth);
              const todayFlag = isToday(date);
              const { isRangeStart, isRangeMiddle, isRangeEnd, inRange } =
                getRangeInfo(date);
              const singleDay = isSingleDayRange();

              // Check if this cell is at the edge of a row for proper rounding
              const isFirstInRow = di === 0;
              const isLastInRow = di === 6;

              // Check if the adjacent cell in the same week is also in range
              const prevInRange =
                di > 0 &&
                isDateInRange(
                  week[di - 1],
                  dragStart || value.from,
                  dragHover || value.to,
                );
              const nextInRange =
                di < 6 &&
                isDateInRange(
                  week[di + 1],
                  dragStart || value.from,
                  dragHover || value.to,
                );

              let cellClass = cn(
                "relative flex items-center justify-center w-8 h-8 text-sm transition-colors",
                "cursor-pointer",
              );

              if (mode === "single") {
                cellClass = cn(
                  cellClass,
                  "rounded-full",
                  outside && "text-muted-foreground opacity-50",
                  todayFlag &&
                    !isSameDate(date, value.from) &&
                    "bg-accent text-accent-foreground font-semibold",
                  isSameDate(date, value.from) &&
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  !isSameDate(date, value.from) &&
                    "hover:bg-accent hover:text-accent-foreground",
                );
              } else {
                if (inRange && !singleDay) {
                  // Range styling with connecting backgrounds
                  const isStartEdge = isRangeStart && !isRangeEnd;
                  const isEndEdge = isRangeEnd && !isRangeStart;
                  const isBoth = isRangeStart && isRangeEnd;
                  const isMiddle = isRangeMiddle;

                  if (isBoth) {
                    cellClass = cn(
                      cellClass,
                      "z-10 rounded-full bg-primary text-primary-foreground",
                    );
                  } else if (isStartEdge) {
                    cellClass = cn(
                      cellClass,
                      "z-10 text-primary-foreground",
                      isFirstInRow || !prevInRange
                        ? "rounded-l-full bg-primary"
                        : "bg-primary",
                      "after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-primary",
                    );
                  } else if (isEndEdge) {
                    cellClass = cn(
                      cellClass,
                      "z-10 text-primary-foreground",
                      isLastInRow || !nextInRange
                        ? "rounded-r-full bg-primary"
                        : "bg-primary",
                      "after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-primary",
                    );
                  } else if (isMiddle) {
                    cellClass = cn(
                      cellClass,
                      "bg-primary/10 text-foreground",
                      "after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-primary/10",
                      "after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-primary/10",
                    );
                  }
                } else if (isRangeStart && isRangeEnd) {
                  // Single day selection in range mode
                  cellClass = cn(
                    cellClass,
                    "z-10 rounded-full bg-primary text-primary-foreground",
                  );
                } else {
                  // Not in range
                  cellClass = cn(
                    cellClass,
                    "rounded-full",
                    outside && "text-muted-foreground opacity-50",
                    todayFlag &&
                      "bg-accent text-accent-foreground font-semibold",
                    "hover:bg-accent hover:text-accent-foreground",
                  );
                }
              }

              return (
                <div
                  key={di}
                  className="relative flex items-center justify-center"
                >
                  <button
                    type="button"
                    tabIndex={-1}
                    className={cellClass}
                    onMouseDown={(e) => handleDayMouseDown(date, e)}
                    onMouseEnter={() => handleDayMouseEnter(date)}
                    onMouseUp={() => handleDayMouseUp(date)}
                  >
                    <span className="relative z-10">{format(date, "d")}</span>
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DateRangePicker({
  value,
  onChange,
  dayCount = 7,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isDaily = dayCount === 1;

  const formatDisplay = (range: DateRange) => {
    if (!range.from) return "Select date";
    if (isDaily) {
      return format(range.from, "EEEE, MMM d");
    }
    const days = differenceInDays(range.to, range.from) + 1;
    return `${format(range.from, "MMM d")} — ${format(range.to, "MMM d")} (${days} days)`;
  };

  const handleSingleDateSelect = (range: DateRange) => {
    if (!range?.from) return;
    onChange({ from: range.from, to: range.from }, 1);
    setIsOpen(false);
  };

  const handleRangeSelect = (range: DateRange) => {
    if (!range?.from) return;
    const days = differenceInDays(range.to, range.from) + 1;
    const clampedDays = Math.max(3, Math.min(7, days));
    const adjustedTo = addDays(range.from, clampedDays - 1);
    onChange({ from: range.from, to: adjustedTo }, clampedDays);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-center text-center font-normal gap-2"
        >
          <CalendarIcon className="h-4 w-4" />
          {formatDisplay(value)}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <div className="flex flex-col">
          {!isDaily && (
            <div className="px-3 py-2 border-b">
              <span className="text-sm font-medium">
                Drag to select range (3-7 days)
              </span>
            </div>
          )}

          {isDaily ? (
            <DragCalendar
              value={{ from: value.from, to: value.from }}
              onSelect={handleSingleDateSelect}
              mode="single"
            />
          ) : (
            <DragCalendar
              value={value}
              onSelect={handleRangeSelect}
              mode="range"
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
