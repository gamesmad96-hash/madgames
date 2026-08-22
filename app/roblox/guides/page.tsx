import type {Metadata} from 'next';
import Link from 'next/link';
import {robloxTrafficGuides} from '@/lib/roblox-guides';
import '../roblox.css';
import './guides.css';

export const metadata:Metadata={
  title:'Roblox Game Guides & Best Games Lists',
  description:'Browse MADGAMES Roblox guides for popular games, 2 player games, horror, obby, anime, tycoon, simulator, racing and more.',
  alternates:{canonical:'/roblox/guides'},
  openGraph:{title:'Roblox Game Guides & Best Games Lists',description:'Find Roblox game recommendations by play style, group size and genre.',url:'/roblox/guides'},
  twitter:{card:'summary',title:'Roblox Game Guides & Best Games Lists',description:'Find Roblox game recommendations by play style, group size and genre.'}
};

export default function RobloxGuidesPage(){
  const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');
  const itemList={
    '@context':'https://schema.org','@type':'ItemList',name:'Roblox Game Guides',url:`${siteUrl}/roblox/guides`,
    numberOfItems:robloxTrafficGuides.length,
    itemListElement:robloxTrafficGuides.map((guide,index)=>({'@type':'ListItem',position:index+1,name:guide.title,url:`${siteUrl}/roblox/guides/${guide.slug}`}))
  };
  return <main className="robloxPage"><div className="robloxBrowser">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(itemList)}}/>
    <nav className="robloxBreadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/roblox">Roblox</Link><span>›</span><span>Guides</span></nav>
    <section className="robloxCollectionHero robloxGuideHero">
      <div className="robloxEyebrow">ROBLOX TRAFFIC HUB</div>
      <h1>Roblox game guides and best-games lists</h1>
      <p>Use these intent-focused guides to find Roblox experiences by genre, group size and play style. Each guide connects live Roblox discovery results to crawlable MADGAMES game detail pages.</p>
      <div className="robloxCollectionActions"><Link href="/roblox">Search Roblox games</Link><Link href="/roblox/category/popular">Browse popular Roblox games</Link></div>
    </section>
    <section className="robloxSeoSection">
      <div className="robloxResultsHead"><div><span className="robloxKicker">20 SEARCH-INTENT GUIDES</span><h2>Choose what you want to play</h2></div></div>
      <div className="robloxGuideGrid">{robloxTrafficGuides.map(guide=><article key={guide.slug} className="robloxGuideCard"><h2><Link href={`/roblox/guides/${guide.slug}`}>{guide.title}</Link></h2><p>{guide.description}</p><Link className="robloxGuideLink" href={`/roblox/guides/${guide.slug}`}>Open guide →</Link></article>)}</div>
    </section>
    <p className="robloxDisclaimer">MADGAMES is an independent discovery site. Roblox experiences are owned and operated by Roblox and their respective creators.</p>
  </div></main>;
}
