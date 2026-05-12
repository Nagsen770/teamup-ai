import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-emerald-700 px-4">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,95,70,0.34)_0_12.5%,rgba(16,185,129,0.22)_12.5%_25%,rgba(6,95,70,0.28)_25%_37.5%,rgba(16,185,129,0.18)_37.5%_50%,rgba(6,95,70,0.28)_50%_62.5%,rgba(16,185,129,0.22)_62.5%_75%,rgba(6,95,70,0.34)_75%_87.5%,rgba(16,185,129,0.18)_87.5%_100%)]" />
      <div className="pointer-events-none absolute inset-4 rounded-[2rem] border-2 border-white/85 sm:inset-8" />
      <div className="pointer-events-none absolute left-1/2 top-4 h-[calc(100%-2rem)] w-0.5 -translate-x-1/2 bg-white/80 sm:top-8 sm:h-[calc(100%-4rem)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80 sm:h-52 sm:w-52" />
      <div className="pointer-events-none absolute left-4 top-1/2 h-48 w-20 -translate-y-1/2 rounded-r-full border-y-2 border-r-2 border-white/80 sm:left-8 sm:h-72 sm:w-36" />
      <div className="pointer-events-none absolute right-4 top-1/2 h-48 w-20 -translate-y-1/2 rounded-l-full border-y-2 border-l-2 border-white/80 sm:right-8 sm:h-72 sm:w-36" />
      <div className="pointer-events-none absolute left-4 top-1/2 h-24 w-10 -translate-y-1/2 rounded-r-full border-y-2 border-r-2 border-white/70 sm:left-8 sm:h-40 sm:w-20" />
      <div className="pointer-events-none absolute right-4 top-1/2 h-24 w-10 -translate-y-1/2 rounded-l-full border-y-2 border-l-2 border-white/70 sm:right-8 sm:h-40 sm:w-20" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/85" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-12 w-12 rounded-bl-[2rem] border-b-2 border-l-2 border-white/75 sm:bottom-8 sm:left-8" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-12 w-12 rounded-br-[2rem] border-b-2 border-r-2 border-white/75 sm:bottom-8 sm:right-8" />
      <div className="pointer-events-none absolute left-4 top-4 h-12 w-12 rounded-tl-[2rem] border-l-2 border-t-2 border-white/75 sm:left-8 sm:top-8" />
      <div className="pointer-events-none absolute right-4 top-4 h-12 w-12 rounded-tr-[2rem] border-r-2 border-t-2 border-white/75 sm:right-8 sm:top-8" />

      <div className="relative z-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
        <Link
          href="/player"
          className="flex h-16 w-48 items-center justify-center rounded-full border border-white bg-white text-lg font-black text-emerald-800 shadow-premium transition hover:-translate-y-1 hover:shadow-glow"
        >
          Player
        </Link>
        <Link
          href="/owner"
          className="flex h-16 w-48 items-center justify-center rounded-full border border-white bg-white text-lg font-black text-emerald-800 shadow-premium transition hover:-translate-y-1 hover:shadow-glow"
        >
          Turf Owner
        </Link>
      </div>
    </main>
  );
}
