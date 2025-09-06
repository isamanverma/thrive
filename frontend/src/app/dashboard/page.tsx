"use client";

import {
  CalendarSection,
  DashboardHeader,
  ProgressSnapshot,
  QuickActions,
  SavedSuggestedRecipes,
  ShoppingList,
  TipsInspiration,
  TodaysPlan,
} from "@/components/dashboard";
import React, { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [userName, setUserName] = useState<string>("User");
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoaded && user) {
        try {
          // Try to fetch user data from your database
          const response = await fetch(`/api/users?clerkId=${user.id}`);
          if (response.ok) {
            const data = await response.json();
            if (data.exists && data.user.name) {
              setUserName(data.user.name);
            } else {
              // Fallback to Clerk's firstName if no name in database
              setUserName(user.firstName || "User");
            }
          } else {
            // Fallback to Clerk's firstName
            setUserName(user.firstName || "User");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fallback to Clerk's firstName
          setUserName(user.firstName || "User");
        } finally {
          setIsLoadingUser(false);
        }
      } else if (isLoaded && !user) {
        setUserName("User");
        setIsLoadingUser(false);
      }
    };

    fetchUserData();
  }, [isLoaded, user]);

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
          className="h-5 w-5 text-green-600"
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
          className="h-5 w-5 text-green-600"
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
          className="h-5 w-5 text-green-600"
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
    <main className="flex-1 overflow-y-auto bg-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          {isLoaded && !isLoadingUser ? (
            <DashboardHeader name={userName} />
          ) : (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
          )}
        </div>

        {/* Today's Plan Section */}
        <div className="mb-6 sm:mb-8">
          <TodaysPlan meals={meals} />
        </div>

        {/* Progress and Actions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Left Column - Progress & Actions */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Progress and Quick Actions Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <ProgressSnapshot
                streak={12}
                consistency={92}
                lastNote="Felt great after lunch, very energetic for my afternoon workout!"
              />
              <QuickActions actions={quickActions} />
            </div>
          </div>

          {/* Right Column - Calendar */}
          <div className="lg:col-span-1">
            <CalendarSection date={date} setDate={setDate} />
          </div>
        </div>

        {/* Saved & Suggested Recipes */}
        <div className="mb-6 sm:mb-8">
          <SavedSuggestedRecipes recipes={recipes} />
        </div>

        {/* Bottom Section - Shopping List & Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Shopping List */}
          <div className="lg:col-span-1">
            <ShoppingList
              items={shoppingItems}
              onViewFullList={handleViewFullList}
            />
          </div>

          {/* Tips & Inspiration */}
          <div className="lg:col-span-2">
            <TipsInspiration
              title="Tip of the Day"
              tip="Meal prep your grains like quinoa and rice at the start of the week to save time on lunches and dinners. They store well in the fridge for up to 4 days!"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
