import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/data/site";
import { assetUrl } from "@/data/assets";
import { menus } from "@/data/menus";
import { ScrollProvider } from "@/components/motion/ScrollProvider";
import { UIProvider } from "@/components/layout/UIProvider";
import { Header } from "@/components/navigation/Header";
import { MenuOverlay } from "@/components/navigation/MenuOverlay";
import { ReserveOverlay } from "@/components/navigation/ReserveOverlay";
import { Footer } from "@/components/layout/Footer";
import { MobileDock } from "@/components/layout/MobileDock";
import { Cursor } from "@/components/layout/Cursor";
import { Preloader } from "@/components/layout/Preloader";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Kahani · Contemporary Indian Restaurant, Chelsea, London", template: "%s · Kahani London" },
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: {
    title: "Kahani · A story told through flavour",
    description: site.description,
    url: site.url,
    siteName: site.legalName,
    locale: "en_GB",
    type: "website",
    images: [{ url: assetUrl("saucePour") }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#10100f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.legalName,
  url: site.url,
  image: [assetUrl("diningRoom"), assetUrl("saucePour"), assetUrl("peacockRoom")],
  description: site.description,
  servesCuisine: ["Indian", "Contemporary Indian"],
  priceRange: "££££",
  telephone: site.phone.intl,
  email: site.email.reservations,
  acceptsReservations: site.booking.url,
  hasMenu: menus.filter((m) => !m.available).map((m) => ({ "@type": "Menu", name: m.title, url: m.pdf })),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postcode,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: site.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.schema.map((d) => ({ Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" })[d]),
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: [site.social.instagram, site.social.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.add('js-fallback')},4500);",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.kahanilondon.com" />
        {/* Google Sans Flex: variable weight, width and optical size. The only typeface on the site. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wdth,wght@6..144,25..151,1..1000&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ivory focus:px-4 focus:py-2 focus:text-obsidian">
          Skip to content
        </a>
        <ScrollProvider>
          <UIProvider>
            <Preloader />
            <Header />
            <MenuOverlay />
            <ReserveOverlay />
            <main id="main">{children}</main>
            <Footer />
            <MobileDock />
            <Cursor />
          </UIProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}
