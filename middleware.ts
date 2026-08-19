import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionToken } from './lib/admin-session';

export async function middleware(req:NextRequest){
  const p=req.nextUrl.pathname;
  if(p==='/admin/login'||p==='/api/admin/login') return NextResponse.next();

  if(p.startsWith('/admin')||p.startsWith('/api/admin')){
    const token=await getAdminSessionToken();
    if(!token || req.cookies.get('madgames_admin')?.value!==token){
      if(p.startsWith('/api/')) return NextResponse.json({error:'Unauthorized'},{status:401});
      const u=req.nextUrl.clone();
      u.pathname='/admin/login';
      return NextResponse.redirect(u);
    }
  }

  return NextResponse.next();
}

export const config={matcher:['/admin/:path*','/api/admin/:path*']};
