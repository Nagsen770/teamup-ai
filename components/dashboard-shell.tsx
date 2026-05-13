"use client";

import Link from "next/link";
import { Navigation } from "@/components/navigation";

export function DashboardShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section aria-label={title} data-subtitle={subtitle}>
          {children}
        </section>
      </div>
    </main>
  );
}
