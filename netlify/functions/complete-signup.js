// netlify/functions/complete-signup.js
// Forwards signup to the API and forwards Set-Cookie headers.
// Do NOT require email here; backend derives it from the provision token.

const API_BASE = process.env.API_BASE || "https://api.getbrikk.com/api";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { token, first_name, last_name, password } = JSON.parse(event.body || "{}");

    if (!token)    return { statusCode: 400, body: JSON.stringify({ error: "missing token" }) };
    if (!password) return { statusCode: 400, body: JSON.stringify({ error: "missing password" }) };
    // NOTE: no email check here on purpose

    const upstream = await fetch(`${API_BASE}/auth/complete-signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, first_name, last_name, password }),
      redirect: "manual",
    });

    // Body (json or text)
    const ct = upstream.headers.get("content-type") || "";
    let payload;
    if (ct.includes("application/json")) {
      payload = await upstream.json().catch(() => ({}));
    } else {
      payload = { message: await upstream.text().catch(() => "") };
    }

    // Forward Set-Cookie to the browser
    // Netlify/undici exposes headers.raw() with multiple cookies
    // @ts-ignore
    const rawCookies =
      (upstream.headers.raw && upstream.headers.raw()["set-cookie"]) ||
      (upstream.headers.get("set-cookie") ? [upstream.headers.get("set-cookie")] : undefined);

    return {
      statusCode: upstream.status,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
      multiValueHeaders: rawCookies ? { "set-cookie": rawCookies } : undefined,
      body: JSON.stringify(payload || {}),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "function_error", message: String(e && e.message || e) }),
    };
  }
};
