"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Chrome, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "player@teamup.ai", password: "teamupdemo" }
  });

  const onSubmit = form.handleSubmit(() => {
    window.location.href = "/player";
  });

  return (
    <main className="grid min-h-screen lg:grid-cols-[1fr_0.95fr]">
      <section className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <p className="font-semibold text-primary">Secure access</p>
            <h1 className="mt-2 text-4xl font-black">Sign in to TEAMUP AI</h1>
            <p className="mt-3 text-muted-foreground">Role-aware authentication for players, turf owners, and admins.</p>
          </div>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold">Email</span>
              <input
                {...form.register("email")}
                className="mt-2 w-full rounded-3xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
              />
              {form.formState.errors.email && <p className="mt-1 text-sm text-red-500">Enter a valid email.</p>}
            </label>
            <label className="block">
              <span className="text-sm font-semibold">Password</span>
              <input
                type="password"
                {...form.register("password")}
                className="mt-2 w-full rounded-3xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
              />
              {form.formState.errors.password && <p className="mt-1 text-sm text-red-500">Use at least 8 characters.</p>}
            </label>
            <Button className="w-full" size="lg" type="submit">
              <Mail className="h-4 w-4" />
              Continue with email
            </Button>
          </form>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Button variant="secondary" onClick={() => (window.location.href = "/player")}>
              <Chrome className="h-4 w-4" />
              Google
            </Button>
            <Button variant="secondary" onClick={() => (window.location.href = "/owner")}>
              <ShieldCheck className="h-4 w-4" />
              Owner demo
            </Button>
          </div>
        </div>
      </section>
      <section className="field-grid hidden items-center justify-center bg-emerald-700 p-8 text-white lg:flex">
        <div className="max-w-lg rounded-3xl bg-black/35 p-8 backdrop-blur">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-200">Player / Owner / Admin</p>
          <h2 className="mt-4 text-5xl font-black">One secure identity for the sports graph.</h2>
          <p className="mt-5 leading-7 text-white/78">
            NextAuth, Google Sign-In, credentials auth, OTP-ready flow, role permissions, and protected APIs are wired for
            production deployment.
          </p>
        </div>
      </section>
    </main>
  );
}
