'use client';
import {useRef,useState} from 'react';
import type {Game} from '@/lib/types';
import styles from './PlayerShell.module.css';

export function PlayerShell({game}:{game:Game}){
  const [playing,setPlaying]=useState(false),[loading,setLoading]=useState(true),[frameKey,setFrameKey]=useState(0),[reported,setReported]=useState(false),[reporting,setReporting]=useState(false);
  const wrapRef=useRef<HTMLDivElement>(null);
  const iframeRef=useRef<HTMLIFrameElement>(null);
  const source=game.embedUrl||'/demo-game.html';
  const orientation=(game.orientation||'').toLowerCase();
  const isPortrait=orientation.includes('portrait')||Boolean(game.width&&game.height&&game.height>game.width);

  function track(event:string){
    fetch('/api/events',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({event,gameSlug:game.slug})}).catch(()=>{});
  }

  function play(){
    setPlaying(true);
    setLoading(true);
    track('game_play');
  }

  async function fullscreen(){
    let enteredFullscreen=false;
    const iframe=iframeRef.current;
    const wrap=wrapRef.current;
    try{
      const target=iframe?.requestFullscreen?iframe:wrap;
      if(target?.requestFullscreen){
        await target.requestFullscreen();
        enteredFullscreen=true;
      }
    }catch{}

    if(enteredFullscreen&&!isPortrait){
      try{
        const orientationApi=screen.orientation as ScreenOrientation&{lock?:(value:'landscape')=>Promise<void>};
        await orientationApi?.lock?.('landscape');
      }catch{}
    }

    if(!enteredFullscreen){
      window.open(source,'_blank','noopener,noreferrer');
    }
    track('game_fullscreen');
  }

  function openGame(){
    window.open(source,'_blank','noopener,noreferrer');
    track('game_open_direct');
  }

  function retry(){
    setFrameKey(k=>k+1);
    setLoading(true);
  }

  async function reportBroken(){
    if(reported||reporting)return;
    setReporting(true);
    try{
      const r=await fetch('/api/reports',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({gameSlug:game.slug,reason:'game_not_working',message:'Quick report submitted from the game player.'})});
      if(r.ok)setReported(true);
    }finally{
      setReporting(false);
    }
  }

  return <div className={`${styles.stage} ${isPortrait?styles.portrait:styles.landscape}`}>
    <div className={`playerWrap ${styles.frameShell}`} ref={wrapRef}>
      {!playing?
        <button className="playerCover" onClick={play}>
          {game.thumbnailUrl?<span className="coverThumb" style={{backgroundImage:`url("${game.thumbnailUrl.replaceAll('"','')}")`}}/>:<span className="coverEmoji">{game.emoji||'🎮'}</span>}
          <span className="coverTitle">{game.title}</span>
          <span className="primaryBtn">▶ Play now</span>
          <small>Instant browser game • no download</small>
        </button>
      :<>
        <iframe
          key={frameKey}
          ref={iframeRef}
          className={`gameFrame ${styles.iframe}`}
          src={source}
          title={`${game.title} game`}
          loading="eager"
          allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope; clipboard-read; clipboard-write; web-share"
          allowFullScreen
          onLoad={()=>setLoading(false)}
        />
        {loading&&<div className="gameLoading"><b>Loading {game.title}…</b><span>Licensed provider games can take a few seconds.</span></div>}
      </>}
    </div>
    {playing&&<>
      <div className={`playerControls ${styles.controls}`}>
        <button onClick={retry}>↻ Retry</button>
        <button onClick={fullscreen}>⛶ Fullscreen</button>
        <button onClick={openGame}>↗ Open game</button>
        <button onClick={reportBroken} disabled={reported||reporting}>{reported?'✓ Reported':reporting?'Reporting…':'⚠ Not working?'}</button>
      </div>
      <p className={styles.mobileHint}>For the best mobile controls, rotate your phone and tap Fullscreen. If fullscreen is blocked by the browser, Open game launches the provider directly.</p>
    </>}
  </div>;
}
