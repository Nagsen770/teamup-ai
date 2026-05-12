"use client";

import { useMemo, useState } from "react";
import { Filter, Map, Search, SlidersHorizontal } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { TurfCard } from "@/components/turf-card";
import { Button } from "@/components/ui/button";
import { turfs } from "@/lib/data";

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [sportOnly, setSportOnly] = useState(false);
  const [mapMode, setMapMode] = useState(false);
  const demoTurfs = useMemo(() => turfs.concat(turfs), []);
  const filteredTurfs = demoTurfs.filter((turf) => {
    const matchesQuery = `${turf.name} ${turf.area} ${turf.sport}`.toLowerCase().includes(query.toLowerCase());
    const matchesSport = !sportOnly || turf.sport === "Football";
    return matchesQuery && matchesSport;
  });

  return (
    <DashboardShell
      title="AI Turf Discovery"
      subtitle="Search, filter, map, compare, reserve, and pay for sports venues with live AI recommendations."
    >
      <section className="glass rounded-3xl p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
          <label className="flex items-center gap-3 rounded-full border bg-background px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search football, cricket, badminton, area, skill level..."
            />
          </label>
          <Button variant={sportOnly ? "default" : "secondary"} onClick={() => setSportOnly((value) => !value)}>
            <Filter className="h-4 w-4" />
            Football
          </Button>
          <Button variant="secondary" onClick={() => setQuery("Indiranagar")}>
            <SlidersHorizontal className="h-4 w-4" />
            Nearby tonight
          </Button>
          <Button onClick={() => setMapMode((value) => !value)}>
            <Map className="h-4 w-4" />
            {mapMode ? "List view" : "Map view"}
          </Button>
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-5 md:grid-cols-2">
          {filteredTurfs.map((turf, index) => (
            <TurfCard key={`${turf.name}-${index}`} turf={turf} />
          ))}
          {filteredTurfs.length === 0 && (
            <div className="glass rounded-3xl p-8 text-center md:col-span-2">
              <p className="font-bold">No demo turfs matched.</p>
              <p className="mt-2 text-sm text-muted-foreground">Try clearing the search or selecting nearby tonight.</p>
            </div>
          )}
        </div>
        <aside className="glass sticky top-20 h-fit rounded-3xl p-5">
          <div className="field-grid flex h-80 items-center justify-center rounded-3xl bg-emerald-700 text-white">
            <div className="rounded-3xl bg-black/35 p-4 text-center backdrop-blur">
              <Map className="mx-auto h-8 w-8" />
              <p className="mt-2 font-bold">{mapMode ? "Demo map pins active" : "Google Maps layer"}</p>
              <p className="mt-1 text-sm opacity-80">{filteredTurfs.length} venues shown with dummy location data</p>
            </div>
          </div>
          <div className="mt-5 space-y-3 text-sm">
            <p className="font-bold">Live AI filters</p>
            {["Within 5 km", "Available tonight", "4.5+ rated", "Balanced teams nearby", "Razorpay enabled"].map((filter) => (
              <label key={filter} className="flex items-center justify-between rounded-3xl border bg-card p-3">
                <span>{filter}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-teal-600" />
              </label>
            ))}
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}
