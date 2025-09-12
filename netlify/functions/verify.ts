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
    // @ts-ignore - headers.raw exists in the Node/undici fetch that Netlify uses
    const raw = (res.headers.raw && res.headers.raw()['set-cookie']) ||
                (res.headers.get('set-cookie') ? [res.headers.get('set-cookie')] : []);

    return {
      statusCode: 302,
      headers: {
        Location: '/app',
        'Cache-Control': 'no-store',
      },
      // Forward cookies through Netlify to the browser
      multiValueHeaders: raw?.length ? { 'Set-Cookie': raw } : undefined,
    };
  } catch (e: any) {
    return { statusCode: 500, body: `Verify failed: ${e?.message || e}` };
  }
};
