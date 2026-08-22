import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {fetchRobloxSearch,getRobloxCollection,robloxGamePath} from '@/lib/roblox-seo';
import {getRobloxTrafficGuide,robloxTrafficGuides} from '@/lib/roblox-guides';
import '../../roblox.css';
import '../guides.css';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');
export const revalidate=21600;
export const dynamicParams=true;

export function generateStaticParams(){
  return robloxTrafficGuides.map(guide=>({slug:guide.slug}));
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const guide=getRobloxTrafficGuide(slug);
  if(!guide)return{};
  return {
    title:guide.title,
    description:guide.description,
    keywords:[guide.title,guide.query+' Roblox games','best Roblox games','Roblox games to play'],
    alternates:{canonical:`/roblox/guides/${guide.slug}`},
    openGraph:{title:guide.title,description:guide.description,url:`/roblox/guides/${guide.slug}`},
    twitter:{card:'summary',title:guide.title,description:guide.description}
  };
}

function compact(value:number){
  return new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(value||0);
}

function rating(up:number,down:number){
  const total=up+down;
  return total?Math.round(up/total*100):null;
}

export default async function RobloxTrafficGuidePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const guide=getRobloxTrafficGuide(slug);
  if(!guide)notFound();
  const games=await fetchRobloxSearch(guide.query);
  const relatedCollections=guide.relatedCollections.map(getRobloxCollection).filter((item):item is NonNullable<typeof item>=>Boolean(item));
  const relatedGuides=robloxTrafficGuides.filter(item=>item.slug!==guide.slug && item.relatedCollections.some(slug=>guide.relatedCollections.includes(slug))).slice(0,6);
  const canonical=`${siteUrl}/roblox/guides/${guide.slug}`;
  const monthYear=new Intl.DateTimeFormat('en',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date());
  const faq=[
    {q:`How does MADGAMES choose games for ${guide.title}?`,a:`This page uses the Roblox search theme “${guide.query}” as a live discovery starting point, then shows current activity and links to individual game detail pages. It is not a permanent editorial ranking.`},
    {q:`Are the player counts on this ${guide.title} guide live?`,a:'Player activity comes from Roblox data and can change throughout the day. MADGAMES refreshes Roblox discovery data periodically.'},
    {q:'Can I play these Roblox games directly on MADGAMES?',a:'No. Roblox experiences run on the official Roblox platform. MADGAMES provides discovery pages, game information and official Roblox launch links.'}
  ];
  const breadcrumbLd={
    '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
      {'@type':'ListItem',position:2,name:'Roblox',item:`${siteUrl}/roblox`},
      {'@type':'ListItem',position:3,name:'Roblox Guides',item:`${siteUrl}/roblox/guides`},
      {'@type':'ListItem',position:4,name:guide.title,item:canonical}
    ]
  };
  const itemListLd={
    '@context':'https://schema.org','@type':'ItemList',name:guide.title,url:canonical,numberOfItems:games.length,
    itemListElement:games.slice(0,30).map((game,index)=>({'@type':'ListItem',position:index+1,name:game.name,url:`${siteUrl}${robloxGamePath(game)}`}))
  };
  const faqLd={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(item=>({'@type':'Question',name:item.q,acceptedAnswer:{'@type':'Answer',text:item.a}}))};

  return <main className="robloxPage"><div className="robloxBrowser">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(itemListLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqLd)}}/>

    <nav className="robloxBreadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/roblox">Roblox</Link><span>›</span><Link href="/roblox/guides">Guides</Link><span>›</span><span>{guide.title}</span></nav>

    <section className="robloxCollectionHero robloxGuideHero">
      <div className="robloxEyebrow">UPDATED {monthYear.toUpperCase()}</div>
      <h1>{guide.title}</h1>
      <p>{guide.description}</p>
      <p className="robloxGuideNote">This guide is designed for players looking for {guide.intent}. The game list is refreshed from Roblox discovery data, so it can change as activity and search results change.</p>
      <div className="robloxCollectionActions"><Link href="/roblox">Search all Roblox games</Link><Link href="/roblox/guides">All Roblox guides</Link></div>
    </section>

    <section className="robloxSeoSection robloxGuideCriteria">
      <div className="robloxResultsHead"><div><span className="robloxKicker">HOW TO CHOOSE</span><h2>What to look for before you play</h2></div></div>
      <ol>{guide.criteria.map(item=><li key={item}>{item}</li>)}</ol>
    </section>

    <section className="robloxResults" aria-labelledby="live-guide-results">
      <div className="robloxResultsHead"><div><span className="robloxKicker">LIVE ROBLOX DISCOVERY</span><h2 id="live-guide-results">{games.length?`${games.length} games to explore now`:'Roblox results'}</h2></div><span className="robloxCount">Query: {guide.query}</span></div>
      <p className="robloxSeoIntro">These are live discovery results, not a fixed 1–40 ranking. Open a MADGAMES detail page to compare current activity, creator information and the official Roblox play link.</p>
      {games.length?<div className="robloxGrid">{games.map(game=>{const score=rating(game.totalUpVotes,game.totalDownVotes);const path=robloxGamePath(game);return <article key={game.universeId} className="robloxCard">
        <Link href={path} className="robloxThumbLink" aria-label={`View ${game.name} details`}>
          {game.thumbnailUrl?<img src={game.thumbnailUrl} alt={`${game.name} Roblox game`} className="robloxThumb" loading="lazy"/>:<div className="robloxThumb robloxThumbFallback">R</div>}
          <span className="robloxPlayBadge">View game</span>
        </Link>
        <div className="robloxCardBody"><h3><Link className="robloxTitleLink" href={path}>{game.name}</Link></h3><div className="robloxStats"><span>● {compact(game.playerCount)} playing</span>{score!==null?<span>👍 {score}%</span>:null}</div><a className="robloxLaunch" href={game.robloxUrl} target="_blank" rel="noopener noreferrer">Play on Roblox ↗</a></div>
      </article>})}</div>:<div className="robloxStatus">Roblox results are temporarily unavailable. This page will refresh automatically.</div>}
    </section>

    <section className="robloxSeoSection">
      <div className="robloxResultsHead"><div><span className="robloxKicker">NARROW THE SEARCH</span><h2>Related Roblox collections</h2></div></div>
      <div className="robloxTopicGrid">{relatedCollections.map(item=><Link key={item.slug} href={`/roblox/category/${item.slug}`}><strong>{item.title}</strong><span>{item.description}</span></Link>)}</div>
    </section>

    {relatedGuides.length?<section className="robloxSeoSection">
      <div className="robloxResultsHead"><div><span className="robloxKicker">MORE GUIDES</span><h2>Keep exploring Roblox</h2></div></div>
      <div className="robloxGuideGrid robloxGuideGridCompact">{relatedGuides.map(item=><article key={item.slug} className="robloxGuideCard"><h3><Link href={`/roblox/guides/${item.slug}`}>{item.title}</Link></h3><p>{item.description}</p><Link className="robloxGuideLink" href={`/roblox/guides/${item.slug}`}>Read guide →</Link></article>)}</div>
    </section>:null}

    <section className="robloxSeoSection robloxArticle">
      <div className="robloxKicker">QUICK ANSWERS</div><h2>{guide.title} FAQ</h2>
      {faq.map(item=><div className="robloxFaq" key={item.q}><h3>{item.q}</h3><p>{item.a}</p></div>)}
    </section>

    <p className="robloxDisclaimer">Roblox and the individual experiences listed here are owned and operated by Roblox and their respective creators. MADGAMES is an independent discovery site and does not host Roblox game files.</p>
  </div></main>;
}
