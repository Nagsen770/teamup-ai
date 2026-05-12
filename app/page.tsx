"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, MapPin, ShieldCheck, Sparkles, Star, Trophy, UsersRound } from "lucide-react";

const venues = [
  {
    title: "Football Turfs",
    area: "5v5, 7v7 and full-ground play",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Cricket Nets",
    area: "Box cricket, nets and weekend leagues",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Swimming Pools",
    area: "Training lanes and recreational pools",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Badminton Courts",
    area: "Indoor courts and coaching spaces",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80"
  }
];

const features = [
  { icon: CalendarCheck, title: "Book slots", text: "Find a venue, pick a date and time, and reserve instantly." },
  { icon: UsersRound, title: "Team up", text: "Discover players, join matches, and build regular squads." },
  { icon: ShieldCheck, title: "Owner ready", text: "Turf owners can manage slots, bookings, pricing, and terms." }
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 }
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5fbf6] text-slate-950">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/20 bg-emerald-950/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 text-white">
            <Image src="/teamup-logo.jpeg" alt="TeamUP logo" width={46} height={46} className="rounded-2xl object-cover" priority />
            <span className="text-xl font-black tracking-normal">TeamUP</span>
          </Link>
          <Link
            href="/choose"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-emerald-800 shadow-premium transition hover:-translate-y-0.5"
          >
            Sign in / Log in
          </Link>
        </nav>
      </header>

      <section className="relative bg-emerald-800 pt-24 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(34,197,94,0.34),transparent_26rem),linear-gradient(135deg,rgba(6,95,70,0.96),rgba(4,120,87,0.86))]" />
        <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles className="h-4 w-4 text-emerald-200" />
              Sports venues, teams, and bookings in one place
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-normal sm:text-6xl lg:text-7xl">
              Play more. Book faster. Team up anywhere.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50/85">
              TeamUP helps players discover turfs, pools, courts, and sports venues nearby while helping venue owners manage
              bookings, slots, terms, and earnings.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/choose"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-black text-emerald-800 shadow-premium transition hover:-translate-y-1"
              >
                Get started
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#venues"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/30 px-7 text-base font-black text-white transition hover:bg-white/10"
              >
                Explore venues
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {venues.map((venue, index) => (
              <motion.article
                key={venue.title}
                animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
                className="overflow-hidden rounded-[2rem] bg-white text-slate-950 shadow-premium"
              >
                <div className="relative h-44">
                  <Image src={venue.image} alt={venue.title} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
                </div>
                <div className="p-4">
                  <h2 className="font-black">{venue.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">{venue.area}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="venues" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <p className="font-black text-emerald-700">What is TeamUP?</p>
          <h2 className="mt-3 text-4xl font-black tracking-normal">A booking and community layer for every sports venue.</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Players can book, join games, and find teammates. Turf owners can list venues, manage slots, add rules, and grow revenue.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              {...fadeUp}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-[2rem] bg-white p-6 shadow-premium"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-black">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <motion.div {...fadeUp}>
            <p className="font-black text-emerald-700">Available on TeamUP</p>
            <h2 className="mt-3 text-4xl font-black tracking-normal">From football turfs to swimming pools.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Promote and discover multiple sports venues with clear slots, ratings, pricing, amenities, and booking actions.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {venues.map((venue) => (
              <motion.div key={venue.title} {...fadeUp} className="flex items-center gap-4 rounded-[2rem] bg-[#f5fbf6] p-3">
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-[1.5rem]">
                  <Image src={venue.image} alt={venue.title} fill className="object-cover" sizes="96px" />
                </div>
                <div>
                  <p className="font-black">{venue.title}</p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="h-4 w-4 text-emerald-700" />
                    Near you
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-800 p-8 text-white shadow-premium sm:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:42px_42px]" />
          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-emerald-200" />
                <p className="font-black">Ready to start?</p>
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-normal">Choose player or turf owner and enter TeamUP.</h2>
            </div>
            <Link
              href="/choose"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-7 font-black text-emerald-800"
            >
              Continue
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 text-sm text-slate-500 sm:px-6 md:flex-row lg:px-8">
          <p>TeamUP AI - sports booking for players and venue owners.</p>
          <div className="flex items-center gap-2 text-emerald-700">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-bold">Turfs, pools, courts, teams, and matches</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
