import { cookies } from 'next/headers';
export const ADMIN_COOKIE = 'madgames_admin';
export async function isAdmin(){
  const token = process.env.ADMIN_SESSION_TOKEN;
  if(!token) return false;
  return (await cookies()).get(ADMIN_COOKIE)?.value === token;
}
