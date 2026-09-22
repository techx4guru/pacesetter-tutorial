import { NextResponse } from "next/server";

export const runtime = "nodejs";
import { buildCheatSheetPdf } from "@/lib/cheat-sheet";
import { friendlyError, getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: { fullName?: string; email?: string };
  try {
    body = (await request.json()) as { fullName?: string; email?: string };
  } catch {
    return NextResponse.json({ error: "Send your name and email to unlock the sheet." }, { status: 400 });
  }

  const fullName = body.fullName?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";

  if (fullName.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase.rpc("capture_lead", {
    p_full_name: fullName,
    p_email: email,
    p_source: "cheat_sheet",
  });

  if (error) {
    return NextResponse.json({ error: friendlyError(error.message) }, { status: 400 });
  }

  const pdf = await buildCheatSheetPdf();
  return new NextResponse(Buffer.from(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Essential-STEM-Mathematics-Formula-Cheat-Sheet.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
