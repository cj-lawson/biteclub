"use client";

import * as React from "react";
import { BookOpen, Settings2, Home, Pen } from "lucide-react";

import { NavMain } from "~/app/_components/ui/nav-main";
import { NavUser } from "~/app/_components/ui/nav-user";
import { TeamSwitcher } from "~/app/_components/ui/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/app/_components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "spicybeefpho",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "All Recipes ",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Created Recipes",
      url: "#",
      icon: Pen,
    },
    {
      title: "Collections",
      url: "/dashboard/collections",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
