"use client";

import React from "react";
import Link from "next/link";
import { Search, Settings, User, LogOut, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";

export function AppHeader() {
  return (
    <div className="sticky top-0 z-30 flex h-16 w-full flex-col items-center justify-between bg-white px-4 sm:flex-row sm:px-6 dark:bg-gray-900">
      {/* Search Bar */}
      <div className="relative flex w-full max-w-md items-center sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-hidden focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-green-500"
        />
      </div>

      {/* Avatar with Dropdown */}
      {/* <div className="ml-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center rounded-full outline-hidden focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <ChevronDown className="ml-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
    </div>
  );
}
