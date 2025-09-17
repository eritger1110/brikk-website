// netlify/functions/me.ts
import type { Handler } from '@netlify/functions';

const API = 'https://api.getbrikk.com/api';

export const handler: Handler = async (event) => {
  try {
    const cookie = event.headers.cookie || '';

    const res = await fetch(`${API}/auth/me`, {
      method: 'GET',
      headers: { cookie, accept: 'application/json' as any },
      redirect: 'manual',
    });

    const txt = await res.text();
    let data: any;
    try { data = JSON.parse(txt); } catch { data = txt || {}; }

    // Forward any cookies the API set (rare here, but safe)
    // @ts-ignore - undici/raw in Netlify
    const raw = (typeof res.headers.raw === 'function')
      ? res.headers.raw()['set-cookie'] || []
      : (res.headers.get('set-cookie') ? [res.headers.get('set-cookie')] : []);

    const out: any = {
      statusCode: res.status,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
      body: typeof data === 'string' ? data : JSON.stringify(data),
    };
    if (raw?.length) out.multiValueHeaders = { 'Set-Cookie': raw };
    return out;
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ error: e?.message || String(e) }) };
  }
};
