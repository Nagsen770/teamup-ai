"use client";

import { useEffect, useState } from "react";

type DemoRole = "player" | "owner";

export function AuthGate({ role, children }: { role: DemoRole; children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem("teamup-demo-session");
    if (!raw) {
      window.location.href = `/choose?role=${role}`;
      return;
    }

    try {
      const session = JSON.parse(raw) as { role?: DemoRole };
      if (session.role === role) {
        setAllowed(true);
      } else {
        window.location.href = `/choose?role=${role}`;
      }
    } catch {
      window.localStorage.removeItem("teamup-demo-session");
      window.location.href = `/choose?role=${role}`;
    }
  }, [role]);

  if (!allowed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5fbf6] text-sm font-bold text-emerald-800">
        Checking access...
      </main>
    );
  }

  return <>{children}</>;
}
