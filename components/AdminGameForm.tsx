'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Game } from '@/lib/types';

function slugify(v:string){return v.toLowerCase().trim().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,120)}

export function AdminGameForm({game}:{game?:Game}){
  const router=useRouter();
  const [form,setForm]=useState<Partial<Game>>(game||{provider:'manual',title:'',slug:'',category:'Casual',description:'',embedUrl:'',thumbnailUrl:'',status:'pending',mobileSupported:true,desktopSupported:true,emoji:'🎮',gradient:'g1'});
  const [msg,setMsg]=useState('');
  const set=(key:keyof Game,value:any)=>setForm(f=>({...f,[key]:value}));
  async function save(){
    setMsg('Saving…');
    const payload={...form,slug:form.slug||slugify(form.title||'')};
    const res=await fetch('/api/admin/games',{method:game?'PATCH':'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
    const data=await res.json();
    if(!res.ok){setMsg(data.error||'Save failed');return}
    setMsg('Saved.'); router.push('/admin/games'); router.refresh();
  }
  async function remove(){
    if(!game||!confirm('Delete this game?'))return;
    const res=await fetch('/api/admin/games',{method:'DELETE',headers:{'content-type':'application/json'},body:JSON.stringify({id:game.id})});
    if(res.ok){router.push('/admin/games');router.refresh()}else setMsg('Delete failed');
  }
  return <section className="adminPanel"><div className="formGrid">
    <label>Title<input value={form.title||''} onChange={e=>{set('title',e.target.value);if(!game)set('slug',slugify(e.target.value))}}/></label>
    <label>Slug<input value={form.slug||''} onChange={e=>set('slug',slugify(e.target.value))}/></label>
    <label>Provider<input value={form.provider||''} onChange={e=>set('provider',e.target.value)}/></label>
    <label>Provider game ID<input value={form.providerGameId||''} onChange={e=>set('providerGameId',e.target.value)}/></label>
    <label>Category<input value={form.category||''} onChange={e=>set('category',e.target.value)}/></label>
    <label>Status<select value={form.status||'pending'} onChange={e=>set('status',e.target.value)}><option>draft</option><option>pending</option><option>published</option><option>disabled</option></select></label>
    <label className="span2">Embed URL<input value={form.embedUrl||''} onChange={e=>set('embedUrl',e.target.value)} placeholder="Official provider iframe/game URL"/></label>
    <label className="span2">Thumbnail URL<input value={form.thumbnailUrl||''} onChange={e=>set('thumbnailUrl',e.target.value)}/></label>
    <label className="span2">Description<textarea value={form.description||''} onChange={e=>set('description',e.target.value)} rows={5}/></label>
    <label className="span2">SEO description<textarea value={form.seoDescription||''} onChange={e=>set('seoDescription',e.target.value)} rows={3}/></label>
    <label className="span2">How to play<textarea value={form.instructions||''} onChange={e=>set('instructions',e.target.value)} rows={3}/></label>
    <label className="span2">Controls<textarea value={form.controls||''} onChange={e=>set('controls',e.target.value)} rows={2}/></label>
    <label className="checkLabel"><input type="checkbox" checked={Boolean(form.featured)} onChange={e=>set('featured',e.target.checked)}/> Featured</label>
    <label className="checkLabel"><input type="checkbox" checked={Boolean(form.trending)} onChange={e=>set('trending',e.target.checked)}/> Trending</label>
  </div><div className="formActions"><button className="primaryBtn" onClick={save}>Save game</button>{game&&<button className="dangerBtn" onClick={remove}>Delete</button>}<span className="adminMsg">{msg}</span></div></section>
}
