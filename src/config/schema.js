import { SITE_URL } from './site';

/** schema.org/Restaurant payload built from a venue profile. */
export function restaurantSchema(venue, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: venue.name,
    description: venue.intro,
    url,
    telephone: venue.phone,
    email: venue.email,
    servesCuisine: venue.cuisine,
    priceRange: venue.priceRange,
    image: `${SITE_URL}/og.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address.street,
      postalCode: venue.address.postalCode,
      addressLocality: venue.address.city,
      addressCountry: venue.address.country,
    },
    openingHours: venue.openingHours,
    acceptsReservations: true,
    sameAs: venue.socials.map((social) => social.href),
  };
}
