"use client";

import { Dumbbell, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

type Turf = {
  name: string;
  area: string;
  rating: number;
  price: number;
  distance: string;
  sport: string;
  image: string;
  slots: string[];
  ai: string;
};

export function TurfCard({ turf }: { turf: Turf }) {
  const [reservedSlot, setReservedSlot] = useState<string | null>(null);

  return (
    <article className="glass overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:shadow-glow">
      <div className="field-grid relative flex h-52 items-center justify-center overflow-hidden bg-emerald-700">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur">
          <Dumbbell className="h-9 w-9" />
        </div>
        <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {turf.sport}
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold">{turf.name}</h3>
            <span className="flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-1 text-xs font-semibold text-amber-600 dark:text-amber-300">
              <Star className="h-3 w-3 fill-current" />
              {turf.rating}
            </span>
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {turf.area} - {turf.distance}
          </p>
        </div>
        <p className="rounded-3xl bg-primary/10 p-3 text-sm text-primary dark:text-teal-200">{turf.ai}</p>
        <div className="flex flex-wrap gap-2">
          {turf.slots.map((slot) => (
            <button
              key={slot}
              onClick={() => setReservedSlot(slot)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                reservedSlot === slot ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
        {reservedSlot && (
          <p className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Demo booking confirmed for {reservedSlot}. QR and Razorpay flow ready.
          </p>
        )}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">from</p>
            <p className="font-semibold">{formatCurrency(turf.price)}/hr</p>
          </div>
          <Button onClick={() => setReservedSlot(reservedSlot ?? turf.slots[0])}>
            {reservedSlot ? "Reserved" : "Reserve slot"}
          </Button>
        </div>
      </div>
    </article>
  );
}
