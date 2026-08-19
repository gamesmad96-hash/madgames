import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
    SUPABASE_PUBLISHABLE_KEY: Boolean(process.env.SUPABASE_PUBLISHABLE_KEY),
    SUPABASE_SECRET_KEY: Boolean(process.env.SUPABASE_SECRET_KEY),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    ADMIN_PASSWORD: Boolean(process.env.ADMIN_PASSWORD),
    ADMIN_SESSION_TOKEN: Boolean(process.env.ADMIN_SESSION_TOKEN),
  };

  const resolved = {
    supabaseUrl: checks.NEXT_PUBLIC_SUPABASE_URL || checks.SUPABASE_URL,
    publicKey: checks.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || checks.SUPABASE_PUBLISHABLE_KEY,
    adminKey: checks.SUPABASE_SECRET_KEY || checks.SUPABASE_SERVICE_ROLE_KEY,
  };

  return NextResponse.json({ checks, resolved });
}
