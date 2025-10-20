// netlify/functions/me.ts
export async function handler(event: any) {
  const { httpMethod, headers } = event;

  if (httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "access-control-allow-origin": "https://www.getbrikk.com",
        "access-control-allow-credentials": "true",
        "access-control-allow-headers": "content-type",
        "access-control-allow-methods": "GET,OPTIONS",
      },
      body: "",
    };
  }

  if (httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const cookie = headers?.cookie || "";
  const res = await fetch("https://api.getbrikk.com/api/auth/me", {
    method: "GET",
    headers: { cookie },
  });

  const body = await res.text();
  return {
    statusCode: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json",
      "cache-control": "no-store",
      "access-control-allow-origin": "https://www.getbrikk.com",
      "access-control-allow-credentials": "true",
    },
    body,
  };
}
