// brikk-website/netlify/functions/complete-signup.js
export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const secret = process.env.PROVISION_SECRET;
  if (!secret) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: "missing PROVISION_SECRET" }),
    };
  }

  let body = {};
  try { body = JSON.parse(event.body || "{}"); } catch {}

  const res = await fetch("https://api.getbrikk.com/api/auth/complete-signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${secret}`,   // <-- the important bit
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  return {
    statusCode: res.status,
    headers: { "content-type": "application/json" },
    body: text,
  };
};
