import { NextResponse } from 'next/server';
import { ADMIN_COOKIE } from '@/lib/admin-auth';
import { getAdminSessionToken } from '@/lib/admin-session';

export async function POST(req:Request){
  const form=await req.formData();
  const password=String(form.get('password')||'');
  if(!process.env.ADMIN_PASSWORD || password!==process.env.ADMIN_PASSWORD){
    return NextResponse.redirect(new URL('/admin/login?error=1',req.url),303);
  }

  const token = await getAdminSessionToken();
  if(!token){
    return NextResponse.redirect(new URL('/admin/login?error=session',req.url),303);
  }

  const res=NextResponse.redirect(new URL('/admin',req.url),303);
  res.cookies.set(ADMIN_COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:60*60*12});
  return res;
}
