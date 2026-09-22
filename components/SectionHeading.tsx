export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  light = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p
        className={`text-xs font-semibold tracking-[0.22em] uppercase ${
          light ? "text-gold" : "text-emerald"
        }`}
      >
        {index} — {eyebrow}
      </p>
      <h2
        className={`mt-3 font-serif text-4xl leading-tight md:text-5xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p className={`mt-4 text-lg leading-8 ${light ? "text-white/80" : "text-ink/75"}`}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}
