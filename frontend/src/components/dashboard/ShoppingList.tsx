"use client";

import { Card } from "@/components/ui/card";
import React from "react";

interface ShoppingListProps {
  items: string[];
  onViewFullList: () => void;
}

export function ShoppingList({ items, onViewFullList }: ShoppingListProps) {
  return (
    <section className="lg:col-span-1">
      <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
        Shopping List
      </h2>
      <Card className="p-6">
        <ul className="space-y-3 text-gray-700">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="h-2 w-2 bg-green-600 rounded-full mr-3"></span>
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={onViewFullList}
          className="mt-4 text-sm font-semibold text-green-600 hover:underline"
        >
          View Full List
        </button>
      </Card>
    </section>
  );
}
