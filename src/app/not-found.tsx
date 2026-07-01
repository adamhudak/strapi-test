import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section className="py-32">
        <div className="wrap">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-orange">404</div>
          <h1 className="display-h1 mt-4">
            Stránka
            <br />
            neexistuje.
          </h1>
          <p className="mt-6 max-w-[480px] text-lg leading-relaxed text-steel">
            Stránka ktorú hľadáte bola presunutá alebo odstránená.
          </p>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <Link href="/" className="btn-primary">
              Späť na úvod
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
