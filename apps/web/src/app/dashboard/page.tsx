import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const getBaseUrl = async () => {
  const headerStore = await headers();
  const host =
    headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "http";

  if (!host) return null;
  return `${proto}://${host}`;
};

const parseLegacyPayload = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json().catch(() => null);
  }

  return response.text().catch(() => null);
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  const baseUrl = await getBaseUrl();
  let legacyStatus: string | null = null;
  let legacyDetail: string | null = null;

  if (baseUrl) {
    try {
      const response = await fetch(`${baseUrl}/api/legacy/health`, {
        method: "GET",
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const payload = await parseLegacyPayload(response);

      if (response.ok && payload && typeof payload === "object") {
        const statusValue = (payload as { status?: string }).status;
        const detailValue = (payload as { message?: string }).message;
        legacyStatus = statusValue ?? null;
        legacyDetail = detailValue ?? null;
      }
    } catch {
      legacyStatus = null;
    }
  }

  const statusLabel = legacyStatus ?? "Unavailable";

  return (
    <div
      className={`${bodyFont.className} min-h-screen bg-[radial-gradient(circle_at_top,_rgba(20,83,45,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(251,191,36,0.2),_transparent_55%)] bg-zinc-950 text-zinc-100`}
    >
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-emerald-200/70">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            Affiliate Dashboard
          </div>
          <div className="flex flex-col gap-3">
            <h1
              className={`${displayFont.className} text-4xl font-semibold leading-tight sm:text-5xl`}
            >
              Momentum overview
            </h1>
            <p className="max-w-2xl text-base text-zinc-300">
              A quick pulse on the legacy system and the next actions for your
              affiliate portfolio.
            </p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-emerald-200/20 bg-zinc-900/80 p-8 shadow-[0_24px_70px_rgba(16,185,129,0.15)]">
            <h2 className="text-lg font-semibold">Legacy sync</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Pulled live via the legacy proxy route.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <div className="rounded-2xl border border-emerald-200/20 bg-emerald-200/10 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
                  Status
                </p>
                <p className="mt-2 text-2xl font-semibold text-emerald-100">
                  {statusLabel}
                </p>
                <p className="mt-3 text-sm text-emerald-50/70">
                  {legacyDetail ?? "Legacy service status feed."}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Session
                </p>
                <p className="mt-2 text-sm text-zinc-200">
                  Active session detected. Proxy requests include your cookie.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
            <h2 className="text-lg font-semibold">Today</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Placeholder highlights while we connect more feeds.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  label: "Next payout window",
                  value: "48 hours",
                },
                {
                  label: "New referrals",
                  value: "12 pending",
                },
                {
                  label: "Highest commission",
                  value: "$4,260",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-4 text-sm"
                >
                  <span className="text-zinc-400">{item.label}</span>
                  <span className="font-semibold text-zinc-100">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
