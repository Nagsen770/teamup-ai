"use client";

import { useState } from "react";
import { AlertTriangle, Bot, CheckCircle2, FileText, ShieldCheck, Users } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { MetricCard } from "@/components/metric-card";
import { Button } from "@/components/ui/button";
import { adminRows } from "@/lib/data";

export default function AdminPage() {
  const [rows, setRows] = useState(adminRows);
  const [reviewNote, setReviewNote] = useState("Select a turf to preview verification details.");
  const approveAll = () => {
    setRows((current) => current.map((row) => ({ ...row, status: "Verified", risk: "Low" })));
    setReviewNote("All visible demo turfs approved. Admin queue updated.");
  };

  return (
    <DashboardShell
      title="Admin Control Center"
      subtitle="Verify turfs, moderate communities, inspect fraud signals, manage users, and review platform analytics."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Users" value="82,400" delta="+14%" icon={Users} />
        <MetricCard label="Turf approvals" value="37" delta="12 pending" icon={ShieldCheck} />
        <MetricCard label="AI flags" value="18" delta="-8%" icon={Bot} />
        <MetricCard label="Reports" value="126" delta="+6%" icon={FileText} />
      </div>

      <section className="glass mt-6 overflow-hidden rounded-3xl">
        <div className="flex flex-col justify-between gap-3 border-b p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-black">Turf verification queue</h2>
            <p className="text-sm text-muted-foreground">Owner documents, fraud score, revenue signal, and admin actions.</p>
          </div>
          <Button onClick={approveAll}>
            <CheckCircle2 className="h-4 w-4" />
            Approve selected
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-muted/70 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Turf</th>
                <th className="px-5 py-3">Owner</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Risk</th>
                <th className="px-5 py-3">Revenue</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.turf} className="border-t">
                  <td className="px-5 py-4 font-semibold">{row.turf}</td>
                  <td className="px-5 py-4 text-muted-foreground">{row.owner}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{row.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      {row.risk}
                    </span>
                  </td>
                  <td className="px-5 py-4">{row.revenue}</td>
                  <td className="px-5 py-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setReviewNote(`${row.turf}: documents checked, owner verified, revenue signal ${row.revenue}.`)}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass mt-6 rounded-3xl p-5">
        <h2 className="text-xl font-black">Review panel</h2>
        <p className="mt-2 text-sm text-muted-foreground">{reviewNote}</p>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {[
          ["AI moderation", "Detect spam invites, fake reviews, abusive comments, and suspicious booking behavior."],
          ["CMS controls", "Feature flags, hero content, pricing packs, trusted-by logos, and testimonial management."],
          ["Platform health", "Realtime slot sync, payment success rate, map usage, and API latency monitoring."]
        ].map(([title, text]) => (
          <div key={title} className="glass rounded-3xl p-5">
            <h3 className="font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
