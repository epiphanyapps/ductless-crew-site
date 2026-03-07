import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AmplifyProvider from "@/components/providers/AmplifyProvider";
import { AdminModeProvider } from "@/contexts";
import { AdminModeToggle } from "@/components/admin";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://ductlesscrew.com";
const siteName = "Ductless Crew";
const siteDescription =
  "Professional HVAC, electrical, and handyman services in Brooklyn, NY. Licensed, insured, and committed to quality with over a decade of experience. Call 929-543-5995 for a free estimate.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ductless Crew | Professional HVAC & Electrical Services Brooklyn",
    template: "%s | Ductless Crew",
  },
  description: siteDescription,
  keywords: [
    "HVAC services Brooklyn",
    "ductless mini split installation",
    "electrical services NYC",
    "handyman Brooklyn",
    "air conditioning installation",
    "heating repair Brooklyn",
    "mini split systems",
    "licensed electrician Brooklyn",
    "home repairs NYC",
    "HVAC contractor near me",
  ],
  authors: [{ name: "Ductless Crew" }],
  creator: "Ductless Crew",
  publisher: "Ductless Crew",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: "Ductless Crew | Professional HVAC & Electrical Services",
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ductless Crew - Professional HVAC Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ductless Crew | Professional HVAC & Electrical Services",
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
};

// JSON-LD structured data for LocalBusiness
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#organization`,
  name: "Ductless Crew",
  image: `${siteUrl}/og-image.jpg`,
  description: siteDescription,
  url: siteUrl,
  telephone: "+1-929-543-5995",
  email: "contact@ductlesscrew.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1938 Stillwell Ave, Suite 2",
    addressLocality: "Brooklyn",
    addressRegion: "NY",
    postalCode: "11223",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.5889,
    longitude: -73.9797,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 40.5889,
      longitude: -73.9797,
    },
    geoRadius: "50000",
  },
  sameAs: [
    "https://www.instagram.com/ductlesscrew",
    "https://www.facebook.com/ductlesscrew",
    "https://www.linkedin.com/company/ductlesscrew",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "HVAC & Electrical Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ductless Mini Split Installation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Electrical Services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "HVAC Repair & Maintenance",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "300",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AmplifyProvider>
          <AdminModeProvider>
            {children}
            <AdminModeToggle />
          </AdminModeProvider>
        </AmplifyProvider>
      </body>
    </html>
  );
}
