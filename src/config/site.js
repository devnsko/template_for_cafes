/**
 * Single source of truth for everything that changes between deployments.
 * The project is a white-label template: one build serves many venues, each
 * addressed by its slug (`/place/:id`). Anything not overridden per venue
 * falls back to `defaults`.
 */

export const IMAGEKIT_ENDPOINT = 'https://ik.imagekit.io/20denysko05';

/** Absolute origin, used for canonical URLs and Open Graph images. */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ||
  (typeof window !== 'undefined' ? window.location.origin : 'https://template-for-cafes.onrender.com');

export const DEFAULT_PLACE = 'Savieno';

const defaults = {
  tagline: 'Kuchnia sezonowa',
  claim: 'Smak, który porusza duszę',
  intro:
    'Delektuj się chwilą. Poznaj dania tworzone z pasją, z lokalnych składników i bez pośpiechu.',
  since: 2016,
  address: {
    street: 'ul. Nowy Świat 12',
    postalCode: '00-497',
    city: 'Warszawa',
    // Polish declines place names, so generated copy needs more than the
    // nominative: "w Warszawie" (locative), "w sercu Warszawy" (genitive).
    cityLocative: 'Warszawie',
    cityGenitive: 'Warszawy',
    country: 'PL',
  },
  phone: '+48 888 888 888',
  email: 'dna.digital.structure.solutions@gmail.com',
  hours: [
    { days: 'Poniedziałek – Piątek', open: '08:00', close: '22:00' },
    { days: 'Sobota – Niedziela', open: '09:00', close: '23:00' },
  ],
  /** Machine-readable opening hours for schema.org. */
  openingHours: ['Mo-Fr 08:00-22:00', 'Sa-Su 09:00-23:00'],
  priceRange: '$$',
  cuisine: ['Europejska', 'Sezonowa', 'Bistro'],
  socials: [
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
    { id: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
    { id: 'tripadvisor', label: 'Tripadvisor', href: 'https://tripadvisor.com' },
  ],
  map: {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39084.15672226012!2d20.972932577133182!3d52.247746512262935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc661b455407%3A0x2019a146fb49c9be!2z0JrQvtGA0L7Qu9C10LLRgdC60LjQuSDQt9Cw0LzQvtC6!5e0!3m2!1sru!2spl!4v1746298057504!5m2!1spl!2spl',
    directions: 'https://maps.google.com/?q=Nowy+Swiat+12+Warszawa',
  },
  /** FormSubmit endpoint that receives reservation requests. */
  reservationEndpoint: 'https://formsubmit.co/14af3c499b63487baff858f327e39249',
};

/** Per-venue overrides. Add a key here to onboard a new location. */
const venues = {
  savieno: {
    tagline: 'Bistro sezonowe',
    claim: 'Smak, który porusza duszę',
  },
};

/** Turns `nowy-swiat-cafe` into `Nowy Świat Cafe`-ish, readable title case. */
export function prettifySlug(slug = '') {
  return slug
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\p{L}[\p{L}'’]*/gu, (word) => word[0].toLocaleUpperCase('pl') + word.slice(1));
}

export function getVenue(slug) {
  const key = String(slug || DEFAULT_PLACE).toLowerCase();
  return {
    ...defaults,
    ...(venues[key] || {}),
    slug,
    name: prettifySlug(slug),
  };
}
