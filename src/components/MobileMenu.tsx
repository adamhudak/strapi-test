"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/types";

export default function MobileMenu({
  nav,
  ctaText,
  ctaUrl,
}: {
  nav: NavItem[];
  ctaText?: string | null;
  ctaUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        className="flex h-10 w-10 items-center justify-center md:hidden"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
        aria-expanded={open}
      >
        <span className="relative block h-5 w-6">
          <span className={`absolute left-0 block h-0.5 w-full bg-charcoal transition-all duration-200 ${open ? "top-2 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 top-2 block h-0.5 w-full bg-charcoal transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-0 block h-0.5 w-full bg-charcoal transition-all duration-200 ${open ? "top-2 -rotate-45" : "top-4"}`} />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 top-[78px] z-40 md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm" onClick={() => setOpen(false)} />

          {/* Panel */}
          <nav className="relative border-b border-line bg-paper px-6 py-4 shadow-lg">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center border-b border-line py-4 text-base font-semibold hover:text-orange"
              >
                {item.label}
              </Link>
            ))}
            {ctaText && ctaUrl && (
              <div className="pt-4 pb-2">
                <Link href={ctaUrl} className="btn-primary block text-center" onClick={() => setOpen(false)}>
                  {ctaText}
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
