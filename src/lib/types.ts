export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

/** CPT: material */
export interface Material {
  id: number;
  documentId: string;
  slug: string;
  nazov: string;
  kategoria: "betón-a-poter" | "tehly-a-murivo" | "ocel-a-vystuz" | "izolacie";
  popis: string;
  pouzitie: string[];
  dodanie: string;
  pevnostnaTrieda?: string;
  stupenProstredia?: string;
  konzistencia?: string;
  frakciaKameniva?: string;
  mrazuvzdornost?: string;
  minObjednavka?: string;
  dostupnost: "skladom" | "na-objednavku";
  dopravaDo48h: boolean;
  cenaOd?: number;
  mena?: string;
  obrazok?: StrapiMedia | null;
  dokumentVyhlasenieOZhode?: { url: string } | null;
  suvisiaceMaterialy?: { slug: string; nazov: string }[];
  publishedAt: string;
  updatedAt: string;
}

/** CPT: aktualita */
export interface Aktualita {
  id: number;
  documentId: string;
  slug: string;
  nadpis: string;
  perex: string;
  obsah: string;
  kategoria: "cennik" | "norma" | "sortiment" | "navod" | "dokumenty" | "novinka";
  obrazok?: StrapiMedia | null;
  publishedAt: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterKolona {
  title: string;
  links: FooterLink[];
}

/** Single Type: nastavenia-webu */
export interface NastaveniaWebu {
  logoText: string;
  logoZvyraznenie?: string | null;
  headerCtaText?: string | null;
  headerCtaUrl?: string | null;
  navigacia?: NavItem[] | null;
  footerFirma?: string | null;
  footerAdresa?: string | null;
  footerIco?: string | null;
  footerIcDph?: string | null;
  footerKolony?: FooterKolona[] | null;
  footerCopyright?: string | null;
}

/** Dynamic Zone blocks */
export type StrankaBlok =
  | { __component: "bloky.hero-blok"; id: number; nadpis: string; podnadpis?: string | null; ctaText?: string | null; ctaUrl?: string | null; ctaSekundarneText?: string | null; ctaSekundarneUrl?: string | null; obrazok?: StrapiMedia | null }
  | { __component: "bloky.logo-slider-blok"; id: number; eyebrow?: string | null; partneri?: { nazov: string; logo?: StrapiMedia | null }[] | null }
  | { __component: "bloky.benefits-grid-blok"; id: number; nadpis?: string | null; popis?: string | null; polozky?: { nadpis: string; popis?: string | null; href?: string | null }[] | null }
  | { __component: "bloky.faq-blok"; id: number; nadpis?: string | null; polozky?: { otazka: string; odpoved: string }[] | null }
  | { __component: "bloky.galeria-blok"; id: number; nadpis?: string | null; fotky?: { obrazok: StrapiMedia; popis?: string | null }[] | null }
  | { __component: "bloky.aktuality-preview-blok"; id: number; nadpis?: string | null; popis?: string | null; pocetPoloziek?: number | null }
  | { __component: "bloky.cta-blok"; id: number; nadpis: string; ctaText?: string | null; ctaUrl?: string | null }
  | { __component: "bloky.contact-form-blok"; id: number; nadpis?: string | null; popis?: string | null };

/** Collection Type: stranka (page builder) */
export interface Stranka {
  id: number;
  documentId: string;
  slug: string;
  nadpis: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  sekcie?: StrankaBlok[] | null;
  publishedAt: string;
}

/** Collection Type: textova-stranka (GDPR, VOP, cookies...) */
export interface TextovaStranka {
  id: number;
  documentId: string;
  slug: string;
  nadpis: string;
  obsah: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  publishedAt: string;
  updatedAt: string;
}
