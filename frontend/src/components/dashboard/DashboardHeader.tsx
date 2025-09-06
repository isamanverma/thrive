"use client";

import { Button } from "@/components/ui/button";
import React from "react";

interface DashboardHeaderProps {
  name: string;
}

export function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
          Good morning, {name}!
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Ready to cook up something amazing today?
        </p>
      </div>
      <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold self-start sm:self-center whitespace-nowrap">
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
          fill="currentColor"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
        </svg>
        <span className="text-sm sm:text-base">Generate Meal Plan</span>
      </Button>
    </header>
  );
}
