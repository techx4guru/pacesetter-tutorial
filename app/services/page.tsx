import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { BookingCalendar } from "@/components/forms";
import { included, pricingTiers, services, whatsappLink, whatsappMessages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tutoring Programmes",
  description:
    "1-on-1 tutoring, WAEC, NECO, UTME, IGCSE and SAT group revision, the Pacesetter Tutorial centre in Ekpan, Warri, and 100/200-level engineering coaching.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Tutoring Programmes | Pacesetter Tutorial",
    description:
      "Private lessons, exam bootcamps, the Ekpan learning centre, and university coaching with Omorewa Yomi Godwin.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title="Lessons arranged around the paper you are actually sitting."
        lede="Private tutoring, group revision, the physical centre in Ekpan, and coaching for the first two years of engineering and science."
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-20 md:grid-cols-2 md:px-8">
        {services.map((service, index) => (
          <article key={service.title} className="card-lift rounded-3xl border border-line bg-white p-7">
            <p className="font-serif text-4xl text-gold">0{index + 1}</p>
            <h2 className="mt-3 font-serif text-3xl text-navy">{service.title}</h2>
            <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-emerald uppercase">{service.mode}</p>
            <p className="mt-4 leading-7 text-ink/80">{service.detail}</p>
          </article>
        ))}
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <h2 className="font-serif text-4xl">Monthly group classes, and private coaching.</h2>
          <p className="mt-4 max-w-2xl text-white/75">
            Group subscriptions are shown as from ₦X/month so the published term figure can be
            dropped in without redesigning the page. Private 1-on-1 coaching is a custom quote —
            book a consultation.
          </p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <article key={tier.name} className="rounded-3xl bg-white p-6 text-ink">
                <h3 className="font-serif text-2xl text-navy">{tier.name}</h3>
                <p className="mt-4 font-serif text-3xl text-emerald">{tier.price}</p>
                <p className="mt-3 text-sm leading-6 text-ink/75">{tier.detail}</p>
              </article>
            ))}
          </div>
          <article className="mt-5 rounded-3xl border border-gold/40 p-6">
            <h3 className="font-serif text-2xl">Private 1-on-1 Coaching</h3>
            <p className="mt-2 text-gold">Custom quote — book a consultation</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              Online or at the Ekpan centre. The quote follows the subject, the level, and how
              many sessions a week the calendar can honestly hold.
            </p>
            <a className="btn-gold mt-5" href={whatsappLink(whatsappMessages.consultation)}>
              Book a free consultation
            </a>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <h2 className="font-serif text-4xl text-navy">What is included</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {included.map((item, index) => (
            <article key={item.title} className="rounded-3xl border border-line bg-white p-6">
              <p className="text-xs font-semibold tracking-[0.16em] text-emerald uppercase">0{index + 1}</p>
              <h3 className="mt-2 font-serif text-2xl text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/75">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="book" className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-serif text-4xl text-navy">Book a consultation</h2>
              <p className="mt-3 max-w-xl text-ink/75">
                Choose a weekday on the calendar, or open WhatsApp if you would rather talk now.
                The request is saved and confirmed by phone.
              </p>
            </div>
            <a className="btn-navy" href={whatsappLink(whatsappMessages.consultation)}>
              WhatsApp instead
            </a>
          </div>
          <div className="mt-10 rounded-[2rem] border border-line bg-paper p-5 md:p-8">
            <BookingCalendar />
          </div>
          <p className="mt-6 text-sm text-ink/60">
            Prefer the full enrolment form? <Link className="text-emerald underline" href="/contact#enroll">Continue to enrollment.</Link>
          </p>
        </div>
      </section>
    </>
  );
}
