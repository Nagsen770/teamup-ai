"use client";

import { useState } from "react";
import { Braces, Calendar, Medal, Sparkles, Trophy, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";

const rounds = [
  ["Quarter final", "Team Alpha vs Strikers", "6:00 PM"],
  ["Quarter final", "Nova FC vs Orbit", "7:00 PM"],
  ["Semi final", "Winner Q1 vs Winner Q2", "Tomorrow"],
  ["Final", "AI scheduled prime slot", "Sunday 6:00 PM"]
];

const tournamentStats: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: UsersRound, title: "16 teams", text: "128 players" },
  { icon: Medal, title: "Leaderboard", text: "Live scoring" },
  { icon: Sparkles, title: "AI summary", text: "Auto recap" }
];

export default function TournamentsPage() {
  const [generated, setGenerated] = useState(false);
  const visibleRounds = generated
    ? [
        ["Round 1", "Falcons vs Orbit", "Today 6:00 PM"],
        ["Round 1", "Nova FC vs Strikers", "Today 7:00 PM"],
        ["Semi final", "Winner M1 vs Winner M2", "Tomorrow 6:30 PM"],
        ["Final", "AI prime-time championship", "Sunday 6:00 PM"]
      ]
    : rounds;

  return (
    <DashboardShell
      title="Tournament Generator"
      subtitle="Create brackets, fixtures, round robin systems, leaderboards, and match summaries with AI."
    >
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="glass rounded-3xl p-5">
          <Sparkles className="h-8 w-8 text-primary" />
          <h2 className="mt-4 text-2xl font-black">Generate a league in seconds</h2>
          <div className="mt-5 space-y-3">
            {["Sport", "Number of teams", "Format", "Venue cluster", "Preferred time windows"].map((label, index) => (
              <label key={label} className="block">
                <span className="text-sm font-semibold">{label}</span>
                <input
                  className="mt-2 w-full rounded-3xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                  defaultValue={["Football", "16", "Knockout + third place", "Bengaluru East", "Evening weekends"][index]}
                />
              </label>
            ))}
          </div>
          <Button className="mt-5 w-full" onClick={() => setGenerated(true)}>
            <Braces className="h-4 w-4" />
            {generated ? "Fixtures generated" : "Generate fixtures"}
          </Button>
          {generated && (
            <p className="mt-3 rounded-3xl border bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">
              Demo AI created balanced fixtures, rest windows, and a final slot.
            </p>
          )}
        </section>

        <section className="glass rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">Bengaluru Creator Cup</p>
              <h2 className="mt-1 text-2xl font-black">Live bracket</h2>
            </div>
            <Trophy className="h-9 w-9 text-amber-500" />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {visibleRounds.map(([round, title, time]) => (
              <div key={title} className="rounded-3xl border bg-card p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{round}</p>
                <p className="mt-2 font-semibold">{title}</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {time}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {tournamentStats.map((item) => (
              <div key={item.title} className="rounded-3xl bg-primary/10 p-4">
                <item.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 font-bold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
