"use client";

import React from "react";

interface TipsInspirationProps {
  title: string;
  tip: string;
}

export function TipsInspiration({ title, tip }: TipsInspirationProps) {
  return (
    <section className="space-y-3 sm:space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
        Tips &amp; Inspiration
      </h2>
      <div className="bg-green-50 border border-green-100 rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-8">
        <div className="flex-shrink-0 text-green-600">
          <svg
            className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mt-2 leading-relaxed">
            {tip}
          </p>
        </div>
      </div>
    </section>
  );
}
