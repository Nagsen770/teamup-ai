import { LucideIcon } from "lucide-react";

export function MetricCard({ label, value, delta, icon: Icon }: { label: string; value: string; delta: string; icon: LucideIcon }) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-emerald-500/12 px-2 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-300">
          {delta}
        </span>
      </div>
      <p className="mt-5 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-black">{value}</p>
    </div>
  );
}
