// netlify/functions/me.js
export async function handler(event) {
  try {
    if (event.httpMethod !== 'GET') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
    const cookie = event.headers.cookie || '';
    const res = await fetch('https://api.getbrikk.com/api/auth/me', {
      method: 'GET',
      headers: { cookie }
    });
    const body = await res.text();
    return {
      statusCode: res.status,
      headers: { 'content-type': res.headers.get('content-type') || 'application/json',
                 'cache-control': 'no-store' },
      body
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e?.message || e) }) };
  }
}
