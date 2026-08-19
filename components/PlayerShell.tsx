'use client';
import { useRef,useState } from 'react';
import type { Game } from '@/lib/types';

export function PlayerShell({game}:{game:Game}){
 const [playing,setPlaying]=useState(false),[loading,setLoading]=useState(true),[frameKey,setFrameKey]=useState(0),[reported,setReported]=useState(false),[reporting,setReporting]=useState(false);
 const frameRef=useRef<HTMLDivElement>(null);
 const source=game.embedUrl||'/demo-game.html';
 function play(){setPlaying(true);setLoading(true);fetch('/api/events',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({event:'game_play',gameSlug:game.slug})}).catch(()=>{});}
 async function fullscreen(){await frameRef.current?.requestFullscreen?.();fetch('/api/events',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({event:'game_fullscreen',gameSlug:game.slug})}).catch(()=>{});}
 function retry(){setFrameKey(k=>k+1);setLoading(true);}
 async function reportBroken(){
  if(reported||reporting)return;
  setReporting(true);
  try{
   const r=await fetch('/api/reports',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({gameSlug:game.slug,reason:'game_not_working',message:'Quick report submitted from the game player.'})});
   if(r.ok)setReported(true);
  }finally{setReporting(false);}
 }
 return <div className="playerWrap" ref={frameRef}>{!playing?<button className="playerCover" onClick={play}>{game.thumbnailUrl?<span className="coverThumb" style={{backgroundImage:`url("${game.thumbnailUrl.replaceAll('"','')}")`}}/>:<span className="coverEmoji">{game.emoji||'🎮'}</span>}<span className="coverTitle">{game.title}</span><span className="primaryBtn">▶ Play now</span><small>Instant browser game • no download</small></button>:<><iframe key={frameKey} className="gameFrame" src={source} title={`${game.title} game`} loading="eager" allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write" allowFullScreen onLoad={()=>setLoading(false)}/>{loading&&<div className="gameLoading"><b>Loading {game.title}…</b><span>Licensed provider games can take a few seconds.</span></div>}<div className="playerControls"><button onClick={retry}>↻ Retry</button><button onClick={fullscreen}>⛶ Fullscreen</button><button onClick={reportBroken} disabled={reported||reporting}>{reported?'✓ Reported':reporting?'Reporting…':'⚠ Not working?'}</button></div></>}</div>;
}
