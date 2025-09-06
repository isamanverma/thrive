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
    <Card className="shadow-md p-4 flex flex-col">
      <div
        className="w-full h-40 bg-center bg-no-repeat aspect-video bg-cover rounded-lg mb-4"
        style={{
          backgroundImage: `url("${imageUrl}")`,
        }}
      ></div>
      <CardContent className="p-0">
        <h3 className="text-lg font-bold text-gray-800">{type}</h3>
        <p className="text-base text-gray-600 mb-3">{name}</p>
      </CardContent>
      <CardFooter className="mt-auto p-0 flex items-center justify-between text-sm text-gray-500">
        <button className="hover:text-gray-800 transition-colors">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M15.312 11.237a.75.75 0 01.938.937l-3.82 4.108a.75.75 0 01-1.179-.82l3.06-3.225H10.5a.75.75 0 010-1.5h3.812l-3.06-3.225a.75.75 0 111.179-.82l3.82 4.108zM4.688 8.763a.75.75 0 01-.938-.937l3.82-4.108a.75.75 0 111.179.82L5.688 7.75H9.5a.75.75 0 010 1.5H5.688l3.06 3.225a.75.75 0 11-1.179.82L4.688 8.763z"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
        <button className="hover:text-gray-800 transition-colors">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM15.03 5.03a.75.75 0 00-1.06-1.06l-1.06 1.06a.75.75 0 101.06 1.06l1.06-1.06zM2 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm13.97 4.97a.75.75 0 001.06 1.06l1.06-1.06a.75.75 0 10-1.06-1.06l-1.06 1.06zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM3.97 4.97a.75.75 0 001.06-1.06L3.97 2.85a.75.75 0 00-1.06 1.06l1.06 1.06zM10 7a3 3 0 100 6 3 3 0 000-6zM3.97 15.03a.75.75 0 00-1.06 1.06l1.06 1.06a.75.75 0 001.06-1.06l-1.06-1.06zM15.03 16.09a.75.75 0 00-1.06 1.06l1.06 1.06a.75.75 0 101.06-1.06l-1.06-1.06z"></path>
          </svg>
        </button>
        <button className="hover:text-green-600 transition-colors">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              fillRule="evenodd"
            ></path>
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
    <section className="mb-10">
      <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
        Today&apos;s Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
