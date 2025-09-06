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
    <section className="lg:col-span-1">
      <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
        Upcoming / Weekly
      </h2>
      <Card>
        <CardContent className="pt-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="mx-auto [&_.rdp-day_button.rdp-day_selected]:bg-green-600 [&_.rdp-day_button.rdp-day_selected]:text-white [&_.rdp-day_button.rdp-day_today]:bg-green-50 [&_.rdp-day_button.rdp-day_today]:text-green-600"
          />
        </CardContent>
      </Card>
    </section>
  );
}
