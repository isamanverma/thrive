"use client";

import { Card, CardContent } from "@/components/ui/card";

import { Calendar } from "@/components/ui/calendar";
import React from "react";

interface CalendarSectionProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function CalendarSection({ date, setDate }: CalendarSectionProps) {
  return (
    <section className="space-y-3 sm:space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
        Upcoming / Weekly
      </h2>
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-3 sm:p-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="mx-auto [&_.rdp-day_button.rdp-day_selected]:bg-green-600 [&_.rdp-day_button.rdp-day_selected]:text-white [&_.rdp-day_button.rdp-day_today]:bg-green-50 [&_.rdp-day_button.rdp-day_today]:text-green-600 [&_.rdp-day_button:hover]:bg-green-100"
          />
        </CardContent>
      </Card>
    </section>
  );
}
