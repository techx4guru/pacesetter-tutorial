export function PhotoFrame({
  title,
  caption,
  kind,
}: {
  title: string;
  caption: string;
  kind: "portrait" | "classroom" | "digital";
}) {
  return (
    <figure className="overflow-hidden rounded-3xl border border-line bg-white">
      <div className="relative aspect-[4/5] bg-navy text-white">
        <FrameArt kind={kind} />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-transparent p-5">
          <p className="font-serif text-2xl">{title}</p>
          <p className="mt-1 text-sm leading-5 text-white/75">{caption}</p>
        </figcaption>
      </div>
    </figure>
  );
}

function FrameArt({ kind }: { kind: "portrait" | "classroom" | "digital" }) {
  if (kind === "portrait") {
    return (
      <svg viewBox="0 0 400 500" className="h-full w-full" role="img" aria-label="Portrait frame awaiting a photograph">
        <rect width="400" height="500" fill="#0A1F44" />
        <circle cx="200" cy="180" r="78" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <path d="M80 420c30-80 70-120 120-120s90 40 120 120" fill="none" stroke="#0F9D58" strokeWidth="2" />
        <text x="200" y="188" textAnchor="middle" fill="#D4AF37" fontSize="28" fontFamily="Georgia, serif">
          OGY
        </text>
      </svg>
    );
  }
  if (kind === "classroom") {
    return (
      <svg viewBox="0 0 400 500" className="h-full w-full" role="img" aria-label="Classroom frame awaiting a photograph">
        <rect width="400" height="500" fill="#0A1F44" />
        <rect x="48" y="70" width="304" height="170" rx="8" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <path d="M80 150h90M80 180h140M80 210h70" stroke="#F7F4EE" strokeWidth="2" />
        <rect x="70" y="300" width="260" height="16" rx="4" fill="#0F9D58" />
        <rect x="90" y="340" width="220" height="12" rx="4" fill="#16315F" />
        <rect x="110" y="376" width="180" height="12" rx="4" fill="#16315F" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 500" className="h-full w-full" role="img" aria-label="Digital class frame awaiting a photograph">
      <rect width="400" height="500" fill="#0A1F44" />
      <rect x="70" y="90" width="260" height="180" rx="16" fill="none" stroke="#D4AF37" strokeWidth="2" />
      <circle cx="200" cy="165" r="28" fill="none" stroke="#0F9D58" strokeWidth="2" />
      <path d="M150 230c16-24 28-36 50-36s34 12 50 36" fill="none" stroke="#0F9D58" strokeWidth="2" />
      <rect x="110" y="310" width="180" height="10" rx="5" fill="#F7F4EE" opacity="0.8" />
      <rect x="140" y="336" width="120" height="10" rx="5" fill="#D4AF37" />
    </svg>
  );
}
