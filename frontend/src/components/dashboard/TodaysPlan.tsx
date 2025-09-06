"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import React from "react";

interface MealCardProps {
  type: string;
  name: string;
  imageUrl: string;
}

function MealCard({ type, name, imageUrl }: MealCardProps) {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow border-0 bg-white">
      <div
        className="w-full h-32 sm:h-40 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url("${imageUrl}")`,
        }}
      />
      <CardContent className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
          {type}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {name}
        </p>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0 flex items-center justify-between">
        <button className="text-gray-400 hover:text-green-600 transition-colors">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M15.312 11.237a.75.75 0 01.938.937l-3.82 4.108a.75.75 0 01-1.179-.82l3.06-3.225H10.5a.75.75 0 010-1.5h3.812l-3.06-3.225a.75.75 0 111.179-.82l3.82 4.108z"
              fillRule="evenodd"
            />
          </svg>
        </button>
        <button className="text-gray-400 hover:text-green-600 transition-colors">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </CardFooter>
    </Card>
  );
}

interface TodaysPlanProps {
  meals: {
    type: string;
    name: string;
    imageUrl: string;
  }[];
}

export function TodaysPlan({ meals }: TodaysPlanProps) {
  return (
    <section className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
        Today&apos;s Plan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {meals.map((meal, index) => (
          <MealCard
            key={index}
            type={meal.type}
            name={meal.name}
            imageUrl={meal.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
