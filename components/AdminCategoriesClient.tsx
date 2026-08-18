'use client';
import { useState } from 'react';
import type { Category } from '@/lib/types';
export function AdminCategoriesClient({initial}:{initial:Category[]}){
 const [cats,setCats]=useState(initial),[name,setName]=useState(''),[msg,setMsg]=useState('');
 async function add(){if(!name.trim())return;setMsg('Saving…');const slug=name.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');const r=await fetch('/api/admin/categories',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name,slug,enabled:true,sortOrder:cats.length})});const j=await r.json();if(!r.ok){setMsg(j.error||'Failed');return}setCats([...cats,j]);setName('');setMsg('Saved')}
 return <section className="adminPanel"><div className="categoryAdd"><input value={name} onChange={e=>setName(e.target.value)} placeholder="New category name"/><button className="primaryBtn" onClick={add}>Add category</button><span className="adminMsg">{msg}</span></div><div className="adminTable">{cats.map(c=><div className="adminRow categoryRow" key={c.id||c.slug}><span className="miniArt">🎮</span><div><strong>{c.name}</strong><small>/{c.slug}</small></div><span className="statusPill">{c.enabled===false?'Disabled':'Enabled'}</span><span>#{c.sortOrder??0}</span></div>)}</div></section>
}
