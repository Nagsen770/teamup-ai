"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Bot, CalendarPlus, Crown, Sparkles, Trophy, UsersRound } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { MetricCard } from "@/components/metric-card";
import { Button } from "@/components/ui/button";
import { aiRecommendations, dashboardMetrics, quickActions } from "@/lib/data";

const RevenueChart = dynamic(() => import("@/components/revenue-chart").then((mod) => mod.RevenueChart), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-3xl bg-muted" />
});

export default function DashboardPage() {
  const [actionResult, setActionResult] = useState("AI is monitoring bookings, revenue, and team balance in demo mode.");

  return (
    <DashboardShell
      title="Player and Owner Dashboard"
      subtitle="One cockpit for bookings, earnings, matches, AI recommendations, notifications, and community growth."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="glass rounded-3xl p-5">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-black">Revenue and booking trend</h2>
              <p className="text-sm text-muted-foreground">Animated SaaS analytics for turf owners and admins.</p>
            </div>
            <Button variant="secondary" onClick={() => setActionResult("Demo report exported: bookings, revenue, fill rate, and AI pricing saved.")}>
              Export report
            </Button>
          </div>
          <div className="h-[320px]">
            <RevenueChart />
          </div>
        </section>

        <section className="glass rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-black">AI recommendations</h2>
          </div>
          <div className="mt-5 space-y-3">
            {aiRecommendations.map((item) => (
              <div key={item} className="rounded-3xl border bg-background/55 p-3 text-sm leading-6">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="glass rounded-3xl p-5 lg:col-span-2">
          <h2 className="text-xl font-black">Upcoming match flow</h2>
          <div className="mt-5 grid gap-3">
            {[
              ["7:30 PM", "Football 5v5", "Nova Arena", "10 confirmed"],
              ["Sat 6:00 PM", "Corporate cricket league", "Pulse Box", "Semi final"],
              ["Sun 8:00 AM", "Badminton doubles", "Astra Club", "2 spots open"]
            ].map(([time, title, venue, meta]) => (
              <div key={title} className="flex flex-col gap-3 rounded-3xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{time}</p>
                  <p className="mt-1 font-semibold">{title}</p>
                  <p className="text-sm text-muted-foreground">{venue}</p>
                </div>
                <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold">{meta}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="glass rounded-3xl p-5">
          <h2 className="text-xl font-black">Quick actions</h2>
          <div className="mt-5 grid gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="secondary"
                className="justify-start rounded-3xl"
                onClick={() => setActionResult(`${action.label} completed with dummy demo data.`)}
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </div>
          <p className="mt-4 rounded-3xl border bg-background/70 p-3 text-sm text-muted-foreground">{actionResult}</p>
          <div className="mt-5 rounded-3xl bg-slate-950 p-4 text-white dark:bg-white dark:text-slate-950">
            <Crown className="h-6 w-6 text-amber-300" />
            <p className="mt-3 font-bold">Loyalty level: Elite</p>
            <p className="mt-1 text-sm opacity-70">1,840 points / 3 badges / 8 referral wins</p>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { icon: Sparkles, title: "AI voice booking", text: "Reserve slots from natural voice commands." },
          { icon: UsersRound, title: "Player heatmap", text: "Find nearby skill-matched players in real time." },
          { icon: Trophy, title: "Match highlights", text: "Generate summaries, top plays, and share cards." },
          { icon: CalendarPlus, title: "Owner scheduler", text: "Create recurring leagues and peak-hour offers." }
        ].map((item) => (
          <div key={item.title} className="glass rounded-3xl p-5">
            <item.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-bold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
