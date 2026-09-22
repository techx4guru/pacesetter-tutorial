"use server";

import { getSupabase, friendlyError } from "@/lib/supabase";
import { bookingTimes, modes, subjectOptions } from "@/lib/site";

export type FormState = {
  done: boolean;
  error: string;
  detail: string;
};

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function botFilled(formData: FormData) {
  return text(formData, "company").length > 0;
}

export async function submitEnrollment(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (botFilled(formData)) return { done: true, error: "", detail: "" };

  const fullName = text(formData, "fullName");
  const email = text(formData, "email").toLowerCase();
  const phone = text(formData, "phone");
  const level = text(formData, "level");
  const preferredMode = text(formData, "preferredMode");
  const message = text(formData, "message");
  const subjects = formData
    .getAll("subjects")
    .map((item) => String(item).trim())
    .filter((item) => (subjectOptions as readonly string[]).includes(item));

  if (fullName.length < 2) {
    return { done: false, error: "Please enter your full name.", detail: "" };
  }
  if (!isEmail(email)) {
    return { done: false, error: "Please enter a valid email address.", detail: "" };
  }
  if (phone.length < 7) {
    return {
      done: false,
      error: "Please enter a phone number we can reach you on.",
      detail: "",
    };
  }
  if (subjects.length === 0) {
    return { done: false, error: "Select at least one subject.", detail: "" };
  }
  if (level !== "secondary" && level !== "university") {
    return { done: false, error: "Choose secondary school or university.", detail: "" };
  }
  if (!modes.some((mode) => mode.value === preferredMode)) {
    return { done: false, error: "Choose how you would like to learn.", detail: "" };
  }

  const supabase = getSupabase();
  const { error } = await supabase.rpc("submit_enrollment", {
    p_full_name: fullName,
    p_email: email,
    p_phone: phone,
    p_subjects: subjects,
    p_level: level,
    p_preferred_mode: preferredMode,
    p_message: message,
  });

  if (error) return { done: false, error: friendlyError(error.message), detail: "" };
  return {
    done: true,
    error: "",
    detail:
      "Your enrolment request is saved. Engr. Omorewa will reach you on the phone number or email you gave.",
  };
}

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (botFilled(formData)) return { done: true, error: "", detail: "" };

  const fullName = text(formData, "fullName");
  const email = text(formData, "email").toLowerCase();
  const phone = text(formData, "phone");
  const topic = text(formData, "topic");
  const message = text(formData, "message");

  if (fullName.length < 2) {
    return { done: false, error: "Please enter your full name.", detail: "" };
  }
  if (!isEmail(email)) {
    return { done: false, error: "Please enter a valid email address.", detail: "" };
  }
  if (message.length < 8) {
    return {
      done: false,
      error: "Please write a short message so we know how to help.",
      detail: "",
    };
  }

  const supabase = getSupabase();
  const { error } = await supabase.rpc("submit_contact", {
    p_full_name: fullName,
    p_email: email,
    p_phone: phone,
    p_topic: topic,
    p_message: message,
  });

  if (error) return { done: false, error: friendlyError(error.message), detail: "" };
  return {
    done: true,
    error: "",
    detail: "Your message is with Pacesetter Tutorial. Expect a reply by phone or email.",
  };
}

export async function submitBooking(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (botFilled(formData)) return { done: true, error: "", detail: "" };

  const fullName = text(formData, "fullName");
  const email = text(formData, "email").toLowerCase();
  const phone = text(formData, "phone");
  const preferredDate = text(formData, "preferredDate");
  const preferredTime = text(formData, "preferredTime");
  const mode = text(formData, "mode");
  const note = text(formData, "note");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    return { done: false, error: "Choose a date on the calendar.", detail: "" };
  }
  if (!bookingTimes.some((slot) => slot.value === preferredTime)) {
    return { done: false, error: "Choose one of the listed consultation times.", detail: "" };
  }
  if (mode !== "online" && mode !== "physical") {
    return { done: false, error: "Choose online or the Ekpan learning centre.", detail: "" };
  }

  const supabase = getSupabase();
  const { error } = await supabase.rpc("submit_booking", {
    p_full_name: fullName,
    p_email: email,
    p_phone: phone,
    p_preferred_date: preferredDate,
    p_preferred_time: preferredTime,
    p_mode: mode,
    p_note: note,
  });

  if (error) return { done: false, error: friendlyError(error.message), detail: "" };

  const slot = bookingTimes.find((item) => item.value === preferredTime)?.label;
  return {
    done: true,
    error: "",
    detail: `Your consultation request for ${preferredDate} at ${slot} WAT is saved. We will confirm by phone or WhatsApp.`,
  };
}

export async function submitNewsletter(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (botFilled(formData)) return { done: true, error: "", detail: "" };

  const email = text(formData, "email").toLowerCase();
  if (!isEmail(email)) {
    return { done: false, error: "Please enter a valid email address.", detail: "" };
  }

  const supabase = getSupabase();
  const { error } = await supabase.rpc("capture_lead", {
    p_full_name: "",
    p_email: email,
    p_source: "newsletter",
  });

  if (error) return { done: false, error: friendlyError(error.message), detail: "" };
  return {
    done: true,
    error: "",
    detail: "You are on the list. Class openings and exam-season notes will come to this email.",
  };
}
