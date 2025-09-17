// netlify/functions/resend-verification.ts
import type { Handler } from '@netlify/functions';

const API = 'https://api.getbrikk.com/api';

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const cookie = event.headers.cookie || '';

    const res = await fetch(`${API}/auth/resend-verification`, {
      method: 'POST',
      headers: {
        cookie,
        'content-type': 'application/json',
        accept: 'application/json' as any
      },
      body: event.body || '{}',
      redirect: 'manual',
    });

    const txt = await res.text();
    let data: any; try { data = JSON.parse(txt); } catch { data = txt || {}; }

    // @ts-ignore
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
