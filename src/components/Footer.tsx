import Link from "next/link";
import type { NastaveniaWebu } from "@/lib/types";

export default function Footer({ settings }: { settings?: NastaveniaWebu | null }) {
  const logoText = settings?.logoText;
  const logoZvyraznenie = settings?.logoZvyraznenie;
  const firma = settings?.footerFirma;
  const adresa = settings?.footerAdresa;
  const ico = settings?.footerIco;
  const icDph = settings?.footerIcDph;
  const kolony = settings?.footerKolony ?? [];
  const copyright = settings?.footerCopyright;

  const logoPrefix = logoText && logoZvyraznenie
    ? logoText.slice(0, logoText.lastIndexOf(logoZvyraznenie))
    : logoText;

  return (
    <footer className="bg-charcoal py-[70px] text-[#9A968C]">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-10 border-b border-[#2E2C28] pb-12 md:grid-cols-4">
          <div>
            <Link href="/" className="font-display font-extrabold text-[22px] text-paper">
              {logoPrefix}
              {logoZvyraznenie && <span className="text-orange">{logoZvyraznenie}</span>}
            </Link>
            <div className="mt-[18px] text-[13px] leading-[1.7]">
              {firma}
              {adresa && (
                <>
                  <br />
                  {adresa.split("\n").map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </>
              )}
              {(ico || icDph) && <br />}
              {ico && <>IČO: {ico}<br /></>}
              {icDph && <>IČ DPH: {icDph}</>}
            </div>
          </div>

          {kolony.map((col) => (
            <div key={col.title}>
              <h5 className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.08em] text-paper">
                {col.title}
              </h5>
              {col.links.map((l) => (
                <Link key={l.href} href={l.href} className="mb-[10px] block text-sm hover:text-orange">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-6 text-xs">
          {copyright && <span>{copyright}</span>}
          <div className="flex gap-4">
            <Link href="/gdpr" className="hover:text-orange">GDPR</Link>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
