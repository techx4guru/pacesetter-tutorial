import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BookingCalendar, ContactForm, EnrollmentForm } from "@/components/forms";
import { site, whatsappLink, whatsappMessages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Enrollment",
  description:
    "Enrol with Pacesetter Tutorial, book a free consultation, or message Omorewa Yomi Godwin on WhatsApp at +234 703 377 5766. Centre: Ekpan, Warri.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Enrollment | Pacesetter Tutorial",
    description:
      "Student enrolment, WhatsApp, a consultation calendar, and directions to the Ekpan, Warri learning centre.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & enrollment"
        title="Tell us the subject. We will tell you the next lesson."
        lede="Enrol for secondary or university work, book a time, or open WhatsApp. The free first step is a consultation or a sample lecture."
      />

      <section className="bg-gold/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Free trial</p>
            <p className="mt-1 font-serif text-2xl text-navy">
              A free introductory consultation, or a free YouTube sample lecture.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a className="btn-gold" href={whatsappLink(whatsappMessages.consultation)}>
              Free consultation
            </a>
            <a className="btn-navy" href={whatsappLink(whatsappMessages.sampleLecture)}>
              Free sample lecture
            </a>
          </div>
        </div>
      </section>

      <section id="enroll" className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-line bg-white p-6 md:p-8">
          <h2 className="font-serif text-3xl text-navy">Student enrolment</h2>
          <p className="mt-2 text-sm leading-6 text-ink/70">
            Name, contact, subjects, level, and whether you want online lessons or the centre in Ekpan.
            The form is saved to the classroom records.
          </p>
          <div className="mt-6">
            <EnrollmentForm />
          </div>
        </div>
        <div className="space-y-6">
          <a
            href={whatsappLink(whatsappMessages.enroll)}
            className="block rounded-3xl bg-emerald p-6 text-white transition hover:-translate-y-0.5"
          >
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-gold">WhatsApp</p>
            <p className="mt-2 font-serif text-3xl">Message {site.phoneDisplay}</p>
            <p className="mt-2 text-sm text-white/85">Opens a chat with a note that you want to enrol.</p>
          </a>
          <div className="rounded-3xl border border-line bg-white p-6">
            <h2 className="font-serif text-2xl text-navy">A shorter message</h2>
            <p className="mt-2 text-sm text-ink/70">For a question that is not yet an enrolment.</p>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section id="book" className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <h2 className="font-serif text-4xl text-navy">Consultation calendar</h2>
          <p className="mt-3 max-w-2xl text-ink/75">
            Monday to Saturday, West Africa Time. Choose a slot and the request is stored for confirmation.
          </p>
          <div className="mt-8 rounded-[2rem] border border-line bg-paper p-5 md:p-8">
            <BookingCalendar />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl text-navy">The centre in Ekpan</h2>
          <p className="mt-4 leading-7 text-ink/80">
            Physical classes meet at {site.location}. Online students use the same lesson sequence
            from wherever they are sitting the paper.
          </p>
          <a className="btn-line mt-6" href={site.mapLink} target="_blank" rel="noreferrer">
            Open Ekpan, Warri in Google Maps
          </a>
          <p className="mt-4 text-sm text-ink/60">
            Call <a className="text-emerald underline" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a> if you are finding the street.
          </p>
        </div>
        <iframe
          title="Map of Ekpan, Warri, the home of Pacesetter Tutorial"
          src={site.mapEmbed}
          className="h-80 w-full rounded-3xl border border-line"
          loading="lazy"
        />
      </section>
    </>
  );
}
