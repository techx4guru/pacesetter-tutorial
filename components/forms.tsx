"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import {
  submitBooking,
  submitContact,
  submitEnrollment,
  submitNewsletter,
  type FormState,
} from "@/lib/actions";
import { bookingTimes, levels, modes, subjectOptions } from "@/lib/site";
import { Honeypot } from "@/components/LeadMagnet";

const initialFormState: FormState = {
  done: false,
  error: "",
  detail: "",
};

function Status({ done, error, detail }: { done: boolean; error: string; detail: string }) {
  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (done && detail) {
    return (
      <p className="rounded-2xl border border-emerald/30 bg-emerald/10 px-4 py-3 text-sm leading-6 text-emerald-deep">
        {detail}
      </p>
    );
  }
  return null;
}

export function EnrollmentForm() {
  const [state, action, pending] = useActionState(submitEnrollment, initialFormState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.done) ref.current?.reset();
  }, [state.done]);

  return (
    <form ref={ref} action={action} className="space-y-5">
      <Honeypot />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-navy">
          Full name
          <input name="fullName" required autoComplete="name" className="field mt-1" />
        </label>
        <label className="block text-sm font-medium text-navy">
          Email
          <input name="email" type="email" required autoComplete="email" className="field mt-1" />
        </label>
        <label className="block text-sm font-medium text-navy md:col-span-2">
          Phone
          <input name="phone" type="tel" required autoComplete="tel" className="field mt-1" placeholder="080…" />
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-navy">Subjects of interest</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {subjectOptions.map((subject) => (
            <label key={subject} className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-3 text-sm">
              <input type="checkbox" name="subjects" value={subject} className="accent-emerald" />
              {subject}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-navy">Level</legend>
        <div className="mt-3 space-y-2">
          {levels.map((level) => (
            <label key={level.value} className="flex items-start gap-3 text-sm">
              <input type="radio" name="level" value={level.value} required className="mt-1 accent-emerald" />
              {level.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-navy">Preferred mode</legend>
        <div className="mt-3 space-y-2">
          {modes.map((mode) => (
            <label key={mode.value} className="flex items-center gap-3 text-sm">
              <input type="radio" name="preferredMode" value={mode.value} required className="accent-emerald" />
              {mode.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block text-sm font-medium text-navy">
        Message
        <textarea
          name="message"
          rows={4}
          className="field mt-1"
          placeholder="The exam, the course, or the topic that currently will not yield."
        />
      </label>

      <Status {...state} />
      <button className="btn-gold" type="submit" disabled={pending}>
        {pending ? "Saving your enrolment…" : "Submit enrolment"}
      </button>
    </form>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialFormState);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.done) ref.current?.reset();
  }, [state.done]);

  return (
    <form ref={ref} action={action} className="space-y-4">
      <Honeypot />
      <label className="block text-sm font-medium text-navy">
        Full name
        <input name="fullName" required autoComplete="name" className="field mt-1" />
      </label>
      <label className="block text-sm font-medium text-navy">
        Email
        <input name="email" type="email" required autoComplete="email" className="field mt-1" />
      </label>
      <label className="block text-sm font-medium text-navy">
        Phone
        <input name="phone" type="tel" autoComplete="tel" className="field mt-1" />
      </label>
      <label className="block text-sm font-medium text-navy">
        Topic
        <input name="topic" className="field mt-1" placeholder="WAEC Chemistry, 100-level balances…" />
      </label>
      <label className="block text-sm font-medium text-navy">
        Message
        <textarea name="message" required minLength={8} rows={4} className="field mt-1" />
      </label>
      <Status {...state} />
      <button className="btn-navy" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export function NewsletterForm() {
  const [state, action, pending] = useActionState(submitNewsletter, initialFormState);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.done) ref.current?.reset();
  }, [state.done]);

  return (
    <form ref={ref} action={action} className="mt-5">
      <Honeypot />
      <label className="block text-xs font-semibold tracking-[0.16em] text-gold uppercase" htmlFor="newsletter-email">
        Class notes by email
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Email address"
          className="w-full rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-gold"
        />
        <button
          className="rounded-full bg-gold px-4 py-3 text-sm font-semibold text-navy disabled:opacity-60"
          type="submit"
          disabled={pending}
        >
          {pending ? "Joining…" : "Join"}
        </button>
      </div>
      {state.error ? <p className="mt-2 text-xs text-red-300">{state.error}</p> : null}
      {state.done && state.detail ? <p className="mt-2 text-xs text-emerald">{state.detail}</p> : null}
    </form>
  );
}

function isoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function lagosToday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const pick = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return new Date(pick("year"), pick("month") - 1, pick("day"));
}

export function BookingCalendar() {
  const [state, action, pending] = useActionState(submitBooking, initialFormState);
  const ref = useRef<HTMLFormElement>(null);
  const [today] = useState(lagosToday);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (state.done) {
      ref.current?.reset();
      setSelected("");
    }
  }, [state.done]);

  const days = useMemo(() => {
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const gridStart = new Date(start);
    gridStart.setDate(1 - start.getDay());
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + index);
      return date;
    });
  }, [cursor]);

  const monthLabel = cursor.toLocaleDateString("en-NG", { month: "long", year: "numeric", timeZone: "Africa/Lagos" });

  return (
    <form ref={ref} action={action} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <Honeypot />
      <div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="btn-line px-4 py-2"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          >
            Previous
          </button>
          <p className="font-serif text-2xl text-navy">{monthLabel}</p>
          <button
            type="button"
            className="btn-line px-4 py-2"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          >
            Next
          </button>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold tracking-wide text-ink/50 uppercase">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {days.map((date) => {
            const value = isoDate(date);
            const inMonth = date.getMonth() === cursor.getMonth();
            const past = date < today;
            const sunday = date.getDay() === 0;
            const disabled = !inMonth || past || sunday;
            const active = selected === value;
            return (
              <button
                key={value + inMonth}
                type="button"
                disabled={disabled}
                onClick={() => setSelected(value)}
                className={`h-11 rounded-xl text-sm transition ${
                  active
                    ? "bg-emerald text-white"
                    : disabled
                      ? "text-ink/25"
                      : "bg-white text-navy hover:bg-gold/20"
                }`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-ink/60">Sundays are reserved. Times are West Africa Time.</p>
        <input type="hidden" name="preferredDate" value={selected} />
      </div>

      <div className="space-y-4">
        <fieldset>
          <legend className="text-sm font-medium text-navy">Time</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {bookingTimes.map((slot) => (
              <label key={slot.value} className="cursor-pointer">
                <input type="radio" name="preferredTime" value={slot.value} className="peer sr-only" required />
                <span className="inline-flex rounded-full border border-line bg-white px-3 py-2 text-sm peer-checked:border-emerald peer-checked:bg-emerald peer-checked:text-white">
                  {slot.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium text-navy">Where</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <label className="cursor-pointer">
              <input type="radio" name="mode" value="online" className="peer sr-only" required />
              <span className="inline-flex rounded-full border border-line bg-white px-3 py-2 text-sm peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white">
                Online
              </span>
            </label>
            <label className="cursor-pointer">
              <input type="radio" name="mode" value="physical" className="peer sr-only" />
              <span className="inline-flex rounded-full border border-line bg-white px-3 py-2 text-sm peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white">
                Ekpan centre
              </span>
            </label>
          </div>
        </fieldset>
        <label className="block text-sm font-medium text-navy">
          Full name
          <input name="fullName" required autoComplete="name" className="field mt-1" />
        </label>
        <label className="block text-sm font-medium text-navy">
          Email
          <input name="email" type="email" required autoComplete="email" className="field mt-1" />
        </label>
        <label className="block text-sm font-medium text-navy">
          Phone
          <input name="phone" type="tel" required autoComplete="tel" className="field mt-1" />
        </label>
        <label className="block text-sm font-medium text-navy">
          What should the consultation cover?
          <textarea name="note" rows={3} className="field mt-1" />
        </label>
        {!selected && state.error === "" ? (
          <p className="text-xs text-ink/60">Select a date, then a time.</p>
        ) : null}
        <Status {...state} />
        <button className="btn-gold" type="submit" disabled={pending || !selected}>
          {pending ? "Saving the request…" : "Request this consultation"}
        </button>
      </div>
    </form>
  );
}
