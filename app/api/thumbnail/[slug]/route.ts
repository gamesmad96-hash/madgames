import { NextResponse } from 'next/server';

function hash(input:string){ let h=2166136261; for(let i=0;i<input.length;i++){ h^=input.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }
function esc(value:string){ const entities:Record<string,string>={ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;' }; return value.replace(/[&<>"']/g,ch=>entities[ch]||ch); }
function fromSlug(slug:string){ return slug.replace(/[-_]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase()).trim(); }
function wrapTitle(title:string){
  const words=title.split(/\s+/).filter(Boolean); const lines:string[]=[]; let line='';
  for(const word of words){ const next=line?`${line} ${word}`:word; if(next.length>24&&line){ lines.push(line); line=word; } else line=next; if(lines.length===2) break; }
  if(line&&lines.length<2) lines.push(line);
  const used=lines.join(' ').length; if(used<title.length&&lines.length) lines[lines.length-1]=`${lines[lines.length-1].slice(0,21).trim()}…`;
  return lines.slice(0,2);
}

export async function GET(req:Request,{params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const url=new URL(req.url);
  const title=(url.searchParams.get('title')||fromSlug(slug)||'MADGAMES').slice(0,70);
  const category=(url.searchParams.get('category')||'Browser Game').slice(0,32);
  const palettes=[['#111827','#7c3aed'],['#0f172a','#2563eb'],['#18181b','#db2777'],['#111827','#059669'],['#172554','#9333ea'],['#1f2937','#ea580c']];
  const [a,b]=palettes[hash(slug)%palettes.length];
  const lines=wrapTitle(title);
  const titleSvg=lines.map((line,i)=>`<text x="54" y="${235+i*72}" fill="white" font-size="58" font-weight="800" font-family="Arial,Helvetica,sans-serif">${esc(line)}</text>`).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><radialGradient id="r"><stop offset="0" stop-color="white" stop-opacity=".18"/><stop offset="1" stop-color="white" stop-opacity="0"/></radialGradient></defs>
    <rect width="800" height="450" rx="28" fill="url(#g)"/>
    <circle cx="670" cy="90" r="220" fill="url(#r)"/>
    <circle cx="710" cy="395" r="170" fill="url(#r)" opacity=".7"/>
    <rect x="54" y="52" width="${Math.min(270,Math.max(120,category.length*15+44))}" height="48" rx="24" fill="white" fill-opacity=".13" stroke="white" stroke-opacity=".2"/>
    <text x="76" y="84" fill="white" font-size="22" font-weight="700" font-family="Arial,Helvetica,sans-serif">${esc(category.toUpperCase())}</text>
    ${titleSvg}
    <text x="54" y="398" fill="white" fill-opacity=".78" font-size="23" font-weight="700" font-family="Arial,Helvetica,sans-serif">PLAY FREE • MADGAMES.FUN</text>
    <circle cx="710" cy="346" r="46" fill="white" fill-opacity=".94"/><path d="M698 322 L698 370 L733 346 Z" fill="${b}"/>
  </svg>`;
  return new NextResponse(svg,{headers:{'Content-Type':'image/svg+xml; charset=utf-8','Cache-Control':'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000'}});
}
