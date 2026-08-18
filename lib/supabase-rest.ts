const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL)?.replace(/\/$/, '');

// Prefer Supabase's new publishable/secret keys, while keeping legacy env names
// as a fallback so existing deployments do not break during migration.
const adminKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const publicKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function hasSupabase() {
  return Boolean(url && (adminKey || publicKey));
}

function headers(admin = false, extra: Record<string, string> = {}) {
  const key = admin ? adminKey : (publicKey || adminKey);
  if (!url || !key) throw new Error('Supabase is not configured');

  const base: Record<string, string> = {
    apikey: key,
    'Content-Type': 'application/json',
  };

  // New sb_publishable_/sb_secret_ keys are opaque API keys and must not be
  // used as Bearer JWTs. Legacy anon/service_role JWTs still require this.
  if (!key.startsWith('sb_')) {
    base.Authorization = `Bearer ${key}`;
  }

  return {
    ...base,
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

export async function sbWrite<T>(table: string, method: 'POST' | 'PATCH' | 'DELETE', body?: unknown, query = '', prefer = 'return=representation'): Promise<T> {
  if (!url || !adminKey) throw new Error('A Supabase server secret key is required for writes');
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
