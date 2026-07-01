import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://127.0.0.1:1337";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${STRAPI_URL}/api/dopyty`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
