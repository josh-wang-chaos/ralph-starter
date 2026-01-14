import { notFound } from "next/navigation";

import { env } from "@/lib/env";

export default function HealthPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-zinc-900">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Health</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Local configuration is loaded.
        </p>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-lg bg-zinc-100 px-4 py-3">
            <dt className="font-medium text-zinc-600">LEGACY_API_BASE_URL</dt>
            <dd className="font-mono text-xs text-zinc-900">
              {env.legacyApiBaseUrl}
            </dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
