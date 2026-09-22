"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site";

function useCount(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function Stat({
  value,
  suffix,
  label,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const count = useCount(value, active);
  return (
    <div className="px-4 py-2 text-center md:px-6">
      <p className="font-serif text-4xl text-white md:text-5xl">
        {count.toLocaleString("en-NG")}
        <span className="text-coral">{suffix}</span>
      </p>
      <p className="mt-2 text-sm leading-5 text-white/60">{label}</p>
    </div>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">
      <div className="grid divide-y divide-white/10 rounded-none border-y border-white/10 bg-transparent py-10 md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} active={active} />
        ))}
      </div>
    </div>
  );
}
