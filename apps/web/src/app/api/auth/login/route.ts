import { NextResponse, type NextRequest } from "next/server";

import type { LoginRequest, LoginResponse } from "@/lib/auth/types";
import { env } from "@/lib/env";

const LOGIN_PATH = "/auth/login";

const isValidExpiresAt = (value?: string) => {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date;
};

export async function POST(request: NextRequest) {
  let body: LoginRequest;

  try {
    body = (await request.json()) as LoginRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body?.email || !body?.password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  let legacyResponse: Response;

  try {
    legacyResponse = await fetch(new URL(LOGIN_PATH, env.legacyApiBaseUrl), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json(
      { error: "Legacy authentication unavailable." },
      { status: 502 },
    );
  }

  const contentType = legacyResponse.headers.get("content-type") ?? "";
  let payload: unknown = null;

  if (contentType.includes("application/json")) {
    payload = await legacyResponse.json().catch(() => null);
  } else {
    const text = await legacyResponse.text().catch(() => "");
    payload = text ? { error: text } : null;
  }

  if (!legacyResponse.ok) {
    const message =
      typeof payload === "object" && payload && "error" in payload
        ? String((payload as { error: string }).error)
        : "Login failed.";

    return NextResponse.json({ error: message }, { status: legacyResponse.status });
  }

  const data = payload as LoginResponse | null;

  if (!data?.session?.token) {
    return NextResponse.json(
      { error: "Invalid login response." },
      { status: 502 },
    );
  }

  const response = NextResponse.json(data);

  response.cookies.set({
    name: "session",
    value: data.session.token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: isValidExpiresAt(data.session.expiresAt),
  });

  return response;
}
