import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {fetchRobloxGame,fetchRobloxSearch,robloxGamePath,robloxSeoCollections,robloxSlug} from '@/lib/roblox-seo';
import '../../../roblox.css';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');
export const revalidate=21600;
export const dynamicParams=true;

function compact(value:number){return new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(value||0)}
function dateLabel(value:string|null){if(!value)return null;const d=new Date(value);return Number.isNaN(d.getTime())?null:new Intl.DateTimeFormat('en',{year:'numeric',month:'short',day:'numeric'}).format(d)}
function metaDescription(name:string,base:string){
  const clean=base.replace(/\s+/g,' ').trim();
  const lead=clean?`${clean} `:'';
  const text=`${lead}View ${name} Roblox game details, live player activity and the official Roblox play link on MADGAMES.FUN.`;
  return text.length>160?`${text.slice(0,157).trimEnd()}...`:text;
}
function relatedQuery(name:string,genre:string){
  const clean=name.replace(/\[[^\]]*\]|\([^)]*\)/g,' ').replace(/[^a-zA-Z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
  const words=clean.split(' ').filter(word=>word.length>2).slice(0,4);
  return words.join(' ')||genre||'Popular';
}

export async function generateMetadata({params}:{params:Promise<{universeId:string;slug:string}>}):Promise<Metadata>{
  const {universeId}=await params;
  const game=await fetchRobloxGame(universeId);
  if(!game)return{};
  const slug=robloxSlug(game.name);
  const description=metaDescription(game.name,game.description);
  const title=`${game.name} Roblox — Game Details & Play Link`;
  return{
    title,
    description,
    keywords:[`${game.name} Roblox`,`${game.name} game`,`play ${game.name}`,`${game.name} Roblox game`,'Roblox games'],
    alternates:{canonical:`/roblox/game/${game.universeId}/${slug}`},
    openGraph:{title:`${title} | MADGAMES.FUN`,description,url:`/roblox/game/${game.universeId}/${slug}`,images:game.thumbnailUrl?[{url:game.thumbnailUrl,alt:`${game.name} Roblox game thumbnail`}]:undefined},
    twitter:{card:'summary_large_image',title,description,images:game.thumbnailUrl?[game.thumbnailUrl]:undefined}
  };
}

export default async function RobloxGamePage({params}:{params:Promise<{universeId:string;slug:string}>}){
  const {universeId}=await params;
  const game=await fetchRobloxGame(universeId);
  if(!game)notFound();
  const canonicalPath=`/roblox/game/${game.universeId}/${robloxSlug(game.name)}`;
  const query=relatedQuery(game.name,game.genre);
  const related=(await fetchRobloxSearch(query)).filter(item=>item.universeId!==game.universeId).slice(0,10);
  const updated=dateLabel(game.updated),created=dateLabel(game.created);
  const matchingCollections=robloxSeoCollections.filter(item=>{
    const haystack=`${game.name} ${game.genre}`.toLowerCase();
    return haystack.includes(item.query.toLowerCase())||haystack.includes(item.slug.replaceAll('-',' '));
  }).slice(0,6);
  const collections=matchingCollections.length?matchingCollections:robloxSeoCollections.slice(0,6);
  const description=metaDescription(game.name,game.description);
  const breadcrumbLd={
    '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
      {'@type':'ListItem',position:2,name:'Roblox Games',item:`${siteUrl}/roblox`},
      {'@type':'ListItem',position:3,name:game.name,item:`${siteUrl}${canonicalPath}`}
    ]
  };
  const gameLd={
    '@context':'https://schema.org','@type':'VideoGame','@id':`${siteUrl}${canonicalPath}#game`,
    name:game.name,url:`${siteUrl}${canonicalPath}`,sameAs:game.robloxUrl,description,
    image:game.thumbnailUrl||undefined,genre:game.genre||undefined,gamePlatform:'Roblox',
    numberOfPlayers:game.maxPlayers?{'@type':'QuantitativeValue',maxValue:game.maxPlayers}:undefined,
    dateCreated:game.created||undefined,dateModified:game.updated||undefined,
    creator:game.creatorName?{'@type':game.creatorType==='Group'?'Organization':'Person',name:game.creatorName}:undefined,
    mainEntityOfPage:`${siteUrl}${canonicalPath}`
  };
  const faqs=[
    {q:`Where can I play ${game.name}?`,a:`Use the official Roblox play link on this page. The experience runs on Roblox; MADGAMES does not host or copy the Roblox game files.`},
    {q:`Is ${game.name} active right now?`,a:`The player count shown on this page comes from Roblox data and can change throughout the day.`},
    {q:`Who made ${game.name}?`,a:`Roblox lists ${game.creatorName} as the creator of this experience.`}
  ];
  const faqLd={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(item=>({'@type':'Question',name:item.q,acceptedAnswer:{'@type':'Answer',text:item.a}}))};
  return <main className="robloxPage"><div className="robloxBrowser">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(gameLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqLd)}}/>
    <nav className="robloxBreadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/roblox">Roblox</Link><span>›</span><span>{game.name}</span></nav>
    <section className="robloxGameHero">
      <div className="robloxGameMedia">{game.thumbnailUrl?<img src={game.thumbnailUrl} alt={`${game.name} Roblox game thumbnail`}/>:<div className="robloxGameFallback">R</div>}</div>
      <div className="robloxGameIntro"><div className="robloxEyebrow">ROBLOX GAME DETAILS</div><h1>{game.name}</h1><p className="robloxCreator">By {game.creatorName}</p><p className="robloxGameSummary">{game.description||`Explore ${game.name} on Roblox. Check current activity and use the official play link below.`}</p><div className="robloxGameCtas"><a className="robloxPrimaryCta" href={game.robloxUrl} target="_blank" rel="noopener noreferrer">▶ Play on Roblox ↗</a><Link className="robloxSecondaryCta" href="/roblox">Search Roblox games</Link></div></div>
    </section>
    <section className="robloxStatsPanel" aria-label={`${game.name} Roblox statistics`}><div><span>Playing now</span><strong>{compact(game.playing)}</strong></div><div><span>Total visits</span><strong>{compact(game.visits)}</strong></div><div><span>Favorites</span><strong>{compact(game.favoritedCount)}</strong></div><div><span>Max server</span><strong>{game.maxPlayers||'—'}</strong></div></section>
    <section className="robloxSeoSection robloxArticle"><div className="robloxKicker">ABOUT THIS EXPERIENCE</div><h2>About {game.name}</h2><p>{game.description||`${game.name} is a Roblox experience created by ${game.creatorName}. Use the official Roblox link above to view and play the latest version.`}</p><div className="robloxFacts"><span><b>Creator</b>{game.creatorName}</span><span><b>Genre</b>{game.genre||'All'}</span>{created?<span><b>Created</b>{created}</span>:null}{updated?<span><b>Last updated</b>{updated}</span>:null}</div><p>Player activity, visits and other stats can change as Roblox updates its data. MADGAMES refreshes these details periodically rather than storing a permanent snapshot.</p></section>
    <section className="robloxSeoSection"><div className="robloxResultsHead"><div><span className="robloxKicker">RELATED DISCOVERY</span><h2>More Roblox games like {game.name}</h2></div></div>{related.length?<div className="robloxGrid">{related.map(item=><article key={item.universeId} className="robloxCard"><Link href={robloxGamePath(item)} className="robloxThumbLink">{item.thumbnailUrl?<img src={item.thumbnailUrl} alt={`${item.name} Roblox game`} className="robloxThumb" loading="lazy"/>:<div className="robloxThumb robloxThumbFallback">R</div>}<span className="robloxPlayBadge">View game</span></Link><div className="robloxCardBody"><h3><Link className="robloxTitleLink" href={robloxGamePath(item)}>{item.name}</Link></h3><div className="robloxStats"><span>● {compact(item.playerCount)} playing</span></div><a className="robloxLaunch" href={item.robloxUrl} target="_blank" rel="noopener noreferrer">Play on Roblox ↗</a></div></article>)}</div>:<p>Browse the Roblox collections below to find another experience.</p>}</section>
    <section className="robloxSeoSection"><div className="robloxResultsHead"><div><span className="robloxKicker">BROWSE BY INTEREST</span><h2>Roblox game collections</h2></div></div><div className="robloxTopicGrid">{collections.map(item=><Link key={item.slug} href={`/roblox/category/${item.slug}`}><strong>{item.title}</strong><span>{item.description}</span></Link>)}</div></section>
    <section className="robloxSeoSection robloxArticle"><h2>{game.name} FAQ</h2>{faqs.map(item=><div key={item.q} className="robloxFaq"><h3>{item.q}</h3><p>{item.a}</p></div>)}</section>
    <p className="robloxDisclaimer">Roblox and the individual experiences listed here are owned and operated by Roblox and their respective creators. MADGAMES is an independent discovery site and is not Roblox.</p>
  </div></main>;
}
