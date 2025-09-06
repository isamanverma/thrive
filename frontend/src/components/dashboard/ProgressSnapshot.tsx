"use client";

import { Card } from "@/components/ui/card";
import React from "react";

interface ProgressSnapshotProps {
  streak: number;
  consistency: number;
  lastNote: string;
}

export function ProgressSnapshot({
  streak,
  consistency,
  lastNote,
}: ProgressSnapshotProps) {
  return (
    <section className="space-y-3 sm:space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
        Progress Snapshot
      </h2>
      <Card className="p-4 sm:p-6 space-y-4 border-0 shadow-sm bg-white">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-green-600">
              {streak}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">Day Streak</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-green-600">
              {consistency}%
            </p>
            <p className="text-xs sm:text-sm text-gray-500">Consistency</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-semibold text-gray-700">
            Last Logged Note:
          </p>
          <p className="text-xs sm:text-sm text-gray-600 bg-green-50 p-3 rounded-lg leading-relaxed">
            &quot;{lastNote}&quot;
          </p>
        </div>
      </Card>
    </section>
  );
}
