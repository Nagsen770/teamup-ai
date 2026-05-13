"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BadgeIndianRupee,
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock,
  Edit3,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthGate } from "@/components/auth-gate";

const initialRequests = [
  { player: "Aarav + 9 players", slot: "Today 7:30 PM", amount: "Rs 1,800", status: "Pending" },
  { player: "Corporate Cricket Club", slot: "Tomorrow 8:00 PM", amount: "Rs 2,400", status: "Pending" },
  { player: "Weekend Badminton Crew", slot: "Sunday 8:00 AM", amount: "Rs 700", status: "Confirmed" }
];

const slots = ["6:00 AM", "7:30 AM", "6:00 PM", "7:30 PM", "9:00 PM"];

export default function OwnerTerminal() {
  const [price, setPrice] = useState(1800);
  const [terms, setTerms] = useState("No smoking, no metal studs, advance payment required, 10-minute grace period.");
  const [requests, setRequests] = useState(initialRequests);
  const [selectedSlot, setSelectedSlot] = useState("7:30 PM");
  const [note, setNote] = useState("Owner terminal is ready with dummy operational data.");

  const approveRequest = (player: string) => {
    setRequests((current) =>
      current.map((request) => (request.player === player ? { ...request, status: "Confirmed" } : request))
    );
    setNote(`${player} booking confirmed. Demo notification sent.`);
  };

  return (
    <AuthGate role="owner">
    <main className="min-h-screen">
      <header className="border-b bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="w-24" />
          <div className="flex items-center gap-2 font-black">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Turf Owner Terminal
          </div>
          <Button asChild variant="secondary">
            <Link href="/admin">Admin view</Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="glass rounded-3xl p-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Business workspace</p>
            <h1 className="mt-3 text-4xl font-black tracking-normal sm:text-5xl">Manage Nova Arena.</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Control pricing, terms, slots, booking requests, and simple earning insights from one minimal terminal.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Metric icon={BadgeIndianRupee} label="Today revenue" value="Rs 14,800" />
              <Metric icon={CalendarDays} label="Bookings" value="11" />
              <Metric icon={UsersRound} label="Fill rate" value="86%" />
            </div>
          </section>

          <aside className="field-grid flex min-h-[260px] items-center rounded-3xl bg-emerald-700 p-6 text-white">
            <div className="rounded-3xl bg-black/35 p-5 backdrop-blur">
              <Bot className="h-8 w-8 text-teal-200" />
              <h2 className="mt-4 text-2xl font-black">AI pricing note</h2>
              <p className="mt-3 text-sm leading-6 text-white/80">
                Increase 7:30 PM price by Rs 200 on Fridays. Demand is high and cancellation risk is low.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="glass rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <Edit3 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-black">Turf setup</h2>
            </div>
            <label className="mt-5 block">
              <span className="text-sm font-semibold">Hourly price</span>
              <input
                type="number"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
                className="mt-2 w-full rounded-3xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="mt-4 block">
              <span className="text-sm font-semibold">Terms and conditions</span>
              <textarea
                value={terms}
                onChange={(event) => setTerms(event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-3xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <Button className="mt-4 w-full" onClick={() => setNote(`Turf terms saved. Current price is Rs ${price}/hr.`)}>
              <CheckCircle2 className="h-4 w-4" />
              Save turf settings
            </Button>
          </section>

          <section className="glass rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-black">Slot calendar</h2>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => {
                    setSelectedSlot(slot);
                    setNote(`${slot} selected for slot management.`);
                  }}
                  className={`rounded-3xl border p-4 text-sm font-bold transition ${
                    selectedSlot === slot ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <p className="mt-4 rounded-3xl border bg-background/70 p-3 text-sm text-muted-foreground">
              Selected slot: <span className="font-bold text-foreground">{selectedSlot}</span>. You can mark it available, blocked, or premium.
            </p>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="glass rounded-3xl p-5">
            <h2 className="text-xl font-black">Booking requests</h2>
            <div className="mt-5 space-y-3">
              {requests.map((request) => (
                <div key={request.player} className="flex flex-col gap-3 rounded-3xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold">{request.player}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{request.slot} / {request.amount}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{request.status}</span>
                    <Button size="sm" variant="secondary" onClick={() => approveRequest(request.player)}>
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-black">Owner actions</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {["Block maintenance hour", "Create weekend offer", "Ask AI for price", "Send terms to players"].map((action) => (
                <Button key={action} variant="secondary" className="justify-start rounded-3xl" onClick={() => setNote(`${action} completed in demo mode.`)}>
                  {action}
                </Button>
              ))}
            </div>
            <p className="mt-4 rounded-3xl border bg-emerald-500/10 p-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              {note}
            </p>
          </section>
        </div>
      </section>
    </main>
    </AuthGate>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof BadgeIndianRupee; label: string; value: string }) {
  return (
    <div className="rounded-3xl border bg-background/70 p-4">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}
