// netlify/functions/complete-signup.js
const API = 'https://api.getbrikk.com/api/auth/complete-signup';

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const body = JSON.parse(event.body || '{}');

    const res = await fetch(API, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      redirect: 'manual', // don't auto-follow so we can capture Set-Cookie
    });

    // Capture Set-Cookie from the API and pass through to the browser
    // Netlify/undici: res.headers.raw() is available
    // @ts-ignore
    const raw = (res.headers.raw && res.headers.raw()['set-cookie']) ||
                (res.headers.get('set-cookie') ? [res.headers.get('set-cookie')] : []);

    const text = await res.text(); // JSON or text

    return {
      statusCode: res.status,
      body: text,
      headers: {
        'content-type': res.headers.get('content-type') || 'application/json',
        'cache-control': 'no-store',
      },
      multiValueHeaders: raw?.length ? { 'Set-Cookie': raw } : undefined,
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e) }) };
  }
};
