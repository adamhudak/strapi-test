import Link from "next/link";
import FaqAkordeon from "@/components/FaqAkordeon";
import GaleriaBlok from "@/components/GaleriaBlok";
import ContactForm from "@/components/ContactForm";
import { strapiMediaUrl, getAktuality } from "@/lib/strapi";
import type { StrankaBlok, Aktualita } from "@/lib/types";


async function AktualityPreviewBlok({ nadpis, popis, pocet, parentSlug }: { nadpis?: string | null; popis?: string | null; pocet: number; parentSlug: string }) {
  const { items: aktuality } = await getAktuality(1, pocet).catch(() => ({ items: [] as Aktualita[], pageCount: 0, total: 0 }));
  if (!aktuality.length) return null;

  return (
    <section className="py-24">
      <div className="wrap">
        <div className="mb-11 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="display-h2">{nadpis ?? "Aktuality"}</h2>
          {popis && <p className="max-w-[380px] text-[15px] text-steel">{popis}</p>}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aktuality.map((a) => (
            <Link key={a.slug} href={`/${parentSlug}/${a.slug}`} className="group border border-line p-6 hover:border-charcoal">
              <div className="mono-eyebrow mb-3">{a.kategoria}</div>
              <h3 className="font-head text-lg font-bold group-hover:text-orange">{a.nadpis}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-steel line-clamp-3">{a.perex}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function StrankaRenderer({ sekcie, parentSlug = "" }: { sekcie: StrankaBlok[]; parentSlug?: string }) {
  return (
    <>
      {sekcie.map((blok) => {
        switch (blok.__component) {
          case "bloky.hero-blok":
            return (
              <section key={blok.id} className="bg-concrete py-24">
                <div className="wrap grid items-center gap-12 md:grid-cols-2">
                  <div>
                    <h1 className="display-h1">{blok.nadpis}</h1>
                    {blok.podnadpis && (
                      <p className="mt-6 max-w-[480px] text-lg leading-relaxed text-steel">{blok.podnadpis}</p>
                    )}
                    {(blok.ctaText || blok.ctaSekundarneText) && (
                      <div className="mt-8 flex flex-wrap gap-3.5">
                        {blok.ctaText && blok.ctaUrl && (
                          <Link href={blok.ctaUrl} className="btn-primary">{blok.ctaText}</Link>
                        )}
                        {blok.ctaSekundarneText && blok.ctaSekundarneUrl && (
                          <Link href={blok.ctaSekundarneUrl} className="btn-ghost">{blok.ctaSekundarneText}</Link>
                        )}
                      </div>
                    )}
                  </div>
                  {blok.obrazok && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={strapiMediaUrl(blok.obrazok.url)} alt={blok.obrazok.alternativeText ?? blok.nadpis} className="h-auto w-full object-cover" />
                  )}
                </div>
              </section>
            );

          case "bloky.logo-slider-blok": {
            const items = blok.partneri?.length ? [...blok.partneri, ...blok.partneri] : [];
            if (!items.length) return null;
            return (
              <section key={blok.id} className="border-b border-line py-14 overflow-hidden">
                <div className="wrap mb-6">
                  <div className="mono-eyebrow">{blok.eyebrow ?? "Partneri"}</div>
                </div>
                <div
                  className="flex gap-0"
                  style={{ animation: "marquee 28s linear infinite" }}
                >
                  {items.map((p, i) => (
                    <div key={i} className="flex shrink-0 items-center justify-center px-10" style={{ minWidth: "160px" }}>
                      {p.logo?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={strapiMediaUrl(p.logo.url)} alt={p.nazov} className="h-8 w-auto object-contain opacity-50 grayscale" />
                      ) : (
                        <span className="font-head text-sm font-bold tracking-wide text-[#A8A398] whitespace-nowrap">{p.nazov}</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          case "bloky.benefits-grid-blok": {
            const polozky = blok.polozky ?? [];
            if (!polozky.length) return null;
            return (
              <section key={blok.id} className="py-24">
                <div className="wrap">
                  {(blok.nadpis || blok.popis) && (
                    <div className="mb-11 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                      {blok.nadpis && <h2 className="display-h2">{blok.nadpis}</h2>}
                      {blok.popis && <p className="max-w-[380px] text-[15px] text-steel">{blok.popis}</p>}
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                    {polozky.map((item, i) => {
                      const content = (
                        <>
                          <div>
                            <span className="font-mono text-[13px] text-orange">0{i + 1}</span>
                            <h3 className="mt-4 font-head text-[21px] font-bold">{item.nadpis}</h3>
                            {item.popis && <p className="mt-2.5 text-sm leading-relaxed text-steel group-hover:text-[#C8C4BA]">{item.popis}</p>}
                          </div>
                          {item.href && (
                            <div className="mt-4 translate-x-[-6px] text-sm font-bold opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                              Viac →
                            </div>
                          )}
                        </>
                      );
                      const cls = "group flex min-h-[240px] flex-col justify-between bg-paper p-7 transition-colors hover:bg-charcoal hover:text-paper";
                      return item.href
                        ? <Link key={i} href={item.href} className={cls}>{content}</Link>
                        : <div key={i} className={cls}>{content}</div>;
                    })}
                  </div>
                </div>
              </section>
            );
          }

          case "bloky.faq-blok":
            return (
              <FaqAkordeon
                key={blok.id}
                data={{ nadpis: blok.nadpis ?? undefined, polozky: blok.polozky ?? undefined }}
              />
            );

          case "bloky.galeria-blok":
            return (
              <GaleriaBlok
                key={blok.id}
                data={{ nadpis: blok.nadpis ?? undefined, fotky: blok.fotky ?? undefined }}
              />
            );

          case "bloky.aktuality-preview-blok":
            return (
              <AktualityPreviewBlok
                key={blok.id}
                nadpis={blok.nadpis}
                popis={blok.popis}
                pocet={blok.pocetPoloziek ?? 3}
                parentSlug={parentSlug}
              />
            );

          case "bloky.contact-form-blok":
            return (
              <section key={blok.id} className="py-24">
                <div className="wrap">
                  <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
                    {(blok.nadpis || blok.popis) && (
                      <div>
                        {blok.nadpis && <h2 className="display-h2">{blok.nadpis}</h2>}
                        {blok.popis && <p className="mt-4 text-[15px] leading-relaxed text-steel">{blok.popis}</p>}
                      </div>
                    )}
                    <ContactForm />
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
