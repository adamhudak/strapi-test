import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import type { NastaveniaWebu } from "@/lib/types";

const FALLBACK_NAV = [
  { href: "/o-nas", label: "O nás" },
  { href: "/aktuality", label: "Aktuality" },
  { href: "/materialy", label: "Materiály" },
  { href: "/kontakty", label: "Kontakty" },
];

export default function Header({ settings }: { settings?: NastaveniaWebu | null }) {
  const logoText = settings?.logoText ?? "MURAVO";
  const logoZvyraznenie = settings?.logoZvyraznenie ?? "VO";
  const nav = settings?.navigacia ?? FALLBACK_NAV;
  const ctaText = settings?.headerCtaText ?? "Cenník 2026";
  const ctaUrl = settings?.headerCtaUrl ?? "/kontakty";

  const logoPrefix = logoZvyraznenie
    ? logoText.slice(0, logoText.lastIndexOf(logoZvyraznenie))
    : logoText;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="wrap flex h-[78px] items-center justify-between">
        <Link href="/" className="font-display font-extrabold text-[22px] tracking-tight">
          {logoPrefix}
          {logoZvyraznenie && <span className="text-orange">{logoZvyraznenie}</span>}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-9 text-sm font-semibold md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="py-1.5 hover:text-orange">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href={ctaUrl} className="btn-primary hidden md:inline-flex">
            {ctaText}
          </Link>
          <MobileMenu nav={nav} ctaText={ctaText} ctaUrl={ctaUrl} />
        </div>
      </div>
    </header>
  );
}
