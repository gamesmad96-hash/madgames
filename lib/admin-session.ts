export async function getAdminSessionToken(): Promise<string | null> {
  const configured = process.env.ADMIN_SESSION_TOKEN?.trim();
  if (configured) return configured;

  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;

  const bytes = new TextEncoder().encode(`madgames-admin-session:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
}
