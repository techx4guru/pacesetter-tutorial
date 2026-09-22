import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return client;
}

export function friendlyError(message: string) {
  const cleaned = message.replace(/^.*ERROR:\s*/i, "").split("\n")[0]?.trim();
  if (!cleaned) {
    return "We could not save that just now. Please try again, or message Engr. Omorewa on WhatsApp.";
  }
  if (/please |choose |select |sundays |unknown |enter /i.test(cleaned)) {
    return cleaned.replace(/\.$/, "") + ".";
  }
  return "We could not save that just now. Please try again, or message Engr. Omorewa on WhatsApp.";
}
