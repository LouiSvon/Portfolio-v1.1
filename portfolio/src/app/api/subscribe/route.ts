import { NextRequest, NextResponse } from "next/server";

// Requires server-side deployment (not compatible with static export).
// Set BREVO_API_KEY + BREVO_LIST_ID env vars to activate Brevo integration.
// Without them, the subscription is logged only (useful for testing).
export async function POST(req: NextRequest) {
  try {
    const { email, resource } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (apiKey && listId) {
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          email,
          listIds: [parseInt(listId, 10)],
          attributes: { RESOURCE: resource ?? "" },
          updateEnabled: true,
        }),
      });

      if (!res.ok && res.status !== 204) {
        console.error("Brevo error:", res.status, await res.text());
        return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
      }
    } else {
      // Dev mode: log the subscription without sending anywhere
      console.log("[subscribe] New subscriber:", { email, resource });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
