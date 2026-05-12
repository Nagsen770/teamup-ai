"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Chrome, Mail, Phone, UserRound } from "lucide-react";

type DemoRole = "player" | "owner";

const roleLabels: Record<DemoRole, string> = {
  player: "Player",
  owner: "Turf Owner"
};

export default function ChoosePage() {
  const searchParams = useSearchParams();
  const roleFromUrl = searchParams.get("role");
  const [role, setRole] = useState<DemoRole | "">("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (roleFromUrl === "player" || roleFromUrl === "owner") {
      setRole(roleFromUrl);
    }
  }, [roleFromUrl]);

  const destination = role === "owner" ? "/owner" : "/player";
  const canContinue = Boolean(role && name.trim() && /^[0-9]{10}$/.test(mobile.trim()) && /\S+@\S+\.\S+/.test(email.trim()));

  const saveSession = (method: "google" | "credentials") => {
    if (!role) {
      setError("Select Player or Turf Owner first.");
      return;
    }

    if (method === "credentials" && !canContinue) {
      setError("Fill name, 10 digit mobile number, and valid email.");
      return;
    }

    window.localStorage.setItem(
      "teamup-demo-session",
      JSON.stringify({
        role,
        name: name || "Google User",
        mobile,
        email: email || "google.user@teamup.ai",
        method
      })
    );
    window.location.href = destination;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-emerald-700">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,95,70,0.34)_0_12.5%,rgba(16,185,129,0.22)_12.5%_25%,rgba(6,95,70,0.28)_25%_37.5%,rgba(16,185,129,0.18)_37.5%_50%,rgba(6,95,70,0.28)_50%_62.5%,rgba(16,185,129,0.22)_62.5%_75%,rgba(6,95,70,0.34)_75%_87.5%,rgba(16,185,129,0.18)_87.5%_100%)]" />
      <div className="pointer-events-none absolute inset-4 rounded-[2rem] border-2 border-white/70 sm:inset-8" />
      <div className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-0.5 bg-white/55 lg:block" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full border-2 border-white/55 lg:block" />
      <div className="pointer-events-none absolute right-8 top-1/2 hidden h-72 w-36 -translate-y-1/2 rounded-l-full border-y-2 border-l-2 border-white/60 lg:block" />

      <section className="relative z-10 grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative flex min-h-[38vh] items-center bg-white px-8 py-12 text-slate-950 lg:min-h-screen lg:[clip-path:polygon(0_0,82%_0,100%_100%,0_100%)] lg:pl-16 lg:pr-28">
          <div className="max-w-xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-700">TEAMUP AI</p>
            <h1 className="mt-4 text-6xl font-black italic tracking-normal text-slate-950 sm:text-7xl lg:text-8xl">
              TEAMUP AI
            </h1>
            <p className="mt-5 max-w-md text-2xl font-black leading-tight text-emerald-700 sm:text-3xl">
              Book. Play. Connect.
            </p>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-500">
              Select a role, then sign in to enter the workspace.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-8 lg:py-0">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {(["player", "owner"] as DemoRole[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setRole(item);
                    setError("");
                  }}
                  className={`flex h-14 w-44 items-center justify-center rounded-full border text-base font-black shadow-premium transition hover:-translate-y-1 ${
                    role === item
                      ? "border-emerald-200 bg-emerald-950 text-white"
                      : "border-white bg-white text-emerald-800"
                  }`}
                >
                  {roleLabels[item]}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveSession("credentials");
              }}
              className="mt-6 rounded-[2rem] bg-white p-5 shadow-premium sm:p-6"
            >
              <button
                type="button"
                onClick={() => saveSession("google")}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-emerald-100 bg-emerald-50 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
              >
                <Chrome className="h-4 w-4" />
                Continue with Google
              </button>

              <div className="my-5 h-px bg-emerald-100" />

              <label className="flex items-center gap-3 rounded-full border border-emerald-100 bg-white px-4 py-3">
                <UserRound className="h-4 w-4 text-emerald-700" />
                <input value={name} onChange={(event) => setName(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Name" />
              </label>

              <label className="mt-3 flex items-center gap-3 rounded-full border border-emerald-100 bg-white px-4 py-3">
                <Phone className="h-4 w-4 text-emerald-700" />
                <input value={mobile} onChange={(event) => setMobile(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Mobile number" />
              </label>

              <label className="mt-3 flex items-center gap-3 rounded-full border border-emerald-100 bg-white px-4 py-3">
                <Mail className="h-4 w-4 text-emerald-700" />
                <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Email address" />
              </label>

              {error && <p className="mt-3 rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={!canContinue}
                className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-emerald-700 text-sm font-black text-white transition hover:bg-emerald-800 disabled:bg-slate-200 disabled:text-slate-500"
              >
                Continue as {role ? roleLabels[role] : "selected role"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
