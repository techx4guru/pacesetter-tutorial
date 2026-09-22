import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Reveal } from "@/components/Reveal";
import {
  achievements,
  bio,
  certifications,
  photos,
  qualifications,
  site,
  whatsappLink,
  whatsappMessages,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About Omorewa Yomi Godwin",
  description: bio.full,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Omorewa Yomi Godwin",
    description: bio.short,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the tutor"
        title="The record behind the classroom."
        lede="Credentials, the places the teaching has happened, and a sample of how a lesson is asked for."
      />

      <article className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <h2 className="font-serif text-3xl text-navy">Full bio</h2>
          <p className="mt-5 text-lg leading-8 text-ink/85">{bio.full}</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="rounded-3xl bg-cream p-6">
            <h2 className="font-serif text-2xl text-navy">Qualifications</h2>
            <ul className="mt-4 space-y-3">
              {qualifications.map((item) => (
                <li key={item} className="border-b border-line pb-3 text-sm leading-6 last:border-b-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </article>

      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-serif text-3xl">Certifications</h2>
            <ul className="mt-6 space-y-3">
              {certifications.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-3xl">Achievements</h2>
            <ul className="mt-6 space-y-5">
              {achievements.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold text-gold">{item.title}</p>
                  {item.detail ? <p className="text-sm text-white/75">{item.detail}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <h2 className="font-serif text-4xl text-navy">Photographs</h2>
        <p className="mt-3 max-w-2xl text-ink/75">
          These frames are ready for the high-resolution portrait and for photographs of live
          teaching — in the Ekpan classroom and on a digital lesson. Replace each image when the
          files are in hand.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {photos.map((photo) => (
            <PhotoFrame key={photo.kind} {...photo} />
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:px-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald uppercase">Sample lecture</p>
            <h2 className="mt-3 font-serif text-4xl text-navy">Watch the method before you enrol.</h2>
            <p className="mt-4 leading-7 text-ink/80">
              A free introductory consultation, or a free sample lecture on YouTube, is the right
              first meeting. Ask for the film that matches the subject — Chemistry, Physics,
              Mathematics, Further Mathematics, or the engineering balances — and it is sent
              directly.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a className="btn-gold" href={site.youtube} target="_blank" rel="noreferrer">
                Open YouTube
              </a>
              <a className="btn-navy" href={whatsappLink(whatsappMessages.sampleLecture)}>
                Request the sample lecture
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-line bg-navy shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs text-white/70">
              <span className="h-2.5 w-2.5 rounded-full bg-gold" />
              Sample lecture · YouTube
            </div>
            <a
              href={site.youtube}
              target="_blank"
              rel="noreferrer"
              className="group relative grid aspect-video place-items-center bg-[radial-gradient(circle_at_center,rgba(15,157,88,0.35),#06122b_70%)]"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-gold text-navy transition group-hover:scale-105">
                <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                  <path d="M8 5v14l11-7L8 5Z" />
                </svg>
              </span>
              <span className="sr-only">Play the Pacesetter Tutorial sample lectures on YouTube</span>
            </a>
            <div className="space-y-2 bg-paper p-5 text-sm leading-6 text-ink/80">
              <p className="font-semibold text-navy">What the first ten minutes usually settle</p>
              <p>
                The knowns are written before a formula is chosen. For a braking car, final
                velocity is zero and the sign of acceleration is said out loud. For a titration,
                the volume is converted to dm³ before anyone multiplies. The lecture exists so
                you can see that pace before a term begins.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
