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
    <section>
      <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
        Progress Snapshot
      </h2>
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{streak}</p>
            <p className="text-sm text-gray-500">Day Streak</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{consistency}%</p>
            <p className="text-sm text-gray-500">Consistency</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">
            Last Logged Note:
          </p>
          <p className="text-base text-gray-600 bg-gray-50 p-3 rounded-lg mt-1">
            &quot;{lastNote}&quot;
          </p>
        </div>
      </Card>
    </section>
  );
}
