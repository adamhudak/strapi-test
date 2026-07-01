import Link from "next/link";

export function PageHead({
  breadcrumb,
  title,
  lede,
}: {
  breadcrumb: { href: string; label: string }[];
  title: React.ReactNode;
  lede?: string;
}) {
  return (
    <section className="border-b border-line bg-concrete py-16">
      <div className="wrap">
        <div className="mono-eyebrow mb-[18px] flex items-center gap-2">
          {breadcrumb.map((b, i) => (
            <span key={b.href} className="flex items-center gap-2">
              {i > 0 && <span className="text-dashline">/</span>}
              <Link href={b.href} className="hover:text-orange">
                {b.label}
              </Link>
            </span>
          ))}
        </div>
        <h1 className="display-h1">{title}</h1>
        {lede && <p className="mt-4 max-w-[560px] text-base leading-relaxed text-steel">{lede}</p>}
      </div>
    </section>
  );
}
