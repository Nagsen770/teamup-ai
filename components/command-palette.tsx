"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Bot, CalendarDays, MapPin, Search, ShieldCheck, Trophy } from "lucide-react";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

const actions = [
  { href: "/discover", label: "Find nearby turfs", icon: MapPin },
  { href: "/dashboard", label: "Open player dashboard", icon: CalendarDays },
  { href: "/tournaments", label: "Generate tournament", icon: Trophy },
  { href: "/admin", label: "Review admin queue", icon: ShieldCheck },
  { href: "/dashboard", label: "Ask TEAMUP Copilot", icon: Bot }
];

export function CommandPalette() {
  const { commandOpen, setCommandOpen } = useAppStore();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(!commandOpen);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commandOpen, setCommandOpen]);

  return (
    <Dialog.Root open={commandOpen} onOpenChange={setCommandOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-slate-950/45 backdrop-blur-sm" />
        <Dialog.Content className="glass fixed left-1/2 top-24 z-[90] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 rounded-3xl p-3">
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <div className="flex items-center gap-3 border-b px-3 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              placeholder="Search actions, turfs, tournaments, players..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="mt-2 space-y-1">
            {actions.map((action) => (
              <Dialog.Close asChild key={action.label}>
                <Link href={action.href} className="flex items-center gap-3 rounded-3xl px-3 py-3 text-sm font-medium transition hover:bg-accent">
                  <action.icon className="h-4 w-4 text-primary" />
                  {action.label}
                </Link>
              </Dialog.Close>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
