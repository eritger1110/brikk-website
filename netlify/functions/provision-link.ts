// netlify/functions/provision-link.ts
import Stripe from "stripe";
import * as jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

function json(status: number, body: any) {
  return {
    statusCode: status,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };
}

export async function handler(event: any) {
  try {
    // Accept session_id from querystring (success page sends it as ?session_id=...)
    const session_id =
      (event.queryStringParameters && event.queryStringParameters.session_id) ||
      new URLSearchParams(event.rawUrl?.split("?")[1] || "").get("session_id");

    if (!session_id) return json(400, { error: "Missing session_id" });

    const JWT_SECRET = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET) return json(500, { error: "Missing JWT_SECRET_KEY" });

    // Where to send the user to set the cookie (Render /welcome)
    const WELCOME = (process.env.APP_WELCOME_URL ||
      "https://app.getbrikk.com/welcome").replace(/\/$/, "");

    // Pull basic info about the session/customer
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["customer", "subscription"],
    });

    if (session.mode !== "subscription") return json(400, { error: "Wrong mode" });
    if (session.status !== "complete")
      return json(400, { error: `Session not complete (status=${session.status})` });

    const email =
      session.customer_details?.email ||
      (typeof session.customer === "object"
        ? ((session.customer as any).email as string)
        : undefined);

    const name =
      session.customer_details?.name ||
      (typeof session.customer === "object"
        ? ((session.customer as any).name as string)
        : undefined);

    const customerId =
      typeof session.customer === "string"
        ? session.customer
        : ((session.customer as any)?.id as string | undefined);

    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : ((session.subscription as any)?.id as string | undefined);

    // Payload we’ll pass through the short-lived link token
    const payload = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 600, // 10 minutes
      email,
      name,
      customer: customerId || null,
      subscription: subscriptionId || null,
      source: "netlify-provision",
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      algorithm: "HS256",
      issuer: "brikk-netlify",
      subject: email || customerId || "unknown",
    });

    const redirect = `${WELCOME}?token=${encodeURIComponent(token)}`;
    return json(200, { redirect });
  } catch (err: any) {
    console.error("provision-link error", err);
    return json(500, { error: "Failed to make provision link" });
  }
}
