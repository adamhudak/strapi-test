import type { StrapiResponse } from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
const isDev = process.env.NODE_ENV === "development";

interface FetchOptions {
  revalidate?: number;
  tags?: string[];
}

export async function strapiFetch<T>(
  path: string,
  query = "",
  { revalidate = 3600, tags }: FetchOptions = {}
): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}${query}`, {
    headers: {
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    },
    next: isDev ? { revalidate: 0 } : { revalidate, tags },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${path} (${res.status})`);
  }

  const json = (await res.json()) as StrapiResponse<T>;
  return json.data;
}

export function strapiMediaUrl(url?: string | null): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

import type {
  Material,
  Aktualita,
  Stranka,
  TextovaStranka,
  NastaveniaWebu,
} from "./types";

export const getMaterialy = (kategoria?: string) =>
  strapiFetch<Material[]>(
    "/materialy",
    `?populate=*${kategoria ? `&filters[kategoria][$eq]=${kategoria}` : ""}`,
    { tags: ["materialy"] }
  );

export const getMaterialBySlug = (slug: string) =>
  strapiFetch<Material[]>(
    "/materialy",
    `?filters[slug][$eq]=${slug}&populate=*`,
    { tags: ["materialy", `material:${slug}`] }
  ).then((arr) => arr[0]);

export const getAktuality = async (page = 1, pageSize = 9) => {
  const res = await fetch(
    `${STRAPI_URL}/api/aktuality?populate=*&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      headers: { ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}) },
      next: isDev ? { revalidate: 0 } : { revalidate: 60, tags: ["aktuality"] },
    }
  );
  if (!res.ok) throw new Error(`getAktuality failed (${res.status})`);
  const json = (await res.json()) as { data: Aktualita[]; meta: { pagination: { pageCount: number; total: number } } };
  return { items: json.data, pageCount: json.meta.pagination.pageCount, total: json.meta.pagination.total };
};

export const getAktualitaBySlug = (slug: string) =>
  strapiFetch<Aktualita[]>(
    "/aktuality",
    `?filters[slug][$eq]=${slug}&populate=*`,
    { tags: ["aktuality", `aktualita:${slug}`] }
  ).then((arr) => arr[0]);

export const getNastaveniaWebu = () =>
  strapiFetch<NastaveniaWebu>(
    "/nastavenia-webu",
    "?populate[navigacia]=*&populate[footerKolony][populate][links]=*",
    { revalidate: 3600, tags: ["nastavenia-webu"] }
  );

export const getStranky = () =>
  strapiFetch<Stranka[]>("/stranky", "", { tags: ["stranky"] });

// Strapi v5: Dynamic Zone requires explicit per-component "on" populate
const STRANKA_POPULATE =
  "?populate[sekcie][on][bloky.hero-blok][populate]=*" +
  "&populate[sekcie][on][bloky.logo-slider-blok][populate][partneri][populate]=*" +
  "&populate[sekcie][on][bloky.benefits-grid-blok][populate][polozky]=*" +
  "&populate[sekcie][on][bloky.faq-blok][populate][polozky]=*" +
  "&populate[sekcie][on][bloky.galeria-blok][populate][fotky][populate]=*" +
  "&populate[sekcie][on][bloky.aktuality-preview-blok]=*" +
  "&populate[sekcie][on][bloky.cta-blok]=*" +
  "&populate[sekcie][on][bloky.contact-form-blok]=*";

const HOMEPAGE_POPULATE =
  "?populate[homepage][populate][sekcie][on][bloky.hero-blok][populate]=*" +
  "&populate[homepage][populate][sekcie][on][bloky.logo-slider-blok][populate][partneri][populate]=*" +
  "&populate[homepage][populate][sekcie][on][bloky.benefits-grid-blok][populate][polozky]=*" +
  "&populate[homepage][populate][sekcie][on][bloky.faq-blok][populate][polozky]=*" +
  "&populate[homepage][populate][sekcie][on][bloky.galeria-blok][populate][fotky][populate]=*" +
  "&populate[homepage][populate][sekcie][on][bloky.aktuality-preview-blok]=*" +
  "&populate[homepage][populate][sekcie][on][bloky.cta-blok]=*" +
  "&populate[homepage][populate][sekcie][on][bloky.contact-form-blok]=*";

export const getHomepageStranka = () =>
  strapiFetch<{ homepage: Stranka | null }>(
    "/nastavenia-webu",
    HOMEPAGE_POPULATE,
    { tags: ["nastavenia-webu", "stranky"] }
  ).then((data) => data.homepage);

export const getStrankaBySlug = (slug: string) =>
  strapiFetch<Stranka[]>(
    "/stranky",
    `${STRANKA_POPULATE}&filters[slug][$eq]=${slug}`,
    { tags: ["stranky", `stranka:${slug}`] }
  ).then((arr) => arr[0]);

export const getTextoveStranky = () =>
  strapiFetch<TextovaStranka[]>("/textove-stranky", "", { tags: ["textove-stranky"] });

export const getTextovaStrakaBySlug = (slug: string) =>
  strapiFetch<TextovaStranka[]>(
    "/textove-stranky",
    `?filters[slug][$eq]=${slug}&populate=*`,
    { tags: ["textove-stranky", `textova-stranka:${slug}`] }
  ).then((arr) => arr[0]);
