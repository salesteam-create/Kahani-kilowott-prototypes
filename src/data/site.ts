/**
 * Central restaurant configuration.
 * Every value here was verified against https://www.kahanilondon.com/ (Nov 2026 audit).
 * Change details here once; every component reads from this file.
 */
export const site = {
  name: "Kahani",
  legalName: "Kahani London",
  url: "https://www.kahanilondon.com",
  tagline: "A story told through flavour",
  descriptor: "Contemporary Indian Dining",
  location: "Chelsea · London",
  description:
    "Kahani is a contemporary Indian restaurant in Chelsea, London, led by chef Peter Joseph. Seasonal British ingredients, Indian spice and technique, robata grill and tandoor, made for sharing.",

  address: {
    street: "1 Wilbraham Place",
    city: "London",
    postcode: "SW1X 9AE",
    country: "GB",
    landmark: "Opposite Cadogan Hall, Sloane Square",
    mapUrl: "https://maps.app.goo.gl/fSAjooT48Z9aBgdNA",
  },

  phone: { display: "020 7730 7634", href: "tel:+442077307634", intl: "+44 20 7730 7634" },
  email: {
    reservations: "reservations@kahanilondon.com",
    press: "komal@kahanilondon.com",
  },

  hours: [
    { days: "Monday – Wednesday", time: "17:00 – 21:15", schema: ["Mo", "Tu", "We"], opens: "17:00", closes: "21:15" },
    { days: "Thursday – Sunday", time: "12:30 – 21:15", schema: ["Th", "Fr", "Sa", "Su"], opens: "12:30", closes: "21:15" },
  ],

  /** Official booking destination (OpenTable widget hosted on the existing site). */
  booking: {
    url: "https://www.kahanilondon.com/reservation/",
    provider: "OpenTable",
  },

  privateDining: {
    room: "The Peacock Room",
    capacity: 14,
    restaurantCapacity: 90,
    minimumSpend: {
      standard: { dinner: 1200, lunch: 800 },
      festive: { dinner: 1500, lunch: 1000, period: "1 November – 31 December" },
    },
    enquiryUrl: "https://www.kahanilondon.com/private-dining/",
  },

  giftCards: { url: "https://www.kahanilondon.com/product-category/gift-card/" },

  social: {
    instagram: "https://www.instagram.com/kahanilondon/",
    facebook: "https://www.facebook.com/KahaniLondon/?locale=en_GB",
  },

  legal: {
    privacy: "https://www.kahanilondon.com/privacy-policy",
  },
} as const;

export type Site = typeof site;

/** True between 1 Nov and 31 Dec, when festive minimum spends apply. */
export function isFestiveSeason(date = new Date()) {
  const m = date.getMonth();
  return m === 10 || m === 11;
}
