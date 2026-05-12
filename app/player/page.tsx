"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, LocateFixed, MapPin, Search, Star, Ticket, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthGate } from "@/components/auth-gate";
import { turfs } from "@/lib/data";

const sports = ["All", "Football", "Cricket", "Badminton"];
const dates = ["Today", "Tomorrow", "Sunday"];
const leaderboard = [
  { team: "Nova Strikers", played: 14, won: 11, lost: 3 },
  { team: "Green Warriors", played: 13, won: 10, lost: 3 },
  { team: "Astra United", played: 12, won: 8, lost: 4 },
  { team: "Pulse Rangers", played: 12, won: 7, lost: 5 },
  { team: "Orbit FC", played: 11, won: 6, lost: 5 },
  { team: "Turf Titans", played: 10, won: 4, lost: 6 },
  { team: "Night Hawks", played: 9, won: 3, lost: 6 }
];

type Turf = (typeof turfs)[number];
type PlayerProfile = {
  name: string;
  mobile: string;
  email: string;
  favoriteSport: string;
  address: string;
};

export default function PlayerTerminal() {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState("All");
  const [bookingTurf, setBookingTurf] = useState<Turf | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [status, setStatus] = useState("No active booking.");
  const [profile, setProfile] = useState<PlayerProfile>({
    name: "Player",
    mobile: "",
    email: "",
    favoriteSport: "",
    address: ""
  });
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [typedLocation, setTypedLocation] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem("teamup-demo-session");
    if (!raw) return;

    const session = JSON.parse(raw) as Partial<PlayerProfile>;
    const nextProfile = {
      name: session.name || "Player",
      mobile: session.mobile || "",
      email: session.email || "",
      favoriteSport: session.favoriteSport || "",
      address: session.address || ""
    };
    setProfile(nextProfile);
    setTypedLocation(nextProfile.address);

    if (!nextProfile.address) {
      setShowLocationPopup(true);
    }
  }, []);

  const saveProfile = (nextProfile: PlayerProfile) => {
    setProfile(nextProfile);
    const raw = window.localStorage.getItem("teamup-demo-session");
    const session = raw ? JSON.parse(raw) : {};
    window.localStorage.setItem("teamup-demo-session", JSON.stringify({ ...session, ...nextProfile, role: "player" }));
  };

  const saveLocation = (address: string) => {
    const cleanAddress = address.trim();
    if (!cleanAddress) return;
    saveProfile({ ...profile, address: cleanAddress });
    setTypedLocation(cleanAddress);
    setShowLocationPopup(false);
  };

  const filteredTurfs = useMemo(
    () =>
      turfs.filter((turf) => {
        const text = `${turf.name} ${turf.area} ${turf.sport}`.toLowerCase();
        return text.includes(query.toLowerCase()) && (sport === "All" || turf.sport === sport);
      }),
    [query, sport]
  );

  const openBooking = (turf: Turf) => {
    setBookingTurf(turf);
    setSelectedDate("");
    setSelectedSlot("");
    setStatus(`${turf.name} selected.`);
  };

  const payNow = () => {
    if (!bookingTurf || !selectedDate || !selectedSlot) return;
    setStatus(`${bookingTurf.name} booked for ${selectedDate}, ${selectedSlot}. Demo payment completed.`);
    setBookingTurf(null);
  };

  return (
    <AuthGate role="player">
    <main className="min-h-screen bg-[#f5fbf6] text-slate-950">
      <section className="relative overflow-hidden rounded-b-[2rem] bg-emerald-700 px-4 pb-7 pt-4 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.065)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-700 shadow-premium">
                <UserRound className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-100">Player Profile</p>
                <p className="font-black">{profile.name}</p>
              </div>
            </div>
            <Button asChild variant="ghost" className="text-white hover:bg-white/12 hover:text-white">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-emerald-100">Hello {profile.name}</p>
            <h1 className="mt-1 text-3xl font-black tracking-normal">Find your turf</h1>
          </div>

          <label className="mt-5 flex items-center gap-3 rounded-full bg-white px-4 py-3 text-slate-950 shadow-premium">
            <Search className="h-4 w-4 text-emerald-700" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search turf, sport, or area"
            />
          </label>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <div className="rounded-[2rem] bg-white p-4 shadow-premium">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {sports.map((item) => (
                <button
                  key={item}
                  onClick={() => setSport(item)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                    sport === item ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-premium">
            <div className="flex items-center gap-3">
              <Ticket className="h-5 w-5 text-emerald-700" />
              <p className="text-sm font-bold text-emerald-800">{status}</p>
            </div>
          </div>

          <div className="grid gap-3">
            {filteredTurfs.map((turf) => (
              <article key={turf.name} className="grid overflow-hidden rounded-[2rem] bg-white shadow-premium sm:grid-cols-[150px_1fr]">
                <div className="field-grid flex h-28 items-center justify-center bg-emerald-600 sm:h-full">
                  <div className="rounded-full border border-white/60 bg-white/20 px-4 py-1.5 text-xs font-black text-white backdrop-blur">
                    {turf.sport}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-black">{turf.name}</h2>
                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="h-4 w-4 shrink-0 text-emerald-700" />
                        <span className="truncate">{turf.area}</span>
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {turf.rating}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-emerald-700">Rs {turf.price}/hr</p>
                    <Button className="h-10 bg-emerald-700 px-5 hover:bg-emerald-800" onClick={() => openBooking(turf)}>
                      Book
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-5 lg:h-fit">
          <section className="rounded-[2rem] bg-white p-5 shadow-premium">
            <div className="flex items-center gap-3">
              <UserRound className="h-5 w-5 text-emerald-700" />
              <h2 className="font-black">User Profile</h2>
            </div>
            <div className="mt-4 space-y-3">
              <ProfileRow label="Name" value={profile.name} />
              <ProfileRow label="Mobile" value={profile.mobile || "Not added"} />
              <ProfileRow label="Email" value={profile.email || "Not added"} />
              <label className="block rounded-[1.5rem] bg-emerald-50 p-3">
                <span className="text-xs font-black text-emerald-700">Favorite sport</span>
                <input
                  value={profile.favoriteSport}
                  onChange={(event) => saveProfile({ ...profile, favoriteSport: event.target.value })}
                  className="mt-1 w-full bg-transparent text-sm font-bold outline-none placeholder:text-slate-400"
                  placeholder="Add favorite sport"
                />
              </label>
              <label className="block rounded-[1.5rem] bg-emerald-50 p-3">
                <span className="text-xs font-black text-emerald-700">Address</span>
                <input
                  value={profile.address}
                  onChange={(event) => saveProfile({ ...profile, address: event.target.value })}
                  className="mt-1 w-full bg-transparent text-sm font-bold outline-none placeholder:text-slate-400"
                  placeholder="Add address"
                />
              </label>
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-5 shadow-premium">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 fill-emerald-700 text-emerald-700" />
              <h2 className="font-black">Leaderboard</h2>
            </div>
            <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-emerald-100">
              <div className="grid grid-cols-[1fr_52px_52px_52px] bg-emerald-700 px-3 py-2 text-xs font-black text-white">
                <span>Team</span>
                <span className="text-center">P</span>
                <span className="text-center">W</span>
                <span className="text-center">L</span>
              </div>
              {leaderboard.map((team, index) => (
                <div
                  key={team.team}
                  className="grid grid-cols-[1fr_52px_52px_52px] items-center border-t border-emerald-100 px-3 py-2 text-sm"
                >
                  <span className="truncate font-bold">
                    {index + 1}. {team.team}
                  </span>
                  <span className="text-center font-semibold text-slate-600">{team.played}</span>
                  <span className="text-center font-semibold text-emerald-700">{team.won}</span>
                  <span className="text-center font-semibold text-slate-500">{team.lost}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-5 shadow-premium">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-emerald-700" />
              <h2 className="font-black">Upcoming</h2>
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["5v5 Match", "Today 7:30 PM"],
                ["Cricket Night", "Tomorrow 8:00 PM"]
              ].map(([name, time]) => (
                <div key={name} className="flex items-center justify-between rounded-[1.5rem] bg-emerald-50 p-3">
                  <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-xs text-slate-500">{time}</p>
                  </div>
                  <Clock className="h-4 w-4 text-emerald-700" />
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>

      {bookingTurf && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 px-4 pb-4 backdrop-blur-sm sm:items-center sm:pb-0">
          <section className="w-full max-w-md rounded-[2rem] bg-white p-5 shadow-premium">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-emerald-700">Booking</p>
                <h2 className="mt-1 text-2xl font-black">{bookingTurf.name}</h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 text-emerald-700" />
                  {bookingTurf.area}
                </p>
              </div>
              <button
                onClick={() => setBookingTurf(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-800"
                aria-label="Close booking"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-sm font-black">1. Select date</p>
              <div className="grid grid-cols-3 gap-2">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlot("");
                    }}
                    className={`rounded-full px-3 py-2 text-xs font-black transition ${
                      selectedDate === date ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-800"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            <div className={`mt-5 ${selectedDate ? "" : "opacity-45"}`}>
              <p className="mb-2 text-sm font-black">2. Select time</p>
              <div className="flex flex-wrap gap-2">
                {bookingTurf.slots.map((slot) => (
                  <button
                    key={slot}
                    disabled={!selectedDate}
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-full px-3 py-2 text-xs font-black transition disabled:cursor-not-allowed ${
                      selectedSlot === slot ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-800"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="mt-5 w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 disabled:text-slate-500"
              disabled={!selectedDate || !selectedSlot}
              onClick={payNow}
            >
              <CheckCircle2 className="h-4 w-4" />
              Pay Now
            </Button>
          </section>
        </div>
      )}

      {showLocationPopup && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/45 px-4 pb-4 backdrop-blur-sm sm:items-center sm:pb-0">
          <section className="w-full max-w-md rounded-[2rem] bg-white p-5 shadow-premium">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-emerald-700">Location</p>
                <h2 className="mt-1 text-2xl font-black">Add your playing area</h2>
                <p className="mt-2 text-sm text-slate-500">Use current location demo or type your address.</p>
              </div>
              <button
                onClick={() => setShowLocationPopup(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-800"
                aria-label="Close location popup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => saveLocation("Current location - nearby sports venues")}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-700 text-sm font-black text-white"
            >
              <LocateFixed className="h-4 w-4" />
              Use Current Location
            </button>

            <label className="mt-4 block rounded-[1.5rem] border border-emerald-100 p-4">
              <span className="text-xs font-black text-emerald-700">Type address</span>
              <input
                value={typedLocation}
                onChange={(event) => setTypedLocation(event.target.value)}
                className="mt-2 w-full bg-transparent text-sm font-bold outline-none"
                placeholder="Enter your address"
              />
            </label>

            <Button
              className="mt-4 w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 disabled:text-slate-500"
              disabled={!typedLocation.trim()}
              onClick={() => saveLocation(typedLocation)}
            >
              Save Location
            </Button>
          </section>
        </div>
      )}

    </main>
    </AuthGate>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-emerald-50 p-3">
      <p className="text-xs font-black text-emerald-700">{label}</p>
      <p className="mt-1 break-words text-sm font-bold text-slate-700">{value}</p>
    </div>
  );
}
