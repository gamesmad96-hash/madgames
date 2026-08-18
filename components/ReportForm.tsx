'use client';
import { useState } from 'react';
export function ReportForm({gameSlug}:{gameSlug:string}){
 const [reason,setReason]=useState('Does not load'),[message,setMessage]=useState(''),[email,setEmail]=useState(''),[status,setStatus]=useState('');
 async function submit(e:React.FormEvent){e.preventDefault();setStatus('Sending…');const r=await fetch('/api/reports',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({gameSlug,reason,message,email})});const j=await r.json();setStatus(r.ok?'Report received. Thank you.':(j.error||'Could not send report.'))}
 return <form className="contentCard reportForm" onSubmit={submit}><label>Game<input value={gameSlug} readOnly/></label><label>Reason<select value={reason} onChange={e=>setReason(e.target.value)}><option>Does not load</option><option>Broken controls</option><option>Wrong thumbnail</option><option>Inappropriate</option><option>Copyright</option><option>Other</option></select></label><label>Email (optional)<input type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Details<textarea rows={6} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Tell us what happened"/></label><button className="primaryBtn">Send report</button><span className="adminMsg">{status}</span></form>
}
