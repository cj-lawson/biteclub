"use client";

import React from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { Settings, User, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";

export function SidebarAvatar() {
  const [isOpen, setIsOpen] = React.useState(false);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative mt-auto">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 transition-all hover:ring-2 hover:ring-green-500 dark:bg-gray-700"
            >
              <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className={cn(isOpen && "hidden")}>
            <p>Your Account</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute bottom-0 left-full mb-0 ml-2 w-40 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="py-1">
            <UserMenuItem
              href="/profile"
              icon={<User className="mr-2 h-4 w-4" />}
              label="Profile"
            />
            <UserMenuItem
              href="/settings"
              icon={<Settings className="mr-2 h-4 w-4" />}
              label="Settings"
            />
            <div className="border-t border-gray-200 dark:border-gray-700"></div>
            <UserMenuItem
              href="/logout"
              icon={
                <LogOut className="mr-2 h-4 w-4 text-red-500 dark:text-red-400" />
              }
              label="Logout"
              className="text-red-500 dark:text-red-400"
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface UserMenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

function UserMenuItem({ href, icon, label, className }: UserMenuItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700",
        className,
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
