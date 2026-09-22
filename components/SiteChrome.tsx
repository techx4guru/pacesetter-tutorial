"use client";

import type { ReactNode } from "react";
import { LeadMagnetProvider } from "@/components/LeadMagnet";
import { ScrollSequence } from "@/components/ScrollSequence";

export function SiteChrome({
  children,
  nav,
  footer,
  whatsapp,
}: {
  children: ReactNode;
  nav: ReactNode;
  footer: ReactNode;
  whatsapp: ReactNode;
}) {
  return (
    <LeadMagnetProvider>
      <ScrollSequence />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      {nav}
      <main id="main" className="relative z-10">
        {children}
      </main>
      <div className="relative z-10">{footer}</div>
      {whatsapp}
    </LeadMagnetProvider>
  );
}
