"use client";

import { useState } from "react";

interface FaqData {
  nadpis?: string;
  polozky?: { otazka: string; odpoved: string }[];
}

export default function FaqAkordeon({ data }: { data?: FaqData | null }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const nadpis = data?.nadpis;
  const polozky = data?.polozky ?? [];

  if (!polozky.length) return null;

  return (
    <section className="py-24">
      <div className="wrap">
        {nadpis && (
          <div className="mb-11">
            <h2 className="display-h2">{nadpis}</h2>
          </div>
        )}

        <div className="border-t border-line">
          {polozky.map((p, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="border-b border-line">
                <button
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-head text-base font-bold">{p.otazka}</span>
                  <span
                    className="shrink-0 text-orange transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                {/* Grid trick for smooth height animation without JS measurement */}
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-[15px] leading-relaxed text-steel">{p.odpoved}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
