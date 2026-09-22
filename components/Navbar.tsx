"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMenu]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition duration-300 ${
        scrolled || openMenu ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center px-5 md:px-10">
        <Link href="/" className="text-[1.05rem] font-semibold tracking-tight text-white">
          {site.name.split(" ")[0]}
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition ${active ? "text-white" : "text-white/70 hover:text-white"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="ml-auto hidden items-center gap-3 rounded-full bg-white! py-1.5 pr-1.5 pl-5 text-sm font-medium text-black lg:inline-flex"
        >
          Get in touch
          <span className="grid h-8 w-8 place-items-center rounded-full bg-coral text-white">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>

        <button
          type="button"
          className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white lg:hidden"
          aria-expanded={openMenu}
          aria-label={openMenu ? "Close menu" : "Open menu"}
          onClick={() => setOpenMenu((value) => !value)}
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-full bg-current" />
            <span className="h-0.5 w-3/4 bg-current" />
          </span>
        </button>
      </div>

      {openMenu ? (
        <div className="border-t border-white/10 bg-black px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-3xl font-semibold tracking-tight text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="btn-gold mt-6">
            Get in touch
          </Link>
        </div>
      ) : null}
    </header>
  );
}
