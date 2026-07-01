# MURAVO — Next.js + Strapi

Frontend pre stavebniny MURAVO. Next.js 14 (App Router), TypeScript, Tailwind CSS, obsah z headless CMS Strapi.

## Štruktúra

```
src/
  app/
    page.tsx                  → domov
    o-nas/page.tsx             → singletype "stranka-o-nas"
    aktuality/page.tsx         → výpis CPT "aktualita"
    aktuality/[slug]/page.tsx  → detail aktuality
    materialy/page.tsx         → výpis CPT "material" (filter cez ?kategoria=)
    materialy/[slug]/page.tsx  → detail materiálu (hlavný CPT, ISR)
    kontakty/page.tsx          → kontaktný formulár (POST do Strapi)
  components/                  → Header, Footer, Shared (PageHead, CtaStrip), ContactForm
  lib/
    strapi.ts                  → typovaný fetch klient (server-only token)
    types.ts                   → TS typy pre Strapi modely

strapi/content-types/
  material/schema.json         → CPT "materiál" — betón, murivo, výstuž, izolácie
  aktualita/schema.json        → CPT "aktualita" — novinky / cenníky / normy
```

## 1. Spustenie frontendu

```bash
npm install
cp .env.local.example .env.local   # doplň URL a token Strapi inštancie
npm run dev
```

## 2. Strapi backend

Frontend očakáva bežiacu Strapi inštanciu (v4/v5) na `NEXT_PUBLIC_STRAPI_URL`.

```bash
npx create-strapi-app@latest muravo-cms --quickstart
```

V Strapi admine vytvor cez Content-Type Builder dva collection types podľa priložených schém,
alebo skopíruj `strapi/content-types/*/schema.json` priamo do
`muravo-cms/src/api/<singularName>/content-types/<singularName>/schema.json`
a reštartuj Strapi (`npm run develop`) — schémy sa automaticky načítajú.

Okrem toho potrebuješ:

- **Singletype `stranka-o-nas`** (api ID `stranka-o-nas`) s poliami `nadpis`, `perex`, `cisla` (JSON pole
  `{label, hodnota}`), `tim` (JSON `{meno, pozicia}`), `milniky` (JSON `{rok, nazov, popis}`).
- **Collection type `dopyt`** (lead z kontaktného formulára) s poliami `meno`, `email`, `telefon`,
  `typStavby`, `popis`.

### Práva (Settings → Roles → Public)

- `material`, `aktualita`, `stranka-o-nas` → povoľ `find` a `findOne`.
- `dopyt` → povoľ iba `create` (nikdy nie `find`, aby cudzí dopyty neboli verejne čitateľné).

## 3. Revalidácia obsahu

Stránky používajú `revalidate` (ISR) — zmena v Strapi sa prejaví do 60 s bez nutnosti redeployu.
Pre okamžitú revalidáciu nastav v Strapi webhook na `POST /api/revalidate` (vytvor si route handler
`src/app/api/revalidate/route.ts`, ktorý zavolá `revalidateTag('materialy')` / `revalidateTag('aktuality')`
podľa typu obsahu — tagy sú už pripravené v `lib/strapi.ts`).

## Dizajn systém

Farby a typografia sú nastavené ako Tailwind tokeny v `tailwind.config.ts`
(`charcoal`, `concrete`, `orange`, `steel`, `paper`) a fonty cez `next/font/google`
(Archivo Expanded — display, Public Sans — text, JetBrains Mono — technické špecifikácie).
Opakované vzory (crop-mark rohy na spec paneloch, mono eyebrow nadpisy, btn-primary/btn-ghost)
sú v `src/app/globals.css` ako `@layer components`.
