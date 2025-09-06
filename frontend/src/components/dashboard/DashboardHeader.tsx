"use client";

import { Button } from "@/components/ui/button";
import React from "react";

interface DashboardHeaderProps {
  name: string;
}

export function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-extrabold leading-tight">
          Good morning, {name}!
        </h1>
        <p className="text-lg mt-1 text-gray-600">
          Ready to cook up something amazing today?
        </p>
      </div>
      <Button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 self-start font-semibold">
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
        </svg>
        <span>Generate Today&apos;s Meal Plan</span>
      </Button>
    </header>
  );
}
