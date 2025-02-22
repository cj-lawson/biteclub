"use client";

import * as React from "react";

import Image from "next/image";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/app/_components/ui/sidebar";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-white text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Image
              src="/logo-mark.svg"
              width={44}
              height={44}
              alt="logo-mark"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">BiteClub</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
