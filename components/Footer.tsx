import Link from "next/link";
import { nav, site, whatsappLink, whatsappMessages } from "@/lib/site";
import { NewsletterForm } from "@/components/forms";
import { Reveal } from "@/components/Reveal";

export function Footer() {
  return (
    <footer className="bg-transparent text-white">
      <Reveal variant="slide">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl">{site.name}</p>
          <p className="mt-2 text-sm text-white/70">Founder of {site.studio}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">{site.tagline}</p>
          <p className="mt-4 text-sm text-white/80">{site.tutor}</p>
          <p className="text-sm text-gold">{site.credentialsLine}</p>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Visit</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#cheat-sheet" className="text-white/80 hover:text-gold">
                Free formula sheet
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a className="hover:text-gold" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="hover:text-gold" href={whatsappLink(whatsappMessages.consultation)}>
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li>{site.location}</li>
            <li>
              <a className="hover:text-gold" href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <span className="px-2 text-white/40">/</span>
              <a className="hover:text-gold" href={site.youtube} target="_blank" rel="noreferrer">
                YouTube
              </a>
            </li>
          </ul>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-white/55 md:px-8">
          © {new Date().getFullYear()} {site.name}. Founder of {site.studio}.
        </p>
      </div>
      </Reveal>
    </footer>
  );
}
