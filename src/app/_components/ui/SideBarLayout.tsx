"use client";

import React from "react";
import { SideBar } from "./SideBar";

interface SidebarLayoutProps {
  children: React.ReactNode;
  sidebarWidth?: string;
}

export function SidebarLayout({
  children,
  sidebarWidth = "w-16",
}: SidebarLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <SideBar width={sidebarWidth} />
      <main className="flex-1 bg-white p-6 pb-24 sm:ml-16 sm:pb-6 dark:bg-gray-950">
        {children}
      </main>
    </div>
  );
}
