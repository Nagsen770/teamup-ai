"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Bot,
  CalendarDays,
  Home,
  LayoutDashboard,
  MapPin,
  Shield,
  Trophy,
  UsersRound
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/discover", label: "Discover", icon: MapPin },
  { href: "/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/admin", label: "Admin", icon: Shield }
];

export function DashboardShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="glass sticky top-20 hidden h-[calc(100vh-6rem)] rounded-3xl p-3 lg:block">
          <Link href="/" className="mb-4 flex items-center gap-2 rounded-3xl px-3 py-2 font-bold">
            <Home className="h-4 w-4" />
            Command Center
          </Link>
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-3xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground",
                  pathname === item.href && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 rounded-3xl bg-slate-950 p-4 text-white dark:bg-white dark:text-slate-950">
            <Bot className="h-6 w-6 text-teal-300 dark:text-teal-600" />
            <p className="mt-3 font-semibold">AI autopilot</p>
            <p className="mt-1 text-xs opacity-75">Pricing, fixtures, moderation, and match planning ready.</p>
          </div>
        </aside>
        <section>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-primary">TEAMUP AI</p>
              <h1 className="mt-2 text-3xl font-black sm:text-5xl">{title}</h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>
            </div>
            <div className="flex gap-2">
              {[Bell, CalendarDays, UsersRound].map((Icon, index) => (
                <button key={index} className="flex h-11 w-11 items-center justify-center rounded-full border bg-card transition hover:bg-accent">
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}
