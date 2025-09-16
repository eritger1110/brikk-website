// netlify/functions/complete-signup.js
export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");

    // Inject the shared secret from Netlify env (do NOT expose this in client code)
    const token = (process.env.PROVISION_SECRET || "").trim();
    if (!token) {
      return { statusCode: 500, body: JSON.stringify({ error: "missing PROVISION_SECRET" }) };
    }

    // Forward to Render API. We send token via Authorization to keep the body clean.
    const res = await fetch("https://api.getbrikk.com/api/auth/complete-signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // your backend now accepts either body.token or Authorization:
        // we'll use an auth header
        "Authorization": `Provision ${token}`,
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    return {
      statusCode: res.status,
      headers: { "content-type": "application/json" },
      body: text,
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "proxy-failed", detail: String(err) }) };
  }
}
