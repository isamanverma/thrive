"use client";

import { Card } from "@/components/ui/card";
import React from "react";

interface ShoppingListProps {
  items: string[];
  onViewFullList: () => void;
}

export function ShoppingList({ items, onViewFullList }: ShoppingListProps) {
  return (
    <section className="space-y-3 sm:space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
        Shopping List
      </h2>
      <Card className="p-4 sm:p-6 border-0 shadow-sm bg-white">
        <ul className="space-y-3 text-gray-700">
          {items.map((item, index) => (
            <li key={index} className="flex items-center text-sm sm:text-base">
              <span className="h-2 w-2 bg-green-600 rounded-full mr-3 flex-shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onViewFullList}
          className="mt-4 text-sm font-semibold text-green-600 hover:text-green-700 hover:underline transition-colors"
        >
          View Full List
        </button>
      </Card>
    </section>
  );
}
