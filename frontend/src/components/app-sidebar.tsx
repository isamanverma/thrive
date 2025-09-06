"use client";

import {
  Bell,
  BookOpen,
  ChefHat,
  Heart,
  Home,
  Settings,
  TrendingUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

// Profile button component
const ProfileButton = () => {
  return (
    <div
      className="relative flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-3 cursor-pointer"
      onClick={() => {
        // Find the Clerk button and click it programmatically
        const userButton = document.querySelector("[data-clerk-ready]");
        if (userButton) (userButton as HTMLElement).click();
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full z-0"></div>
      <UserButton
        appearance={{
          elements: {
            userButtonTrigger: "bg-transparent border-none shadow-none p-0",
            userButtonAvatarBox: "w-5 h-5",
          },
        }}
      />
      <span className="text-lg font-medium text-gray-700 z-10 pointer-events-none">
        Profile
      </span>
    </div>
  );
};

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Meal Plans",
    url: "#meal-plans",
    icon: ChefHat,
  },
  {
    title: "Recipe Explorer",
    url: "#recipe-explorer",
    icon: BookOpen,
  },
  {
    title: "Saved Recipes",
    url: "#saved-recipes",
    icon: Heart,
  },
  {
    title: "Progress Tracker",
    url: "#progress-tracker",
    icon: TrendingUp,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-gray-50 border-r border-gray-200">
      <SidebarHeader className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="Thrive Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-gray-800">Thrive</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-gray-100 rounded-lg -p-3"
                  >
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-green-600" />
                      <span className="text-lg font-medium text-gray-700">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 bg-white border-t border-gray-200">
        <div className="flex flex-col space-y-3">
          <SidebarMenuButton
            asChild
            className="hover:bg-gray-100 rounded-lg p-3"
          >
            <a href="#notifications" className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-green-600" />
              <span className="text-lg font-medium text-gray-700">
                Notifications
              </span>
            </a>
          </SidebarMenuButton>
          <SidebarMenuButton
            asChild
            className="hover:bg-gray-100 rounded-lg p-3"
          >
            <a href="#settings" className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-green-600" />
              <span className="text-lg font-medium text-gray-700">
                Settings
              </span>
            </a>
          </SidebarMenuButton>
          <ProfileButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
