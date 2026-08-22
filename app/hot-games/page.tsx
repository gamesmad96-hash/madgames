import type {Metadata} from 'next';
import Link from 'next/link';
import {getGames} from '@/lib/catalog';
import {sortHot} from '@/lib/discovery';
import {GameCard} from '@/components/GameCard';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

export const metadata:Metadata={
  title:'Hot Online Games — Trending Free Browser Games',
  description:'Play hot online games on MADGAMES.FUN. Browse trending, featured and recently updated free browser games across popular categories.',
  alternates:{canonical:'/hot-games'},
  openGraph:{title:'Hot Online Games — Trending Free Browser Games | MADGAMES.FUN',description:'Browse trending and featured browser games on MADGAMES.FUN.',url:'/hot-games'},
  twitter:{card:'summary_large_image',title:'Hot Online Games — Trending Free Browser Games',description:'Browse trending and featured browser games on MADGAMES.FUN.'}
};

export default async function HotGamesPage(){
  const games=sortHot(await getGames(500));
  const visible=games.slice(0,120);
  const breadcrumbLd={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
    {'@type':'ListItem',position:2,name:'Hot Games',item:`${siteUrl}/hot-games`}
  ]};
  const itemLd={'@context':'https://schema.org','@type':'ItemList',name:'Hot Online Games',numberOfItems:visible.length,itemListElement:visible.slice(0,100).map((game,index)=>({'@type':'ListItem',position:index+1,url:`${siteUrl}/game/${game.slug}`,name:game.title}))};
  return <div className="pageShell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(itemLd)}}/>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span>Hot Games</span></nav>
    <div className="pageTitle"><div className="eyebrow">TRENDING &amp; FEATURED</div><h1>Hot Online Games</h1><p>Browse games the catalog currently marks as trending or featured, followed by fresh titles. This gives popular games a stable landing page that can be linked from navigation and discovered directly by search engines.</p></div>
    <div className="gameGrid">{visible.map((game,index)=><GameCard key={game.id} game={game} priority={index===0}/>)}</div>
    <section className="contentCard"><h2>What appears in Hot Games?</h2><p>Trending games are prioritized first, then featured games, followed by newer catalog entries. Availability and ranking can change as the game catalog is updated.</p><p>You can also browse <Link href="/new-games">new games</Link>, open the <Link href="/games">full game directory</Link>, or use the category pages for a specific style of play.</p></section>
  </div>;
}
