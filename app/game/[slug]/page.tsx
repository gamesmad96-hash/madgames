import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {getGame,getGames} from '@/lib/catalog';
import {PlayerShell} from '@/components/PlayerShell';
import {ClientGameActions} from '@/components/ClientGameActions';
import {GameSection} from '@/components/GameSection';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

function gameDescription(title:string,category:string,base?:string|null){
  const first=(base||'').trim();
  const suffix=` Play ${title} free online on MADGAMES.FUN in your browser. View gameplay details, controls and device support for this ${category.toLowerCase()} game.`;
  const combined=`${first}${suffix}`.trim();
  return combined.length>160?`${combined.slice(0,157).trimEnd()}...`:combined;
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const g=await getGame(slug);
  if(!g)return{};
  const description=gameDescription(g.title,g.category,g.seoDescription||g.description);
  const seoTitle=`${g.title} — Free ${g.category} Game Online`;
  return{
    title:seoTitle,
    description,
    keywords:[g.title,`free ${g.category.toLowerCase()} game`,`${g.category.toLowerCase()} games online`,'browser game','free online games'],
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
  const description=gameDescription(game.title,game.category,game.description);
  const breadcrumbLd={
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
      {'@type':'ListItem',position:2,name:`${game.category} Games`,item:`${siteUrl}/category/${categorySlug}`},
      {'@type':'ListItem',position:3,name:game.title,item:`${siteUrl}/game/${game.slug}`}
    ]
  };
  const gameLd={
    '@context':'https://schema.org',
    '@type':'VideoGame',
    '@id':`${siteUrl}/game/${game.slug}#game`,
    name:game.title,
    url:`${siteUrl}/game/${game.slug}`,
    description,
    genre:game.categories?.length?game.categories:[game.category],
    gamePlatform:'Web browser',
    inLanguage:game.language||'en',
    isAccessibleForFree:true,
    image:game.thumbnailUrl||undefined,
    datePublished:game.publishedAt||undefined,
    dateModified:game.updatedAt||undefined,
    mainEntityOfPage:`${siteUrl}/game/${game.slug}`
  };
  return <div className="pageShell narrow">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(gameLd)}}/>
    <div className="breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href={`/category/${categorySlug}`}>{game.category}</Link><span>›</span><span>{game.title}</span></div>
    <div className="gameTopbar"><div><p className="tinyLabel">FREE ONLINE {game.category.toUpperCase()} GAME</p><h1>{game.title}</h1><p>{game.category} • {game.provider==='demo'?'Demo catalog':game.provider}</p></div><ClientGameActions slug={game.slug}/></div>
    <PlayerShell game={game}/>
    <section className="contentCard"><h2>About {game.title}</h2><p>{game.description}</p><h3>How to play {game.title}</h3><p>{game.instructions||'Press Play and follow the instructions shown inside the game.'}</p><h3>{game.title} controls</h3><div className="controlChips"><span>{game.controls||'Controls vary by game.'}</span></div><div className="gameDetails"><span>Category <b>{game.category}</b></span><span>Provider <b>{game.provider}</b></span><span>Mobile <b>{game.mobileSupported?'Yes':'No'}</b></span><span>Desktop <b>{game.desktopSupported?'Yes':'No'}</b></span></div><Link className="reportLink" href={`/report-game?game=${encodeURIComponent(game.slug)}`}>Report a problem with this game</Link></section>
    <GameSection title={`More ${game.category} games like ${game.title}`} items={related}/>
  </div>;
}
