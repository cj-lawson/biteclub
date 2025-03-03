"use client";

import React from "react";
import { Sidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

interface SidebarLayoutProps {
  children: React.ReactNode;
  sidebarWidth?: string;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-white p-6 pb-24 sm:ml-16 sm:pb-6 dark:bg-gray-950">
        <div className="container mx-auto">
          <AppHeader />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
