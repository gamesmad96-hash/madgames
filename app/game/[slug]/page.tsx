import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {getGame,getGames} from '@/lib/catalog';
import {PlayerShell} from '@/components/PlayerShell';
import {ClientGameActions} from '@/components/ClientGameActions';
import {GameSection} from '@/components/GameSection';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const g=await getGame(slug);
  if(!g)return{};
  const description=g.seoDescription||g.description||`Play ${g.title} online free on MADGAMES.FUN.`;
  const seoTitle=`${g.title} — Play Free ${g.category} Game Online`;
  return{
    title:seoTitle,
    description,
    alternates:{canonical:`/game/${g.slug}`},
    openGraph:{title:`${seoTitle} | MADGAMES.FUN`,description,url:`/game/${g.slug}`,images:g.thumbnailUrl?[{url:g.thumbnailUrl,alt:`${g.title} ${g.category} game thumbnail`}]:undefined},
    twitter:{card:'summary_large_image',title:seoTitle,description,images:g.thumbnailUrl?[g.thumbnailUrl]:undefined}
  };
}

export default async function GamePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const [game,all]=await Promise.all([getGame(slug),getGames(120)]);
  if(!game)notFound();
  const related=all.filter(g=>g.slug!==game.slug&&(g.category===game.category||g.tags?.some(t=>game.tags?.includes(t)))).slice(0,10);
  const categorySlug=game.category.toLowerCase().replaceAll(' ','-');
  const breadcrumbLd={
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
      {'@type':'ListItem',position:2,name:`${game.category} Games`,item:`${siteUrl}/category/${categorySlug}`},
      {'@type':'ListItem',position:3,name:game.title,item:`${siteUrl}/game/${game.slug}`}
    ]
  };
  return <div className="pageShell narrow">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <div className="breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href={`/category/${categorySlug}`}>{game.category}</Link><span>›</span><span>{game.title}</span></div>
    <div className="gameTopbar"><div><h1>{game.title}</h1><p>{game.category} • {game.provider==='demo'?'Demo catalog':game.provider}</p></div><ClientGameActions slug={game.slug}/></div>
    <PlayerShell game={game}/>
    <section className="contentCard"><h2>About {game.title}</h2><p>{game.description}</p><h3>How to play</h3><p>{game.instructions||'Press Play and follow the instructions shown inside the game.'}</p><h3>Controls</h3><div className="controlChips"><span>{game.controls||'Controls vary by game.'}</span></div><div className="gameDetails"><span>Provider <b>{game.provider}</b></span><span>Mobile <b>{game.mobileSupported?'Yes':'No'}</b></span><span>Desktop <b>{game.desktopSupported?'Yes':'No'}</b></span></div><Link className="reportLink" href={`/report-game?game=${encodeURIComponent(game.slug)}`}>Report a problem with this game</Link></section>
    <GameSection title="More games like this" items={related}/>
  </div>;
}
