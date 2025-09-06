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
    <section>
      <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
        Quick Actions
      </h2>
      <Card className="p-6 space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="w-full text-left bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center gap-3"
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </Card>
    </section>
  );
}
