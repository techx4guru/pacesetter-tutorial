import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SiteChrome } from "@/components/SiteChrome";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Omorewa Yomi Godwin | Founder, Pacesetter Tutorial",
    template: "%s | Omorewa Yomi Godwin",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.tutor }],
  keywords: [
    "Pacesetter Tutorial",
    "Omorewa Yomi Godwin",
    "WAEC tutor Warri",
    "UTME Mathematics",
    "Chemistry tutor Ekpan",
    "Physics tutor",
    "Further Mathematics",
    "Chemical Engineering tutor",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: site.name,
    title: "Omorewa Yomi Godwin | Founder, Pacesetter Tutorial",
    description: site.tagline,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacesetter Tutorial",
    description: site.tagline,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.studio,
  description: site.description,
  telephone: site.phoneTel,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ekpan",
    addressLocality: "Warri",
    addressRegion: "Delta",
    addressCountry: "NG",
  },
  founder: {
    "@type": "Person",
    name: "Omorewa Yomi Godwin",
    honorificPrefix: "Engr.",
    jobTitle: "STEM Tutor",
    alumniOf: [
      "University of Benin",
      "Petroleum Training Institute",
      "Federal University of Petroleum Resources, Effurun",
    ],
  },
  areaServed: "Nigeria",
  sameAs: [site.linkedin, site.youtube],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#070709] font-sans text-[#f4f1ea]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteChrome nav={<Navbar />} footer={<Footer />} whatsapp={<WhatsAppButton />}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
