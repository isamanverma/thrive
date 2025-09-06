"use client";

import { Card } from "@/components/ui/card";
import React from "react";

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <section className="space-y-3 sm:space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
        Quick Actions
      </h2>
      <Card className="p-4 sm:p-6 border-0 shadow-sm bg-white">
        <div className="space-y-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-green-600 hover:bg-green-50 transition-all duration-200 text-left group"
            >
              <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-green-700">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </Card>
    </section>
  );
}
