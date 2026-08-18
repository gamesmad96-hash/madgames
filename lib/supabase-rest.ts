const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function hasSupabase() {
  return Boolean(url && (serviceKey || anonKey));
}

function headers(admin = false, extra: Record<string,string> = {}) {
  const key = admin ? serviceKey : (anonKey || serviceKey);
  if (!url || !key) throw new Error('Supabase is not configured');
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

export async function sbSelect<T>(path: string, options: { admin?: boolean; revalidate?: number } = {}): Promise<T> {
  if (!url) throw new Error('Supabase is not configured');
  const res = await fetch(`${url}/rest/v1/${path}`, {
    headers: headers(Boolean(options.admin)),
    next: { revalidate: options.revalidate ?? 60 },
  });
  if (!res.ok) throw new Error(`Supabase select failed: ${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

export async function sbWrite<T>(table: string, method: 'POST'|'PATCH'|'DELETE', body?: unknown, query = '', prefer = 'return=representation'): Promise<T> {
  if (!url || !serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for writes');
  const res = await fetch(`${url}/rest/v1/${table}${query}`, {
    method,
    headers: headers(true, { Prefer: prefer }),
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Supabase write failed: ${res.status} ${await res.text()}`);
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

export async function sbCount(table: string, query = ''): Promise<number> {
  if (!url) return 0;
  const res = await fetch(`${url}/rest/v1/${table}?select=id${query ? `&${query}` : ''}`, {
    method: 'HEAD',
    headers: headers(true, { Prefer: 'count=exact' }),
    cache: 'no-store',
  });
  const range = res.headers.get('content-range');
  const total = range?.split('/')?.[1];
  return total && total !== '*' ? Number(total) : 0;
}
