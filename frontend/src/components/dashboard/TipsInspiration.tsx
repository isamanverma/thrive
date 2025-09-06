"use client";

import React from "react";

interface TipsInspirationProps {
  title: string;
  tip: string;
}

export function TipsInspiration({ title, tip }: TipsInspirationProps) {
  return (
    <section className="lg:col-span-2">
      <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
        Tips &amp; Inspiration
      </h2>
      <div className="bg-green-50 rounded-xl p-8 flex items-center gap-8">
        <div className="flex-shrink-0 text-green-600">
          <svg
            className="h-16 w-16"
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
            ></path>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-base text-gray-600 mt-2">{tip}</p>
        </div>
      </div>
    </section>
  );
}
