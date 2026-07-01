import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.REVALIDATE_SECRET;

const TAGS_BY_MODEL: Record<string, string[]> = {
  "nastavenia-webu":  ["nastavenia-webu"],
  "stranka":          ["stranky"],
  "textova-stranka":  ["textove-stranky"],
  "material":         ["materialy"],
  "aktualita":        ["aktuality"],
  "dopyt":            [],
};

export async function POST(req: NextRequest) {
  if (!SECRET) {
    console.error("[revalidate] REVALIDATE_SECRET not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { event?: string; model?: string; entry?: { slug?: string } };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { model, entry } = body;

  if (!model || !(model in TAGS_BY_MODEL)) {
    return NextResponse.json({ skipped: true, model }, { status: 200 });
  }

  const tags = [...TAGS_BY_MODEL[model]];

  if (model === "material" && entry?.slug) tags.push(`material:${entry.slug}`);
  if (model === "aktualita" && entry?.slug) tags.push(`aktualita:${entry.slug}`);
  if (model === "stranka" && entry?.slug) tags.push(`stranka:${entry.slug}`);

  tags.forEach(revalidateTag);

  console.log(`[revalidate] model=${model} tags=${tags.join(", ")}`);
  return NextResponse.json({ revalidated: true, model, tags });
}
