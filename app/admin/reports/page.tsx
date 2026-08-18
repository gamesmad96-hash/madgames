import { hasSupabase, sbSelect } from '@/lib/supabase-rest';
export default async function Reports(){
 let reports:any[]=[]; if(hasSupabase()){try{reports=await sbSelect<any[]>('reports?select=*&order=created_at.desc&limit=200',{admin:true,revalidate:0})}catch{}}
 return <div className="pageShell"><div className="pageTitle"><div className="eyebrow">MODERATION</div><h1>Game reports</h1><p>Loading issues, content reports and rights requests submitted by visitors.</p></div><section className="adminPanel">{!reports.length?<div className="emptyState">No reports yet, or Supabase is not connected.</div>:<div className="adminTable">{reports.map(r=><div className="adminRow reportRow" key={r.id}><span className="miniArt">!</span><div><strong>{r.game_slug}</strong><small>{r.reason} • {new Date(r.created_at).toLocaleString()}</small><small>{r.message}</small></div><span className="statusPill">{r.status}</span><span></span></div>)}</div>}</section></div>
}
