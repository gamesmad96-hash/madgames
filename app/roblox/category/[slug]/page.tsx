import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {fetchRobloxSearch,getRobloxCollection,robloxGamePath,robloxSeoCollections} from '@/lib/roblox-seo';
import '../../roblox.css';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');
export const revalidate=21600;
export const dynamicParams=true;

export function generateStaticParams(){
  return robloxSeoCollections.map(item=>({slug:item.slug}));
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const collection=getRobloxCollection(slug);
  if(!collection)return{};
  const title=`${collection.title} — Browse & Play`;
  const description=`${collection.description} Browse live Roblox results on MADGAMES.FUN and open each experience on the official Roblox platform.`;
  return{
    title,
    description,
    keywords:[collection.title,`${collection.query} Roblox games`,`best ${collection.query.toLowerCase()} Roblox games`,'Roblox games'],
    alternates:{canonical:`/roblox/category/${collection.slug}`},
    openGraph:{title:`${title} | MADGAMES.FUN`,description,url:`/roblox/category/${collection.slug}`},
    twitter:{card:'summary_large_image',title,description}
  };
}

function compact(value:number){return new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(value||0)}
function rating(up:number,down:number){const total=up+down;return total?Math.round(up/total*100):null}

export default async function RobloxCollectionPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const collection=getRobloxCollection(slug);
  if(!collection)notFound();
  const games=await fetchRobloxSearch(collection.query);
  const related=robloxSeoCollections.filter(item=>item.slug!==collection.slug).slice(0,14);
  const canonical=`${siteUrl}/roblox/category/${collection.slug}`;
  const itemList={
    '@context':'https://schema.org','@type':'ItemList',name:collection.title,url:canonical,
    numberOfItems:games.length,
    itemListElement:games.slice(0,30).map((game,index)=>({'@type':'ListItem',position:index+1,name:game.name,url:`${siteUrl}${robloxGamePath(game)}`}))
  };
  const breadcrumbs={
    '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
      {'@type':'ListItem',position:2,name:'Roblox Games',item:`${siteUrl}/roblox`},
      {'@type':'ListItem',position:3,name:collection.title,item:canonical}
    ]
  };
  return <main className="robloxPage"><div className="robloxBrowser">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(itemList)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbs)}}/>
    <nav className="robloxBreadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/roblox">Roblox</Link><span>›</span><span>{collection.title}</span></nav>
    <section className="robloxCollectionHero">
      <div className="robloxEyebrow">ROBLOX GAME COLLECTION</div>
      <h1>{collection.title}</h1>
      <p>{collection.description} Results refresh automatically from Roblox, so this page can surface newer and currently active experiences over time.</p>
      <div className="robloxCollectionActions"><Link href="/roblox">Search all Roblox games</Link><a href={`https://www.roblox.com/discover/?Keyword=${encodeURIComponent(collection.query)}`} target="_blank" rel="noopener noreferrer">Open Roblox discovery ↗</a></div>
    </section>
    <section className="robloxResults">
      <div className="robloxResultsHead"><div><span className="robloxKicker">LIVE RESULTS</span><h2>{games.length?`${games.length} ${collection.query} games to explore`:'Roblox results'}</h2></div></div>
      {games.length?<div className="robloxGrid">{games.map(game=>{const score=rating(game.totalUpVotes,game.totalDownVotes);const path=robloxGamePath(game);return <article key={game.universeId} className="robloxCard">
        <Link href={path} className="robloxThumbLink" aria-label={`View ${game.name} details on MADGAMES`}>
          {game.thumbnailUrl?<img src={game.thumbnailUrl} alt={`${game.name} Roblox game`} className="robloxThumb" loading="lazy"/>:<div className="robloxThumb robloxThumbFallback">R</div>}
          <span className="robloxPlayBadge">View game</span>
        </Link>
        <div className="robloxCardBody"><h3><Link className="robloxTitleLink" href={path}>{game.name}</Link></h3><div className="robloxStats"><span>● {compact(game.playerCount)} playing</span>{score!==null?<span>👍 {score}%</span>:null}</div><a className="robloxLaunch" href={game.robloxUrl} target="_blank" rel="noopener noreferrer">Play on Roblox ↗</a></div>
      </article>})}</div>:<div className="robloxStatus">Roblox results are temporarily unavailable. This page will refresh automatically.</div>}
    </section>
    <section className="robloxSeoSection"><div className="robloxResultsHead"><div><span className="robloxKicker">KEEP EXPLORING</span><h2>More Roblox game categories</h2></div></div><div className="robloxTopicGrid">{related.map(item=><Link key={item.slug} href={`/roblox/category/${item.slug}`}><strong>{item.title}</strong><span>{item.description}</span></Link>)}</div></section>
    <p className="robloxDisclaimer">Roblox experiences are owned and operated by their respective creators on Roblox. MADGAMES provides discovery pages and links to the official Roblox platform; it does not host Roblox game files.</p>
  </div></main>;
}
