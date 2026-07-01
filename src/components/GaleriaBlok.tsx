"use client";

import { useState, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { StrapiMedia } from "@/lib/types";
import { strapiMediaUrl } from "@/lib/strapi";

interface GaleriaData {
  nadpis?: string;
  fotky?: { obrazok: StrapiMedia; popis?: string | null }[];
}

export default function GaleriaBlok({ data }: { data?: GaleriaData | null }) {
  const [index, setIndex] = useState(-1);

  const nadpis = data?.nadpis ?? "Galéria";
  const fotky = data?.fotky ?? [];

  if (!fotky.length) return null;

  const slides = fotky.map((f) => ({
    src: strapiMediaUrl(f.obrazok.url),
    alt: f.popis ?? "",
    width: f.obrazok.width,
    height: f.obrazok.height,
  }));

  const open = useCallback((i: number) => setIndex(i), []);

  return (
    <section className="py-24">
      <div className="wrap">
        <div className="mb-11">
          <h2 className="display-h2">{nadpis}</h2>
        </div>

        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          {fotky.map((f, i) => (
            <button
              key={i}
              className="group relative aspect-[4/3] overflow-hidden bg-concrete"
              onClick={() => open(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={strapiMediaUrl(f.obrazok.url)}
                alt={f.popis ?? ""}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {f.popis && (
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-charcoal/80 px-3 py-2 text-[11px] text-paper transition-transform duration-200 group-hover:translate-y-0">
                  {f.popis}
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <div className="bg-charcoal/60 p-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-paper">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(22,20,18,0.95)" } }}
      />
    </section>
  );
}
