"use client";

import React, { useState } from "react";
import {
  DashboardHeader,
  TodaysPlan,
  ProgressSnapshot,
  QuickActions,
  CalendarSection,
  SavedSuggestedRecipes,
  ShoppingList,
  TipsInspiration,
} from "@/components/dashboard";

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Data for Today's Plan section
  const meals = [
    {
      type: "Breakfast",
      name: "Avocado Toast with Egg",
      imageUrl:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80",
    },
    {
      type: "Lunch",
      name: "Quinoa Salad with Chickpeas",
      imageUrl:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    },
    {
      type: "Dinner",
      name: "Grilled Salmon with Asparagus",
      imageUrl:
        "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    },
    {
      type: "Snacks",
      name: "Apple Slices with Peanut Butter",
      imageUrl:
        "https://images.unsplash.com/photo-1533029736424-d8313986a67f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    },
  ];

  // Data for Quick Actions
  const quickActions = [
    {
      label: "Log a Meal",
      icon: (
        <svg
          className="h-6 w-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
        </svg>
      ),
      onClick: () => console.log("Log a meal clicked"),
    },
    {
      label: "Add Note",
      icon: (
        <svg
          className="h-6 w-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
        </svg>
      ),
      onClick: () => console.log("Add note clicked"),
    },
    {
      label: "Search by Ingredient",
      icon: (
        <svg
          className="h-6 w-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
        </svg>
      ),
      onClick: () => console.log("Search by ingredient clicked"),
    },
  ];

  // Data for Saved & Suggested Recipes
  const recipes = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2681&q=80",
      category: "Recommended for You",
      title: "Spicy Chicken Tacos",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
      category: "Trending Now",
      title: "Buddha Bowl",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1674314646835-5886dd0e0f76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
      category: "Your Saved Recipes",
      title: "Grilled Chicken & Veggies",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1508736793122-0664bd5d81c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
      category: "Seasonal Special",
      title: "Summer Berry Tart",
    },
  ];

  // Data for Shopping List
  const shoppingItems = [
    "Avocado",
    "Sourdough Bread",
    "Eggs",
    "Quinoa",
    "Chickpeas",
    "Salmon Fillet",
  ];

  // Handle View Full List click
  const handleViewFullList = () => {
    console.log("View full shopping list clicked");
  };

  return (
    <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 bg-[#f7fafc]">
      <div className="flex flex-col w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <DashboardHeader name="Sarah" />

        {/* Today's Plan Section */}
        <TodaysPlan meals={meals} />

        {/* Progress and Quick Actions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Progress Snapshot */}
            <ProgressSnapshot
              streak={12}
              consistency={92}
              lastNote="Felt great after lunch, very energetic for my afternoon workout!"
            />

            {/* Quick Actions */}
            <QuickActions actions={quickActions} />
          </div>

          {/* Calendar Section */}
          <CalendarSection date={date} setDate={setDate} />
        </div>

        {/* Saved & Suggested Recipes */}
        <SavedSuggestedRecipes recipes={recipes} />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shopping List */}
          <ShoppingList
            items={shoppingItems}
            onViewFullList={handleViewFullList}
          />

          {/* Tips & Inspiration */}
          <TipsInspiration
            title="Tip of the Day"
            tip="Meal prep your grains like quinoa and rice at the start of the week to save time on lunches and dinners. They store well in the fridge for up to 4 days!"
          />
        </div>
      </div>
    </main>
  );
}
