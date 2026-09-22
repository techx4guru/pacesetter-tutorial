import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="bg-transparent text-white">
      <div className="mx-auto max-w-6xl px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-20">
        <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{lede}</p>
        <Link
          href="/"
          className="mt-6 inline-flex text-sm text-gold underline-offset-4 hover:underline"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
