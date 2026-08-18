'use client';
import { useMemo, useState } from 'react';
import type { Game } from '@/lib/types'; import { GameCard } from './GameCard';
export function SearchClient({games}:{games:Game[]}){
 const [query,setQuery]=useState('');
 const results=useMemo(()=>{const q=query.trim().toLowerCase(); if(!q)return games; return games.filter(g=>`${g.title} ${g.category} ${g.description} ${(g.tags||[]).join(' ')}`.toLowerCase().includes(q));},[query,games]);
 function change(v:string){setQuery(v); if(v.trim()) fetch('/api/events',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({event:'search',metadata:{q:v.trim().slice(0,80)}})}).catch(()=>{});}
 return <><div className="bigSearch"><span>⌕</span><input autoFocus value={query} onChange={e=>change(e.target.value)} placeholder="Search games, racing, puzzle..."/></div><p className="resultCount">{results.length} games found</p><div className="gameGrid">{results.map(g=><GameCard key={g.id} game={g}/>)}</div></>;
}
