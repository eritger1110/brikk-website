// netlify/functions/verify.ts
import type { Handler } from '@netlify/functions';

const API_VERIFY = 'https://api.getbrikk.com/api/auth/verify';

export const handler: Handler = async (event) => {
  try {
    const token = event.queryStringParameters?.token || '';
    if (!token) {
      return { statusCode: 400, body: 'Missing token' };
    }

    // Call the API verify endpoint but DON'T auto-follow redirects
    const res = await fetch(`${API_VERIFY}?token=${encodeURIComponent(token)}`, {
      method: 'GET',
      redirect: 'manual',
    });

    // Grab Set-Cookie headers from the API response so the browser sets your JWT
    // Netlify needs multiValueHeaders to send multiple Set-Cookie headers.
    // @ts-ignore - undici Headers in Netlify exposes raw()
    const rawCookies =
      (typeof (res.headers as any).raw === 'function'
        ? (res.headers as any).raw()['set-cookie']
        : null) ||
      (res.headers.get('set-cookie') ? [res.headers.get('set-cookie') as string] : []);

    return {
      statusCode: 302,
      headers: {
        Location: '/app',
        'Cache-Control': 'no-store',
      },
      multiValueHeaders: rawCookies?.length ? { 'Set-Cookie': rawCookies } : undefined,
    };
  } catch (e: any) {
    return { statusCode: 500, body: `Verify failed: ${e?.message || e}` };
  }
};
