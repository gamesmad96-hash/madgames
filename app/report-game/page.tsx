import type {Metadata} from 'next';
import {ReportForm} from '@/components/ReportForm';

export const metadata:Metadata={
  title:'Report a Game',
  description:'Report a loading problem, incorrect content or rights issue for a game on MADGAMES.FUN.',
  alternates:{canonical:'/report-game'},
  robots:{index:false,follow:true}
};

export default async function Page({searchParams}:{searchParams:Promise<{game?:string}>}){const q=await searchParams;return <div className="pageShell narrow"><div className="pageTitle"><div className="eyebrow">REPORT</div><h1>Report a game</h1><p>Tell us about loading problems, incorrect content, or a rights issue.</p></div><ReportForm gameSlug={q.game||''}/></div>}
