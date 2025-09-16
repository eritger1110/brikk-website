// netlify/functions/complete-signup.js
export const handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    let bodyIn = {};
    try {
      bodyIn = JSON.parse(event.body || '{}');
    } catch {
      return { statusCode: 400, body: JSON.stringify({ error: 'invalid JSON' }) };
    }

    const { token, email, password, first_name, last_name } = bodyIn || {};
    if (!token || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'missing token/email/password' }),
      };
    }

    const apiRes = await fetch('https://api.getbrikk.com/api/auth/complete-signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      // API currently expects email in the body alongside the token
      body: JSON.stringify({ token, email, password, first_name, last_name }),
      redirect: 'manual',
    });

    // Capture body (json or text)
    const text = await apiRes.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    // Forward Set-Cookie so the browser gets the JWT from the API
    const setCookies =
      typeof apiRes.headers.raw === 'function'
        ? apiRes.headers.raw()['set-cookie'] || []
        : (apiRes.headers.get('set-cookie') ? [apiRes.headers.get('set-cookie')] : []);

    const out = {
      statusCode: apiRes.status,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
      body: JSON.stringify(data),
    };
    if (setCookies.length) out.multiValueHeaders = { 'Set-Cookie': setCookies };
    return out;
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e?.message || e) }) };
  }
};
