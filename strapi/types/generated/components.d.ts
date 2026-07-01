import type { Schema, Struct } from '@strapi/strapi';

export interface BlokyAktualityPreviewBlok extends Struct.ComponentSchema {
  collectionName: 'components_bloky_aktuality_preview_blok';
  info: {
    description: 'Posledn\u00E9 novinky \u2014 automaticky na\u010D\u00EDta aktu\u00E1lne z\u00E1znamy';
    displayName: 'Aktuality preview blok';
  };
  attributes: {
    nadpis: Schema.Attribute.String;
    pocetPoloziek: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
    popis: Schema.Attribute.Text;
  };
}

export interface BlokyBenefitsGridBlok extends Struct.ComponentSchema {
  collectionName: 'components_bloky_benefits_grid_bloks';
  info: {
    displayName: 'Benefits Grid';
    icon: 'grid';
  };
  attributes: {
    nadpis: Schema.Attribute.String;
    polozky: Schema.Attribute.Component<'sekcie.benefit-item', true>;
    popis: Schema.Attribute.Text;
  };
}

export interface BlokyContactFormBlok extends Struct.ComponentSchema {
  collectionName: 'components_bloky_contact_form_bloks';
  info: {
    displayName: 'Kontaktn\u00FD formul\u00E1r';
    icon: 'envelope';
  };
  attributes: {
    nadpis: Schema.Attribute.String;
    popis: Schema.Attribute.Text;
  };
}

