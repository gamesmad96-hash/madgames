import { cookies } from 'next/headers';
import { getAdminSessionToken } from './admin-session';

export const ADMIN_COOKIE = 'madgames_admin';

export async function isAdmin(){
  const token = await getAdminSessionToken();
  if(!token) return false;
  return (await cookies()).get(ADMIN_COOKIE)?.value === token;
}
