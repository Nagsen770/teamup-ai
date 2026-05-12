"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  HelpCircle,
  Home,
  LocateFixed,
  LogOut,
  Map,
  MapPin,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Ticket,
  UserRound,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthGate } from "@/components/auth-gate";

type Tab = "home" | "discover" | "bookings" | "profile";
type Venue = {
  name: string;
  address: string;
  rating: number;
  price: number;
  sport: string;
  image: string;
  reviews: string;
  amenities: string[];
  slots: string[];
};
type PlayerProfile = {
  name: string;
  mobile: string;
  email: string;
  favoriteSport: string;
  address: string;
};

const venues: Venue[] = [
  {
    name: "Green Valley Turf",
    address: "123 Sports Complex, City",
    rating: 4.5,
    price: 800,
    sport: "Football",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=900&q=80",
    reviews: "0 reviews",
    amenities: ["Parking", "Showers", "Lighting"],
    slots: ["11:30", "13:30", "15:30", "17:30", "19:30", "21:30"]
  },
  {
    name: "DPK Sports Turf",
    address: "456 Athletic Park, City",
    rating: 4.8,
    price: 1000,
    sport: "Cricket",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=80",
    reviews: "4 reviews",
    amenities: ["Nets", "Lighting", "Cafe"],
    slots: ["10:00", "12:00", "16:00", "20:00"]
  },
  {
    name: "Champions Turf",
    address: "789 Arena Road, City",
    rating: 4.6,
    price: 900,
    sport: "Football",
    image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=900&q=80",
    reviews: "2 reviews",
    amenities: ["Parking", "Water", "Lighting"],
    slots: ["9:30", "14:30", "18:30", "22:00"]
  }
];

const todayDateValue = new Date().toISOString().slice(0, 10);

