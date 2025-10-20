// netlify/functions/complete-signup.ts
export async function handler(event: any) {
  const { httpMethod } = event;

  if (httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "access-control-allow-origin": "https://www.getbrikk.com",
        "access-control-allow-credentials": "true",
        "access-control-allow-headers": "content-type",
        "access-control-allow-methods": "POST,OPTIONS",
      },
      body: "",
    };
  }
  if (httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const res = await fetch("https://api.getbrikk.com/api/auth/complete-signup", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: event.body || "{}",
  });

  const text = await res.text();
  return {
    statusCode: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json",
      "cache-control": "no-store",
      "access-control-allow-origin": "https://www.getbrikk.com",
      "access-control-allow-credentials": "true",
    },
    body: text,
  };
}
