"use client";

import { type FormEvent, useState } from "react";
import { Fraunces, Manrope } from "next/font/google";

import type { LoginRequest, LoginResponse } from "@/lib/auth/types";

const headingFont = Fraunces({
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const payload: LoginRequest = {
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
    };

    if (!payload.email || !payload.password) {
      setError("Email and password are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const raw = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message =
          typeof raw === "object" && raw && "error" in raw
            ? String((raw as { error?: string }).error ?? "Login failed.")
            : "Login failed.";
        setError(message);
        return;
      }

      const data = raw as LoginResponse;
      setSuccess(`Welcome back, ${data.user?.name ?? payload.email}.`);
    } catch {
      setError("Unable to reach the login service.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={`${bodyFont.className} relative min-h-screen bg-zinc-950`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-amber-300/20 blur-3xl" />
      </div>
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6 text-zinc-100">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
              Affiliate Portal
            </p>
            <h1
              className={`${headingFont.className} text-4xl font-semibold leading-tight sm:text-5xl`}
            >
              Sign in to keep your commissions moving.
            </h1>
            <p className="max-w-lg text-base leading-7 text-zinc-300">
              Connect to the legacy system securely, then pick up the latest
              payouts, referrals, and status updates in one place.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-zinc-400">
              <span className="rounded-full border border-zinc-800 px-3 py-1">
                Legacy-connected
              </span>
              <span className="rounded-full border border-zinc-800 px-3 py-1">
                Local demo
              </span>
              <span className="rounded-full border border-zinc-800 px-3 py-1">
                Session cookie
              </span>
            </div>
          </section>
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Login</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Use your legacy portal credentials.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-4 text-zinc-100"
            >
              <label className="flex flex-col gap-2 text-sm text-zinc-300">
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/30"
                  placeholder="you@affiliate.co"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-zinc-300">
                Password
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/30"
                  placeholder="••••••••"
                />
              </label>
              <LoginButton isSubmitting={isSubmitting} />
              <LoginFeedback error={error} success={success} />
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

function LoginButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isSubmitting ? "Signing in..." : "Sign in"}
    </button>
  );
}

function LoginFeedback({
  error,
  success,
}: {
  error: string | null;
  success: string | null;
}) {
  return (
    <div className="min-h-[1.25rem] text-xs" aria-live="polite">
      {error ? (
        <p className="text-rose-300">{error}</p>
      ) : success ? (
        <p className="text-emerald-200">{success}</p>
      ) : (
        <p className="text-zinc-500">
          Session will be stored in a secure HTTP-only cookie.
        </p>
      )}
    </div>
  );
}
