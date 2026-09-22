import type { Metadata } from "next";
import Link from "next/link";
import { CheatSheetButton } from "@/components/LeadMagnet";
import { Reveal } from "@/components/Reveal";
import { StatsBar } from "@/components/StatsBar";
import {
  audiences,
  bio,
  services,
  site,
  subjects,
  testimonial,
  whatsappLink,
  whatsappMessages,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Omorewa Yomi Godwin | Founder, Pacesetter Tutorial" },
  description: site.description,
  alternates: { canonical: "/" },
};

const strip = [
  "Mathematics",
  "Further Mathematics",
  "Physics",
  "Chemistry",
] as const;

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-rows-[minmax(0,1fr)_auto] px-5 pt-24 pb-7 text-white md:px-10 md:pt-28">
          <div className="grid min-h-0 items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.55fr)_minmax(0,0.9fr)]">
            <Reveal>
              <p className="text-sm font-medium text-coral md:text-base">Hey, I&apos;m</p>
              <h1 className="mt-3 text-[clamp(3.4rem,5.4vw,6rem)] leading-[0.88] font-extrabold tracking-[-0.055em]">
                Omorewa
                <br />
                Yomi Godwin
              </h1>
            </Reveal>
            <div className="hidden lg:block" />
            <Reveal delay={120} className="min-w-0 w-full max-w-[17rem] lg:justify-self-end lg:text-right">
              <p className="text-xl leading-snug font-semibold tracking-tight md:text-[1.65rem]">
                Demystifying science should feel practical.
              </p>
              <p className="mt-4 text-sm leading-6 text-white/75">
                Founder of {site.studio}. Mathematics, Physics, Chemistry, and engineering,
                taught until the next line is obvious.
              </p>
            </Reveal>
          </div>

          <Reveal delay={180} className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/20 pt-5 md:grid-cols-4">
            {strip.map((item, index) => (
              <p key={item} className="text-sm text-white/90 md:text-[0.95rem]">
                <span className="mr-2 font-semibold text-coral">#{String(index + 1).padStart(2, "0")}</span>
                {item}
              </p>
            ))}
          </Reveal>
        </section>

      <Reveal>
        <StatsBar />
      </Reveal>

      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10">
        <Reveal>
          <p className="text-sm text-coral">What I teach</p>
          <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Five subjects. One standard of explanation.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject, index) => (
            <Reveal key={subject.name} delay={index * 70}>
            <article className="p-6">
              <p className="text-sm font-semibold text-coral">#{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{subject.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{subject.audience}</p>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:px-10 lg:grid-cols-3">
          {audiences.map((audience, index) => (
            <Reveal key={audience.title} delay={index * 90}>
            <article>
              <p className="text-sm font-semibold text-coral">#{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{audience.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{audience.detail}</p>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:px-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm text-coral">The founder</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">A teacher who stayed in the sciences.</h2>
          <p className="mt-5 text-lg leading-8 text-white/75">{bio.short}</p>
          <p className="mt-4 text-sm text-white/55">{site.credentialsLine}</p>
          <Link href="/about" className="mt-8 inline-flex items-center gap-3 rounded-full bg-white! py-1.5 pr-1.5 pl-5 text-sm font-medium text-black">
            Read the full record
            <span className="grid h-8 w-8 place-items-center rounded-full bg-coral text-white">→</span>
          </Link>
        </Reveal>
        <Reveal delay={120}>
        <blockquote className="border-l border-coral pl-6">
          <p className="text-2xl leading-snug font-medium tracking-tight md:text-3xl">“{testimonial.quote}”</p>
          <footer className="mt-5 text-sm text-coral">{testimonial.attribution}</footer>
        </blockquote>
        </Reveal>
      </section>

      <section id="cheat-sheet" className="mx-auto max-w-[1440px] px-5 pb-8 md:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 px-2 py-10 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-coral">Free sheet</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">{site.cheatSheetTitle}</h2>
          </div>
          <CheatSheetButton className="inline-flex items-center gap-3 rounded-full bg-white! py-1.5 pr-1.5 pl-5 text-sm font-medium text-black">
            Download
            <span className="grid h-8 w-8 place-items-center rounded-full bg-coral text-white">↓</span>
          </CheatSheetButton>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm text-coral">How we work</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">The teaching, arranged.</h2>
          </div>
          <Link href="/services" className="text-sm text-white/70 underline-offset-4 hover:text-white hover:underline">
            All programmes
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 80}>
            <article className="p-6">
              <p className="text-sm font-semibold text-coral">#{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-2 text-xs tracking-[0.14em] text-white/45 uppercase">{service.mode}</p>
              <p className="mt-3 text-sm leading-7 text-white/70">{service.detail}</p>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center md:px-10">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight">Work with him.</h2>
            <p className="mt-3 max-w-xl text-white/65">
              A free consultation, or an enrolment for the subject that currently will not yield.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink(whatsappMessages.consultation)} className="inline-flex items-center gap-3 rounded-full bg-white! py-1.5 pr-1.5 pl-5 text-sm font-medium text-black">
              WhatsApp
              <span className="grid h-8 w-8 place-items-center rounded-full bg-coral text-white">→</span>
            </a>
            <Link href="/contact#enroll" className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm text-white">
              Enrolment form
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
