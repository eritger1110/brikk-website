// netlify/functions/complete-signup.js
export const handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    let bodyIn = {};
    try { bodyIn = JSON.parse(event.body || '{}'); }
    catch { return { statusCode: 400, body: JSON.stringify({ error: 'invalid JSON' }) }; }

    const { token, email, password, first_name, last_name } = bodyIn || {};
    if (!token || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: 'missing token/password' }) };
    }

    // Build body: include email only if present (server can derive from token)
    const payload = { token, password, first_name, last_name };
    if (email) payload.email = email;

    const apiRes = await fetch('https://api.getbrikk.com/api/auth/complete-signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'manual',
    });

    const text = await apiRes.text();
    let data; try { data = JSON.parse(text); } catch { data = { raw: text }; }

    // Forward Set-Cookie so browser gets JWT
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
