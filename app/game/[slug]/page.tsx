import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {getGame,getGames} from '@/lib/catalog';
import {getGuidesForCategory} from '@/lib/guides';
import {getTopicsForCategory} from '@/lib/seo-topics';
import {PlayerShell} from '@/components/PlayerShell';
import {ClientGameActions} from '@/components/ClientGameActions';
import {GameSection} from '@/components/GameSection';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

function gameDescription(title:string,base?:string|null){
  const text=(base||'').trim();
  if(text.length<=160)return text||`${title} browser game.`;
  const cut=text.slice(0,157);
  return `${cut.slice(0,Math.max(cut.lastIndexOf(' '),100)).trimEnd()}...`;
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const g=await getGame(slug);
  if(!g)return{};
  const description=gameDescription(g.title,g.seoDescription||g.description);
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
  const [game,all]=await Promise.all([getGame(slug),getGames(160)]);
  if(!game)notFound();
  const related=all.filter(g=>g.slug!==game.slug&&(g.category===game.category||g.tags?.some(t=>game.tags?.includes(t)))).slice(0,10);
  const categorySlug=game.category.toLowerCase().replaceAll(' ','-');
  const relatedGuides=getGuidesForCategory(categorySlug,2);
  const relatedTopics=getTopicsForCategory(game.category,5);
  const description=gameDescription(game.title,game.seoDescription||game.description);
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
    mainEntityOfPage:`${siteUrl}/game/${game.slug}`,
    isPartOf:{'@id':`${siteUrl}/#website`},
    publisher:{'@id':`${siteUrl}/#organization`}
  };
  return <div className="pageShell narrow">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(gameLd)}}/>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href={`/category/${categorySlug}`}>{game.category}</Link><span>›</span><span>{game.title}</span></nav>
    <div className="gameTopbar"><div><p className="tinyLabel">FREE ONLINE {game.category.toUpperCase()} GAME</p><h1>{game.title}</h1><p>{game.category} • {game.provider==='demo'?'Demo catalog':game.provider}</p></div><ClientGameActions slug={game.slug}/></div>
    <PlayerShell game={game}/>
    <section className="contentCard"><h2>About {game.title}</h2><p>{game.description}</p><h3>How to play {game.title}</h3><p>{game.instructions||'Press Play and follow the instructions shown inside the game.'}</p>{game.controls?<><h3>{game.title} controls</h3><div className="controlChips"><span>{game.controls}</span></div></>:null}<div className="gameDetails"><span>Category <b><Link href={`/category/${categorySlug}`}>{game.category}</Link></b></span><span>Provider <b>{game.provider}</b></span><span>Mobile <b>{game.mobileSupported?'Yes':'No'}</b></span><span>Desktop <b>{game.desktopSupported?'Yes':'No'}</b></span></div><p>Browse more <Link href={`/category/${categorySlug}`}>{game.category.toLowerCase()} games</Link> or use <Link href="/search">Search</Link> to find another title.</p><Link className="reportLink" href={`/report-game?game=${encodeURIComponent(game.slug)}`}>Report a problem with this game</Link></section>
    {relatedTopics.length?<section className="gameSection" aria-labelledby={`${game.slug}-collections`}><div className="sectionHead"><h2 id={`${game.slug}-collections`}>Find more games like {game.title}</h2></div><nav className="adminNav" aria-label={`Game collections related to ${game.title}`}>{relatedTopics.map(topic=><Link key={topic.slug} href={`/play/${topic.slug}`}>{topic.h1}</Link>)}</nav></section>:null}
    {relatedGuides.length?<section className="contentCard" aria-labelledby={`${game.slug}-guides`}><h2 id={`${game.slug}-guides`}>Helpful browser gaming guides</h2><p>These guides explain the broader play style, device or browser-game format connected to this category.</p>{relatedGuides.map(guide=><p key={guide.slug}><Link href={`/guides/${guide.slug}`}>{guide.title}</Link> — {guide.summary}</p>)}<p><Link href="/guides">Browse all gaming guides →</Link></p></section>:null}
    <GameSection title={`More ${game.category} games like ${game.title}`} items={related}/>
  </div>;
}
