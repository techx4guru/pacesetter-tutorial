"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 300;

function frameSrc(index: number) {
  const number = String(index + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${number}.jpg`;
}

export function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const images = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image();
      image.decoding = "async";
      image.src = frameSrc(index);
      return image;
    });

    let target = 0;
    let shown = 0;
    let frame = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const cover = (image: HTMLImageElement) => {
      const viewWidth = window.innerWidth;
      const viewHeight = window.innerHeight;
      const scale = Math.max(viewWidth / image.naturalWidth, viewHeight / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      context.drawImage(image, (viewWidth - width) / 2, (viewHeight - height) / 2, width, height);
    };

    const paint = (position: number) => {
      const lower = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(position)));
      const upper = Math.min(FRAME_COUNT - 1, lower + 1);
      const mix = position - lower;
      const current = images[lower];
      const upcoming = images[upper];
      if (!current?.complete || current.naturalWidth === 0) return;

      context.globalAlpha = 1;
      cover(current);
      if (mix > 0.001 && upcoming?.complete && upcoming.naturalWidth > 0) {
        context.globalAlpha = mix;
        cover(upcoming);
        context.globalAlpha = 1;
      }
    };

    const syncScroll = () => {
      if (reduced) {
        target = 0;
        return;
      }
      const travel = document.documentElement.scrollHeight - window.innerHeight;
      const passed = Math.min(Math.max(window.scrollY, 0), Math.max(travel, 0));
      target = travel <= 0 ? 0 : (passed / travel) * (FRAME_COUNT - 1);
    };

    const tick = () => {
      shown += (target - shown) * 0.14;
      if (Math.abs(target - shown) < 0.003) shown = target;
      paint(shown);
      frame = requestAnimationFrame(tick);
    };

    resize();
    syncScroll();
    images[0]?.addEventListener("load", () => paint(shown), { once: true });
    window.addEventListener("scroll", syncScroll, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("resize", syncScroll);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", syncScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/frames/ezgif-frame-001.jpg)" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/50" />
    </div>
  );
}
