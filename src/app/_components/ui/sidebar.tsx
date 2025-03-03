"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "~/lib/utils";
import {
  BookOpen,
  Calendar,
  ShoppingCart,
  Heart,
  Settings,
  Search,
  PlusCircle,
  Home,
  Menu,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";

const mainNavItems = [
  { href: "/", icon: <Home size={24} />, label: "Home" },
  { href: "/recipes", icon: <BookOpen size={24} />, label: "Recipes" },
  { href: "/meal-planner", icon: <Calendar size={24} />, label: "Planner" },
  {
    href: "/shopping-list",
    icon: <ShoppingCart size={24} />,
    label: "Shopping",
  },
];

const secondaryNavItems = [
  { href: "/favorites", icon: <Heart size={20} />, label: "Favorites" },
  { href: "/search", icon: <Search size={20} />, label: "Search" },
  { href: "/add-recipe", icon: <PlusCircle size={20} />, label: "Add" },
  { href: "/settings", icon: <Settings size={20} />, label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileMoreOpen, setMobileMoreOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`border-r-border bg-background fixed left-0 top-0 z-40 hidden h-screen w-20 flex-col items-center border-r py-3 shadow-sm sm:flex`}
      >
        {/* App logo */}
        <div className="mb-2 flex items-center justify-center">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full"
                >
                  <Image
                    width={24}
                    height={24}
                    src="/logo-mark.svg"
                    alt="Biteclube logo mark"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>BiteClub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="bg-border my-1 h-px w-10" />

        {/* Main navigation */}
        <nav className="mt-3 flex flex-col items-center gap-4">
          {mainNavItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              tooltip={item.label}
              active={
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)
              }
            />
          ))}
        </nav>

        <div className="bg-border my-3 h-px w-10" />

        {/* Bottom utilities */}
        <div className="mt-auto flex flex-col items-center gap-2 pb-4">
          {secondaryNavItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              tooltip={item.label}
              active={pathname.startsWith(item.href)}
            />
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white sm:hidden dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto grid h-16 grid-cols-4">
          {mainNavItems.map((item) => (
            <MobileNavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)
              }
            />
          ))}
        </div>
      </div>

      {/* Mobile More Menu Button */}
      <div className="fixed bottom-20 right-4 z-50 sm:hidden">
        <button
          onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
          className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile More Menu */}
      {mobileMoreOpen && (
        <div className="fixed bottom-36 right-4 z-50 flex flex-col gap-3 sm:hidden">
          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-500 shadow-md dark:bg-gray-800 dark:text-gray-400",
                pathname.startsWith(item.href) &&
                  "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground",
              )}
              onClick={() => setMobileMoreOpen(false)}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  tooltip: string;
  active?: boolean;
}

function NavItem({ href, icon, tooltip, active }: NavItemProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "hover:text-accent-foreground flex h-14 w-14 items-center justify-center rounded-md transition-all hover:bg-[#F3F3F3]",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground",
            )}
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface MobileNavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function MobileNavItem({ href, icon, label, active }: MobileNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center text-xs font-medium",
        active
          ? "text-primary"
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
      )}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-center">{label}</span>
    </Link>
  );
}
