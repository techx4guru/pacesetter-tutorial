"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type LeadContextValue = { open: () => void };

const LeadContext = createContext<LeadContextValue | null>(null);

export function useLeadMagnet() {
  const value = useContext(LeadContext);
  if (!value) throw new Error("useLeadMagnet must be used within LeadMagnetProvider");
  return value;
}

export function LeadMagnetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);

  useEffect(() => {
    const fromHash = () => {
      if (window.location.hash === "#cheat-sheet") setIsOpen(true);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <LeadContext.Provider value={{ open }}>
      {children}
      {isOpen ? <LeadMagnetDialog onClose={() => setIsOpen(false)} /> : null}
    </LeadContext.Provider>
  );
}

export function CheatSheetButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { open } = useLeadMagnet();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}

function LeadMagnetDialog({ onClose }: { onClose: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    if (String(form.get("company") ?? "").trim()) {
      setDone(true);
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/cheat-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(payload?.error ?? "We could not prepare the sheet. Please try again.");
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "Essential-STEM-Mathematics-Formula-Cheat-Sheet.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      setDone(true);
    } catch {
      setError("The download did not start. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-end p-4 sm:place-items-center" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-navy-deep/70"
        aria-label="Close the cheat sheet form"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cheat-sheet-title"
        className="relative z-10 w-full max-w-lg rounded-3xl bg-[#14141a] p-6 shadow-2xl sm:p-8"
      >
        <p className="text-xs font-semibold tracking-[0.2em] text-emerald uppercase">Free study sheet</p>
        <h2 id="cheat-sheet-title" className="mt-2 font-serif text-3xl text-navy">
          Essential STEM & Mathematics Formula Cheat Sheet
        </h2>
        <p className="mt-3 text-sm leading-6 text-ink/75">
          Algebra, trigonometry, calculus, the SUVAT set, the mole concept, and the first
          engineering balances — on one sheet from Engr. Omorewa. Enter your name and email
          and the PDF downloads immediately.
        </p>

        {done ? (
          <div className="mt-6 rounded-2xl border border-emerald/30 bg-emerald/10 p-4 text-sm leading-6 text-emerald-deep">
            The cheat sheet is yours. If the file did not appear in your downloads, submit
            once more with the same email — we already have you on the list.
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <Honeypot />
            <label className="block text-sm font-medium text-navy">
              Name
              <input
                required
                autoFocus
                name="fullName"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="field mt-1"
                autoComplete="name"
              />
            </label>
            <label className="block text-sm font-medium text-navy">
              Email
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="field mt-1"
                autoComplete="email"
              />
            </label>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="btn-gold" type="submit" disabled={pending}>
                {pending ? "Preparing the PDF…" : "Unlock the download"}
              </button>
              <button className="btn-line" type="button" onClick={onClose}>
                Not now
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function Honeypot() {
  return (
    <input
      name="company"
      tabIndex={-1}
      autoComplete="off"
      className="hidden"
      aria-hidden="true"
    />
  );
}
