import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { PageHead } from "@/components/Shared";
import { getAktualitaBySlug, getAktuality, getStrankaBySlug, strapiMediaUrl } from "@/lib/strapi";

export const revalidate = 60;

export async function generateStaticParams() {
  const { items } = await getAktuality(1, 100).catch(() => ({ items: [], pageCount: 1, total: 0 }));
  return items.map((a) => ({ articleSlug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; articleSlug: string }>;
}): Promise<Metadata> {
  const { articleSlug } = await params;
  const a = await getAktualitaBySlug(articleSlug).catch(() => null);
  if (!a) return {};
  return {
    title: `${a.nadpis} | MURAVO`,
    description: a.perex,
    openGraph: {
      title: a.nadpis,
      description: a.perex,
      ...(a.obrazok?.url ? { images: [{ url: strapiMediaUrl(a.obrazok.url) }] } : {}),
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string; articleSlug: string }>;
}) {
  const { slug, articleSlug } = await params;

  const aktualita = await getAktualitaBySlug(articleSlug).catch(() => null);
  if (!aktualita) notFound();

  const parentStranka = await getStrankaBySlug(slug).catch(() => null);
  const parentLabel = parentStranka?.nadpis ?? slug;

  return (
    <>
      <PageHead
        breadcrumb={[
          { href: "/", label: "Domov" },
          { href: `/${slug}`, label: parentLabel },
          { href: `/${slug}/${aktualita.slug}`, label: aktualita.nadpis },
        ]}
        title={aktualita.nadpis}
        lede={aktualita.perex}
      />

      <section className="py-20">
        <div className="wrap grid gap-16 md:grid-cols-[1.3fr_0.7fr]">

          <article>
            {aktualita.obrazok?.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={strapiMediaUrl(aktualita.obrazok.url)}
                alt={aktualita.obrazok.alternativeText ?? aktualita.nadpis}
                className="mb-10 h-auto w-full object-cover"
              />
            )}
            <div className="prose prose-neutral max-w-none text-[15px] leading-relaxed">
              <ReactMarkdown>{aktualita.obsah}</ReactMarkdown>
            </div>
          </article>

          <aside className="h-fit border border-charcoal bg-paper p-6">
            <div className="mb-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-orange">
              O článku
            </div>
            <Row k="Kategória" v={aktualita.kategoria} />
            <Row k="Publikované" v={new Date(aktualita.publishedAt).toLocaleDateString("sk-SK")} />
          </aside>

        </div>
      </section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-dashed border-dashline py-2.5 font-mono text-[13px] last:border-0">
      <b className="font-semibold">{k}</b>
      <span className="text-steel">{v}</span>
    </div>
  );
}
