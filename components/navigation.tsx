"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, Moon, Search, Sun, Trophy, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

const nav = [
  { href: "/player", label: "Player" },
  { href: "/owner", label: "Owner" },
  { href: "/discover", label: "Discover" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/admin", label: "Admin" }
];

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const setCommandOpen = useAppStore((state) => state.setCommandOpen);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/78 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-normal">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            <Trophy className="h-5 w-5" />
          </span>
          <span>TEAMUP AI</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Open command palette" onClick={() => setCommandOpen(true)}>
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="hidden h-4 w-4 dark:block" />
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/login">
              <UserRound className="h-4 w-4" />
              Sign in
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