export interface BlokyCtaBlok extends Struct.ComponentSchema {
  collectionName: 'components_bloky_cta_blok';
  info: {
    description: 'Call-to-action pruh';
    displayName: 'CTA blok';
  };
  attributes: {
    ctaText: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    nadpis: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlokyFaqBlok extends Struct.ComponentSchema {
  collectionName: 'components_bloky_faq_blok';
  info: {
    description: 'Blok s FAQ akordeonom';
    displayName: 'FAQ blok';
  };
  attributes: {
    nadpis: Schema.Attribute.String;
    polozky: Schema.Attribute.Component<'sekcie.faq-item', true>;
  };
}

export interface BlokyGaleriaBlok extends Struct.ComponentSchema {
  collectionName: 'components_bloky_galeria_blok';
  info: {
    description: 'Blok s gal\u00E9riou fotiek a lightboxom';
    displayName: 'Gal\u00E9ria blok';
  };
  attributes: {
    fotky: Schema.Attribute.Component<'sekcie.galeria-fotka', true>;
    nadpis: Schema.Attribute.String;
  };
}

export interface BlokyHeroBlok extends Struct.ComponentSchema {
  collectionName: 'components_bloky_hero_blok';
  info: {
    description: 'Hero sekcia s nadpisom a CTA';
    displayName: 'Hero blok';
  };
  attributes: {
    ctaSekundarneText: Schema.Attribute.String;
    ctaSekundarneUrl: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    nadpis: Schema.Attribute.Text & Schema.Attribute.Required;
    obrazok: Schema.Attribute.Media<'images'>;
    podnadpis: Schema.Attribute.Text;
  };
}

export interface BlokyLogoSliderBlok extends Struct.ComponentSchema {
  collectionName: 'components_bloky_logo_slider_blok';
  info: {
    description: 'Nekone\u010Dn\u00FD slider s logami partnerov';
    displayName: 'Logo slider blok';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    partneri: Schema.Attribute.Component<'sekcie.partner-logo', true>;
  };
}

export interface SekcieBenefitItem extends Struct.ComponentSchema {
  collectionName: 'components_sekcie_benefit_items';
  info: {
    description: 'Jeden box v Benefits Grid';
    displayName: 'Benefit item';
  };
  attributes: {
    href: Schema.Attribute.String;
    nadpis: Schema.Attribute.String & Schema.Attribute.Required;
    popis: Schema.Attribute.Text;
  };
}

export interface SekcieCislo extends Struct.ComponentSchema {
  collectionName: 'components_sekcie_cislo';
  info: {
    description: 'Jedno \u0161tatistick\u00E9 \u010D\u00EDslo \u2014 label + hodnota.';
    displayName: '\u010C\u00EDslo';
  };
  attributes: {
    hodnota: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SekcieFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_sekcie_faq_item';
  info: {
    displayName: 'FAQ polo\u017Eka';
  };
  attributes: {
    odpoved: Schema.Attribute.Text & Schema.Attribute.Required;
    otazka: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SekcieFooterKolona extends Struct.ComponentSchema {
  collectionName: 'components_sekcie_footer_kolona';
  info: {
    description: 'St\u013Apec s odkazmi vo footeri';
    displayName: 'Footer kol\u00F3na';
  };
  attributes: {
    links: Schema.Attribute.Component<'sekcie.footer-link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SekcieFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_sekcie_footer_link';
  info: {
    description: 'Jeden odkaz vo footer st\u013Apci';
    displayName: 'Footer link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SekcieGaleriaFotka extends Struct.ComponentSchema {
  collectionName: 'components_sekcie_galeria_fotka';
  info: {
    displayName: 'Gal\u00E9ria \u2014 fotka';
  };
  attributes: {
    obrazok: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    popis: Schema.Attribute.String;
  };
}

export interface SekcieMilnik extends Struct.ComponentSchema {
  collectionName: 'components_sekcie_milnik';
  info: {
    description: 'Jeden m\u00ED\u013Enik v hist\u00F3rii firmy.';
    displayName: 'M\u00ED\u013Enik';
  };
  attributes: {
    nazov: Schema.Attribute.String & Schema.Attribute.Required;
    popis: Schema.Attribute.Text;
    rok: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SekcieNavItem extends Struct.ComponentSchema {
  collectionName: 'components_sekcie_nav_item';
  info: {
    description: 'Jedna polo\u017Eka navig\u00E1cie (label + href)';
    displayName: 'Nav item';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SekciePartnerLogo extends Struct.ComponentSchema {
  collectionName: 'components_sekcie_partner_logo';
  info: {
    displayName: 'Partner logo';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    nazov: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SekcieSpecRiadok extends Struct.ComponentSchema {
  collectionName: 'components_sekcie_spec_riadok';
  info: {
    description: 'Jeden riadok technickej \u0161pecifik\u00E1cie (k\u013E\u00FA\u010D + hodnota)';
    displayName: 'Spec riadok';
  };
  attributes: {
    hodnota: Schema.Attribute.String & Schema.Attribute.Required;
    kluc: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SekcieTimClen extends Struct.ComponentSchema {
  collectionName: 'components_sekcie_tim_clen';
  info: {
    description: 'Jeden \u010Dlen t\u00EDmu \u2014 meno a poz\u00EDcia.';
    displayName: '\u010Clen t\u00EDmu';
  };
  attributes: {
    meno: Schema.Attribute.String & Schema.Attribute.Required;
    pozicia: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'bloky.aktuality-preview-blok': BlokyAktualityPreviewBlok;
      'bloky.benefits-grid-blok': BlokyBenefitsGridBlok;
      'bloky.contact-form-blok': BlokyContactFormBlok;
      'bloky.cta-blok': BlokyCtaBlok;
      'bloky.faq-blok': BlokyFaqBlok;
      'bloky.galeria-blok': BlokyGaleriaBlok;
      'bloky.hero-blok': BlokyHeroBlok;
      'bloky.logo-slider-blok': BlokyLogoSliderBlok;
      'sekcie.benefit-item': SekcieBenefitItem;
      'sekcie.cislo': SekcieCislo;
      'sekcie.faq-item': SekcieFaqItem;
      'sekcie.footer-kolona': SekcieFooterKolona;
      'sekcie.footer-link': SekcieFooterLink;
      'sekcie.galeria-fotka': SekcieGaleriaFotka;
      'sekcie.milnik': SekcieMilnik;
      'sekcie.nav-item': SekcieNavItem;
      'sekcie.partner-logo': SekciePartnerLogo;
      'sekcie.spec-riadok': SekcieSpecRiadok;
      'sekcie.tim-clen': SekcieTimClen;
    }
  }
}
