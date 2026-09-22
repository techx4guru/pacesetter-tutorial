import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-40 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-emerald uppercase">Missing page</p>
      <h1 className="mt-3 font-serif text-5xl text-navy">This page is not in the syllabus.</h1>
      <p className="mt-4 text-ink/70">The link may be old. The classroom is still open.</p>
      <Link href="/" className="btn-gold mt-8">
        Return home
      </Link>
    </section>
  );
}
