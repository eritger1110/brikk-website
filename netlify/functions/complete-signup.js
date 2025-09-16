// netlify/functions/complete-signup.js
exports.handler = async function (event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const API = "https://api.getbrikk.com/api/auth/complete-signup";
    const secret = process.env.PROVISION_SECRET;
    if (!secret) {
      return { statusCode: 500, body: JSON.stringify({ error: "Missing PROVISION_SECRET" }) };
    }

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // secret never sent to browser
        "authorization": `Bearer ${secret}`,
      },
      body: event.body, // { email, first_name, last_name, password }
    });

    const text = await res.text();
    return {
      statusCode: res.status,
      headers: { "content-type": res.headers.get("content-type") || "application/json" },
      body: text,
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message || "proxy failed" }) };
  }
};
