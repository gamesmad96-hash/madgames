import type { Game } from '../types';

function slugify(input:string){ return input.toLowerCase().trim().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,120) || `game-${Date.now()}`; }
function text(v:any){ return typeof v === 'string' ? v.trim() : ''; }
function first(obj:any, keys:string[]){ for(const k of keys){ if(obj?.[k] != null && obj[k] !== '') return obj[k]; } }
function toArray(payload:any):any[]{ if(Array.isArray(payload)) return payload; for(const k of ['games','data','items','results']) if(Array.isArray(payload?.[k])) return payload[k]; return []; }
function parseXml(xml:string){
  const blocks=[...xml.matchAll(/<(item|game)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map(m=>m[2]);
  const field=(block:string,names:string[])=>{ for(const n of names){ const m=block.match(new RegExp(`<${n}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${n}>`,'i')); if(m) return m[1].replace(/<!\[CDATA\[|\]\]>/g,'').trim(); } return ''; };
  return blocks.map(b=>({title:field(b,['title','name']),url:field(b,['url','game_url','gameurl','embed_url','location']),thumbnail:field(b,['thumbnail','image','thumb']),description:field(b,['description','desc']),category:field(b,['category','categories']),id:field(b,['id','game_id','gameid'])}));
}
export async function loadProviderFeed(provider:string, feedUrl:string, limit=100):Promise<Game[]> {
  const u=new URL(feedUrl); if(!['http:','https:'].includes(u.protocol)) throw new Error('Feed URL must be http/https');
  const res=await fetch(feedUrl,{cache:'no-store',headers:{'User-Agent':'MADGAMES.FUN publisher importer'}});
  if(!res.ok) throw new Error(`Provider feed failed: ${res.status}`);
  const raw=await res.text(); let rows:any[]=[];
  try{ rows=toArray(JSON.parse(raw)); }catch{ rows=parseXml(raw); }
  return rows.slice(0,Math.min(limit,500)).map<Game>((r,i)=>{
    const title=text(first(r,['title','name','game_name'])) || `Imported Game ${i+1}`;
    const embedUrl=text(first(r,['embedUrl','embed_url','gameUrl','game_url','url','location','iframe']));
    const category=text(first(r,['category','genre'])) || 'Casual';
    const desc=text(first(r,['description','desc','game_description']));
    const thumb=text(first(r,['thumbnailUrl','thumbnail_url','thumbnail','image','thumb']));
    const providerGameId=String(first(r,['id','game_id','gameId']) ?? `${slugify(title)}-${i}`);
    return {id:`preview-${provider}-${providerGameId}`,provider,providerGameId,title,slug:slugify(title),description:desc,seoDescription:null,instructions:null,controls:null,embedUrl,thumbnailUrl:thumb||null,screenshots:[],category,categories:[category],tags:[],mobileSupported:true,desktopSupported:true,width:Number(first(r,['width']))||null,height:Number(first(r,['height']))||null,orientation:null,language:'en',status:'pending',featured:false,trending:false,badge:'NEW',emoji:'🎮',gradient:`g${(i%24)+1}`,publishedAt:null,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
  }).filter(g=>Boolean(g.embedUrl));
}
