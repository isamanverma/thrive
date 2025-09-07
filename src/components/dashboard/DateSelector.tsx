"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface DateSelectorProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

export function DateSelector({
  selectedDate = new Date(),
  onDateChange,
}: DateSelectorProps) {
  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    getWeekStart(selectedDate)
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const currentWeek = getWeekDates(currentWeekStart);

  // Update week when selected date changes
  useEffect(() => {
    const newWeekStart = getWeekStart(selectedDate);
    if (newWeekStart.getTime() !== currentWeekStart.getTime()) {
      setCurrentWeekStart(newWeekStart);
    }
  }, [selectedDate, currentWeekStart]);

  const formatShortDay = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isTodayInCurrentWeek = () => {
    return currentWeek.some((date) => isToday(date));
  };

  const navigateToToday = () => {
    const todayWeekStart = getWeekStart(today);
    setCurrentWeekStart(todayWeekStart);
    onDateChange?.(today);
  };

  function getWeekStart(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day;
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    return start;
  }

  function getWeekDates(weekStart: Date): Date[] {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(
      currentWeekStart.getDate() + (direction === "next" ? 7 : -7)
    );
    setCurrentWeekStart(newWeekStart);

    // If navigating to a week that contains today, select today
    const newWeek = getWeekDates(newWeekStart);
    const todayInNewWeek = newWeek.find((date) => isToday(date));
    if (todayInNewWeek) {
      onDateChange?.(today);
    } else {
      // Otherwise select the same day of the week as currently selected
      const dayOfWeek = selectedDate.getDay();
      const newSelectedDate = new Date(newWeekStart);
      newSelectedDate.setDate(newWeekStart.getDate() + dayOfWeek);
      onDateChange?.(newSelectedDate);
    }
  };

  const handleDateSelection = (date: Date) => {
    onDateChange?.(date);
    // Close mobile expansion after selection
    setIsMobileExpanded(false);
  };

  return (
    <>
      {/* Desktop Version - Hover-based expandable */}
      <div
        className="hidden md:flex bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 mx-auto max-w-fit transition-all duration-300 hover:shadow-md hover:bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center px-3 py-2">
          {/* Header - always visible */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateWeek("prev")}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors opacity-60 hover:opacity-100"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>

            <div className="text-sm font-medium text-gray-700 min-w-[80px] text-center">
              {isToday(selectedDate) ? (
                <button
                  onClick={navigateToToday}
                  className="hover:text-green-600 transition-colors font-semibold"
                >
                  Today
                </button>
              ) : (
                selectedDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              )}
            </div>

            <button
              onClick={() => navigateWeek("next")}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors opacity-60 hover:opacity-100"
            >
              <ChevronRight className="h-3 w-3" />
            </button>

            {/* Always visible Today button when not in current week */}
            {!isTodayInCurrentWeek() && (
              <>
                <div className="w-px h-4 bg-gray-200 mx-2"></div>
                <button
                  onClick={navigateToToday}
                  className="text-xs text-green-600 hover:text-green-700 font-medium px-2 py-1 rounded hover:bg-green-50 transition-colors"
                >
                  Today
                </button>
              </>
            )}
          </div>

          {/* Expandable calendar - only on hover */}
          <div
            className={`
            flex items-center gap-1 ml-2 transition-all duration-300 ease-out overflow-hidden
            ${isHovered ? "max-w-xs opacity-100" : "max-w-0 opacity-0"}
          `}
          >
            <div className="w-px h-4 bg-gray-200 mx-1"></div>
            {currentWeek.map((date, index) => {
              const todayDate = isToday(date);
              const selectedDateMatch = isSelected(date);

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelection(date)}
                  className={`
                    flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all duration-150 min-w-[32px] text-xs
                    ${
                      selectedDateMatch && todayDate
                        ? "bg-green-600 text-white shadow-sm"
                        : selectedDateMatch
                          ? "bg-blue-600 text-white shadow-sm"
                          : todayDate
                            ? "bg-green-100 text-green-700"
                            : "hover:bg-gray-100 text-gray-600"
                    }
                  `}
                >
                  <span
                    className={`text-[10px] font-medium ${
                      selectedDateMatch || todayDate
                        ? "opacity-80"
                        : "text-gray-400"
                    }`}
                  >
                    {formatShortDay(date).charAt(0)}
                  </span>
                  <span className="font-semibold text-xs">
                    {date.getDate()}
                  </span>
                  {todayDate && !selectedDateMatch && (
                    <div className="w-0.5 h-0.5 bg-green-600 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Version - Touch-friendly */}
      <div className="md:hidden">
        {/* Compact Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateWeek("prev")}
              className="p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>

            <button
              onClick={() => setIsMobileExpanded(!isMobileExpanded)}
              className="flex-1 text-center py-2 px-4 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <div className="text-sm font-medium text-gray-700">
                {isToday(selectedDate) ? (
                  <span className="text-green-600 font-semibold">Today</span>
                ) : (
                  selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })
                )}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                Tap to {isMobileExpanded ? "close" : "choose date"}
              </div>
            </button>

            <button
              onClick={() => navigateWeek("next")}
              className="p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Today Button when not in current week */}
          {!isTodayInCurrentWeek() && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={navigateToToday}
                className="w-full text-sm text-green-600 hover:text-green-700 font-medium py-2 px-3 rounded-lg hover:bg-green-50 active:bg-green-100 transition-colors"
              >
                Go to Today
              </button>
            </div>
          )}
        </div>

        {/* Expandable Week View */}
        {isMobileExpanded && (
          <div className="mt-3 bg-white rounded-xl shadow-sm border border-gray-100 p-3 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-7 gap-1">
              {currentWeek.map((date, index) => {
                const todayDate = isToday(date);
                const selectedDateMatch = isSelected(date);

                return (
                  <button
                    key={index}
                    onClick={() => handleDateSelection(date)}
                    className={`
                      flex flex-col items-center gap-1 py-3 px-1 rounded-lg transition-all duration-150 active:scale-95
                      ${
                        selectedDateMatch && todayDate
                          ? "bg-green-600 text-white shadow-sm"
                          : selectedDateMatch
                            ? "bg-blue-600 text-white shadow-sm"
                            : todayDate
                              ? "bg-green-100 text-green-700"
                              : "hover:bg-gray-50 active:bg-gray-100 text-gray-600"
                      }
                    `}
                  >
                    <span
                      className={`text-xs font-medium ${
                        selectedDateMatch || todayDate
                          ? "opacity-80"
                          : "text-gray-400"
                      }`}
                    >
                      {formatShortDay(date).substring(0, 3)}
                    </span>
                    <span className="font-semibold text-sm">
                      {date.getDate()}
                    </span>
                    {todayDate && !selectedDateMatch && (
                      <div className="w-1 h-1 bg-green-600 rounded-full mt-0.5"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