function formatDateLabel(value: string) {
  if (!value) return "Select date";
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

export default function PlayerTerminal() {
  const [tab, setTab] = useState<Tab>("home");
  const [query, setQuery] = useState("");
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedDate, setSelectedDate] = useState(todayDateValue);
  const [hours, setHours] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookings, setBookings] = useState<string[]>([]);
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
    if (!nextProfile.address) setShowLocationPopup(true);
  }, []);

  const filteredVenues = useMemo(
    () => venues.filter((venue) => `${venue.name} ${venue.address} ${venue.sport}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

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

  const confirmBooking = () => {
    if (!selectedVenue || !selectedSlot) return;
    setBookings((current) => [`${selectedVenue.name} / ${selectedDate} / ${selectedSlot} / ${hours} hr`, ...current]);
    setSelectedVenue(null);
    setSelectedSlot("");
    setTab("bookings");
  };

  return (
    <AuthGate role="player">
      <main className="min-h-screen bg-[#f7f9fb] pb-28 text-slate-950">
        {selectedVenue ? (
          <VenueDetail
            venue={selectedVenue}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            hours={hours}
            setHours={setHours}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            onBack={() => setSelectedVenue(null)}
            onConfirm={confirmBooking}
          />
        ) : (
          <>
            {tab === "home" && <HomeView profile={profile} onDiscover={() => setTab("discover")} onSelectVenue={setSelectedVenue} />}
            {tab === "discover" && <DiscoverView query={query} setQuery={setQuery} venues={filteredVenues} onSelectVenue={setSelectedVenue} />}
            {tab === "bookings" && <BookingsView bookings={bookings} onBrowse={() => setTab("discover")} />}
            {tab === "profile" && <ProfileView profile={profile} saveProfile={saveProfile} />}
          </>
        )}

        {!selectedVenue && <BottomNav tab={tab} setTab={setTab} />}

        {showLocationPopup && (
          <LocationPopup
            typedLocation={typedLocation}
            setTypedLocation={setTypedLocation}
            onUseCurrent={() => saveLocation("Current location - nearby sports venues")}
            onSave={() => saveLocation(typedLocation)}
            onClose={() => setShowLocationPopup(false)}
          />
        )}
      </main>
    </AuthGate>
  );
}

function HomeView({ profile, onDiscover, onSelectVenue }: { profile: PlayerProfile; onDiscover: () => void; onSelectVenue: (venue: Venue) => void }) {
  return (
    <>
      <section className="bg-gradient-to-r from-emerald-800 to-teal-500 px-5 py-7 text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/teamup-logo.jpeg" alt="TeamUP logo" width={68} height={68} className="rounded-2xl border border-white/30 object-cover" />
          </div>
          <button className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/15 text-white backdrop-blur">
            <Bell className="h-6 w-6" />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-8 px-5 py-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-[2rem] bg-white p-5 shadow-premium">
            <p className="text-xs font-black uppercase text-slate-400">Quick tip</p>
            <h2 className="mt-2 text-xl font-black">Pick a slot before peak hours fill up.</h2>
          </div>
          <button onClick={onDiscover} className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-5 text-left shadow-premium">
            <p className="text-xs font-black uppercase text-emerald-800">Discover</p>
            <div className="mt-3 flex items-center justify-between">
              <h2 className="text-xl font-black text-emerald-900">Browse directory</h2>
              <ChevronRight className="h-7 w-7 text-emerald-700" />
            </div>
          </button>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black">Nearby on map</h2>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">Live</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {venues.slice(0, 2).map((venue) => (
              <VenueCard key={venue.name} venue={venue} compact onClick={() => onSelectVenue(venue)} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-black">All venues</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {venues.map((venue) => (
              <VenueCard key={venue.name} venue={venue} compact onClick={() => onSelectVenue(venue)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function DiscoverView({ query, setQuery, venues, onSelectVenue }: { query: string; setQuery: (value: string) => void; venues: Venue[]; onSelectVenue: (venue: Venue) => void }) {
  return (
    <>
      <section className="bg-gradient-to-r from-emerald-800 to-teal-500 px-5 pb-8 pt-9 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-black">Discover turfs</h1>
          <p className="mt-3 text-lg text-white/80">Search by name or area - book in a few taps</p>
          <label className="mt-6 flex items-center gap-3 rounded-[1.5rem] bg-white px-5 py-4 text-slate-950">
            <Search className="h-6 w-6 text-slate-500" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-lg outline-none" placeholder="Try North turf, cricket, 5-a-side..." />
          </label>
        </div>
      </section>
      <section className="mx-auto grid max-w-3xl gap-5 px-5 py-7">
        {venues.map((venue) => (
          <VenueCard key={venue.name} venue={venue} onClick={() => onSelectVenue(venue)} />
        ))}
      </section>
    </>
  );
}

function BookingsView({ bookings, onBrowse }: { bookings: string[]; onBrowse: () => void }) {
  return (
    <>
      <section className="bg-gradient-to-r from-emerald-800 to-teal-500 px-5 py-9 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-black">Your bookings</h1>
          <p className="mt-3 text-lg text-white/80">{bookings.length ? "Your upcoming games are ready." : "Nothing upcoming - time to book a pitch."}</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-20">
        {bookings.length ? (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div key={booking} className="rounded-[2rem] bg-white p-5 font-bold shadow-premium">{booking}</div>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] bg-white p-8 text-center shadow-premium">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Ticket className="h-8 w-8" />
            </div>
            <h2 className="mt-5 text-2xl font-black">No upcoming bookings</h2>
            <p className="mx-auto mt-3 max-w-sm text-slate-500">Explore venues from Home or Discover and lock your next slot.</p>
            <Button className="mt-6 bg-teal-600 hover:bg-teal-700" onClick={onBrowse}>Browse turfs</Button>
          </div>
        )}
      </section>
    </>
  );
}

function ProfileView({ profile, saveProfile }: { profile: PlayerProfile; saveProfile: (profile: PlayerProfile) => void }) {
  const rows = [
    [Bell, "Notifications", "Alerts & reminders hub"],
    [Settings, "Settings", "Preferences on this device"],
    [HelpCircle, "Help & FAQ", "Booking tips & support"]
  ];

  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-4xl font-black">Profile</h1>
      <p className="mt-3 text-lg text-slate-500">Account & preferences</p>
      <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-premium">
        <div className="flex items-center gap-5 border-b p-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-emerald-100 text-emerald-700">
            <UserRound className="h-12 w-12" />
          </div>
          <div>
            <h2 className="text-2xl font-black">{profile.name}</h2>
            <p className="mt-1 text-slate-500">{profile.email}</p>
            <p className="mt-1 text-sm text-slate-400">{profile.mobile}</p>
          </div>
        </div>

        <div className="space-y-3 border-b p-5">
          <ProfileInput label="Favorite sport" value={profile.favoriteSport} onChange={(favoriteSport) => saveProfile({ ...profile, favoriteSport })} />
          <ProfileInput label="Address" value={profile.address} onChange={(address) => saveProfile({ ...profile, address })} />
        </div>

        {rows.map(([Icon, title, text]) => {
          const RowIcon = Icon;
          return (
            <button key={title as string} className="flex w-full items-center justify-between border-b p-5 text-left">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <RowIcon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xl font-black">{title as string}</p>
                  <p className="mt-1 text-slate-500">{text as string}</p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-slate-300" />
            </button>
          );
        })}

        <button
          onClick={() => {
            window.localStorage.removeItem("teamup-demo-session");
            window.location.href = "/choose?role=player";
          }}
          className="flex w-full items-center justify-between bg-red-50 p-5 text-left text-red-600"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
              <LogOut className="h-7 w-7" />
            </div>
            <p className="text-xl font-black">Sign out</p>
          </div>
          <ChevronRight className="h-6 w-6 text-red-200" />
        </button>
      </div>
    </section>
  );
}

function VenueDetail({
  venue,
  selectedDate,
  setSelectedDate,
  hours,
  setHours,
  selectedSlot,
  setSelectedSlot,
  onBack,
  onConfirm
}: {
  venue: Venue;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  hours: number;
  setHours: (hours: number) => void;
  selectedSlot: string;
  setSelectedSlot: (slot: string) => void;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <section className="mx-auto max-w-3xl px-5 py-8">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-3 text-2xl font-black">
          <ChevronLeft className="h-7 w-7" />
          {venue.name}
        </button>
        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-4 py-2 text-xl font-black text-amber-700">
          {venue.rating}
          <Star className="h-5 w-5 fill-current" />
        </span>
      </div>

      <div className="relative mt-7 h-80 overflow-hidden rounded-[2rem]">
        <Image src={venue.image} alt={venue.name} fill className="object-cover" sizes="(min-width: 768px) 720px, 100vw" />
        <button className="absolute left-5 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/70">
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button className="absolute right-5 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/70">
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      <p className="mt-6 flex items-center gap-3 text-xl text-slate-500">
        <MapPin className="h-7 w-7 text-teal-600" />
        {venue.address}
      </p>

      <h2 className="mt-8 text-xl font-black">Amenities</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {venue.amenities.map((amenity) => (
          <span key={amenity} className="rounded-full bg-teal-600 px-5 py-3 font-bold text-white">
            {amenity}
          </span>
        ))}
      </div>

      <div className="mt-8 rounded-[2rem] border border-emerald-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xl font-black">
            <CalendarDays className="h-7 w-7 text-emerald-700" />
            Select Booking Date:
          </div>
          <div className="relative">
            <button onClick={() => setShowCalendar((value) => !value)} className="rounded-full bg-green-600 px-5 py-3 font-black text-white">
              {formatDateLabel(selectedDate)}
            </button>
            {showCalendar && (
              <div className="absolute right-0 top-14 z-20 rounded-[1.5rem] border border-emerald-100 bg-white p-4 shadow-premium">
                <input
                  type="date"
                  min={todayDateValue}
                  value={selectedDate}
                  onChange={(event) => {
                    setSelectedDate(event.target.value);
                    setShowCalendar(false);
                  }}
                  className="rounded-full border border-emerald-100 px-4 py-3 text-sm font-bold text-slate-800 outline-none"
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-[1.5rem] bg-green-100 p-2">
          <div className="flex items-center gap-3 text-xl font-black">
            <Clock className="h-7 w-7 text-emerald-700" />
            Select Booking Hours:
          </div>
          <div className="flex items-center overflow-hidden rounded-xl border border-green-600">
            <button className="h-10 w-12 bg-green-50 text-2xl font-black" onClick={() => setHours(Math.max(1, hours - 1))}>-</button>
            <span className="flex h-10 w-12 items-center justify-center bg-green-600 text-xl font-black text-white">{hours}</span>
            <button className="h-10 w-12 bg-green-50 text-2xl font-black" onClick={() => setHours(hours + 1)}>+</button>
          </div>
        </div>
      </div>

      <Button className="mt-8 h-16 w-full rounded-full bg-teal-600 text-2xl hover:bg-teal-700" disabled={!selectedSlot} onClick={onConfirm}>
        {selectedSlot ? "Book Selected Slot" : "Find Slots"}
      </Button>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {venue.slots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            className={`rounded-2xl px-4 py-5 text-xl font-black ${
              selectedSlot === slot ? "bg-emerald-800 text-white" : "bg-teal-600 text-white"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </section>
  );
}

function VenueCard({ venue, onClick, compact = false }: { venue: Venue; onClick: () => void; compact?: boolean }) {
  return (
    <button onClick={onClick} className="w-full overflow-hidden rounded-[2rem] bg-white text-left shadow-premium">
      <div className={`relative ${compact ? "h-44" : "h-64"}`}>
        <Image src={venue.image} alt={venue.name} fill className="object-cover" sizes="(min-width: 768px) 720px, 100vw" />
        <span className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-amber-400 px-4 py-2 text-lg font-black text-white">
          {venue.rating}
          <Star className="h-5 w-5 fill-current" />
        </span>
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-black">{venue.name}</h2>
        <p className="mt-2 flex items-center gap-2 text-lg text-slate-500">
          <MapPin className="h-5 w-5 text-slate-400" />
          {venue.address}
        </p>
        <p className="mt-2 text-slate-400">{venue.reviews}</p>
        <p className={`${compact ? "mt-2 text-lg" : "mt-4 text-2xl"} font-black text-teal-700`}>Rs {venue.price}/hour</p>
      </div>
    </button>
  );
}

function BottomNav({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) {
  const items = [
    { id: "home" as Tab, label: "Home", icon: Home },
    { id: "discover" as Tab, label: "Discover", icon: Compass },
    { id: "bookings" as Tab, label: "Bookings", icon: CalendarDays },
    { id: "profile" as Tab, label: "Profile", icon: UserRound }
  ];
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 grid w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 grid-cols-4 rounded-[1.5rem] bg-white p-2 shadow-premium">
      {items.map((item) => (
        <button key={item.id} onClick={() => setTab(item.id)} className={`flex flex-col items-center gap-0.5 rounded-2xl py-1.5 text-xs font-bold ${tab === item.id ? "text-teal-600" : "text-slate-400"}`}>
          <item.icon className="h-5 w-5" />
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function ProfileInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block rounded-[1.5rem] bg-emerald-50 p-3">
      <span className="text-xs font-black text-emerald-700">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full bg-transparent text-sm font-bold outline-none" placeholder={`Add ${label.toLowerCase()}`} />
    </label>
  );
}

function LocationPopup({
  typedLocation,
  setTypedLocation,
  onUseCurrent,
  onSave,
  onClose
}: {
  typedLocation: string;
  setTypedLocation: (value: string) => void;
  onUseCurrent: () => void;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/45 px-4 pb-4 backdrop-blur-sm sm:items-center sm:pb-0">
      <section className="w-full max-w-md rounded-[2rem] bg-white p-5 shadow-premium">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-emerald-700">Location</p>
            <h2 className="mt-1 text-2xl font-black">Add your playing area</h2>
            <p className="mt-2 text-sm text-slate-500">Use current location demo or type your address.</p>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
            <X className="h-4 w-4" />
          </button>
        </div>
        <button onClick={onUseCurrent} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-700 text-sm font-black text-white">
          <LocateFixed className="h-4 w-4" />
          Use Current Location
        </button>
        <label className="mt-4 block rounded-[1.5rem] border border-emerald-100 p-4">
          <span className="text-xs font-black text-emerald-700">Type address</span>
          <input value={typedLocation} onChange={(event) => setTypedLocation(event.target.value)} className="mt-2 w-full bg-transparent text-sm font-bold outline-none" placeholder="Enter your address" />
        </label>
        <Button className="mt-4 w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 disabled:text-slate-500" disabled={!typedLocation.trim()} onClick={onSave}>
          Save Location
        </Button>
      </section>
    </div>
  );
}
