import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getStrankaBySlug, getStranky, getTextovaStrakaBySlug, getTextoveStranky } from "@/lib/strapi";
import { PageHead } from "@/components/Shared";
import StrankaRenderer from "@/components/StrankaRenderer";

export async function generateStaticParams() {
  const [stranky, textove] = await Promise.all([
    getStranky().catch(() => [] as Awaited<ReturnType<typeof getStranky>>),
    getTextoveStranky().catch(() => [] as Awaited<ReturnType<typeof getTextoveStranky>>),
  ]);
  return [
    ...stranky.map((s) => ({ slug: s.slug })),
    ...textove.map((s) => ({ slug: s.slug })),
  ];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const stranka = await getStrankaBySlug(params.slug).catch(() => null);
  if (stranka) {
    return {
      title: stranka.seoTitle ?? stranka.nadpis,
      description: stranka.seoDescription ?? undefined,
    };
  }
  const textova = await getTextovaStrakaBySlug(params.slug).catch(() => null);
  if (textova) {
    return {
      title: textova.seoTitle ?? textova.nadpis,
      description: textova.seoDescription ?? undefined,
    };
  }
  return {};
}

export default async function SlugPage({ params }: { params: { slug: string } }) {
  // 1. Skúsi Stranka (page builder)
  const stranka = await getStrankaBySlug(params.slug).catch(() => null);
  if (stranka) {
    return (
      <>
        <PageHead
          breadcrumb={[
            { href: "/", label: "Domov" },
            { href: `/${stranka.slug}`, label: stranka.nadpis },
          ]}
          title={stranka.nadpis}
        />
        {stranka.sekcie?.length ? (
          <StrankaRenderer sekcie={stranka.sekcie} parentSlug={stranka.slug} />
        ) : null}
      </>
    );
  }

  // 2. Fallback na Textová stránka (plain markdown)
  const textova = await getTextovaStrakaBySlug(params.slug).catch(() => null);
  if (textova) {
    return (
      <>
        <PageHead
          breadcrumb={[
            { href: "/", label: "Domov" },
            { href: `/${textova.slug}`, label: textova.nadpis },
          ]}
          title={textova.nadpis}
        />
        <section className="py-20">
          <div className="wrap">
            <div className="prose prose-stone max-w-[720px]">
              <ReactMarkdown>{textova.obsah}</ReactMarkdown>
            </div>
          </div>
        </section>
      </>
    );
  }

  notFound();
}
