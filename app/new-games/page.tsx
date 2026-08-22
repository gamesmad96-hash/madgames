import type {Metadata} from 'next';
import Link from 'next/link';
import {getGames} from '@/lib/catalog';
import {sortNewest} from '@/lib/discovery';
import {GameCard} from '@/components/GameCard';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

export const metadata:Metadata={
  title:'New Online Games — Latest Free Browser Games',
  description:'Play new online games on MADGAMES.FUN. Discover the latest free browser games added across racing, action, puzzle, sports, casual and more.',
  alternates:{canonical:'/new-games'},
  openGraph:{title:'New Online Games — Latest Free Browser Games | MADGAMES.FUN',description:'Discover recently published browser games on MADGAMES.FUN.',url:'/new-games'},
  twitter:{card:'summary_large_image',title:'New Online Games — Latest Free Browser Games',description:'Discover recently published browser games on MADGAMES.FUN.'}
};

export default async function NewGamesPage(){
  const games=sortNewest(await getGames(500));
  const visible=games.slice(0,120);
  const breadcrumbLd={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
    {'@type':'ListItem',position:2,name:'New Games',item:`${siteUrl}/new-games`}
  ]};
  const itemLd={'@context':'https://schema.org','@type':'ItemList',name:'New Online Games',numberOfItems:visible.length,itemListElement:visible.slice(0,100).map((game,index)=>({'@type':'ListItem',position:index+1,url:`${siteUrl}/game/${game.slug}`,name:game.title}))};
  return <div className="pageShell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(itemLd)}}/>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span>New Games</span></nav>
    <div className="pageTitle"><div className="eyebrow">RECENTLY ADDED</div><h1>New Online Games</h1><p>Discover recently published browser games on MADGAMES.FUN. This page is ordered using the catalog&apos;s publication and update dates so fresh titles are easier for players and crawlers to find.</p></div>
    <div className="gameGrid">{visible.map((game,index)=><GameCard key={game.id} game={game} priority={index===0}/>)}</div>
    <section className="contentCard"><h2>How the new games list works</h2><p>Games are ordered by their available publication, update or creation date. The catalog changes as licensed provider games are added, updated or removed, so this page gives recently added titles a permanent discovery route instead of leaving them buried behind search.</p><p>Looking for something specific? Browse <Link href="/games">all games</Link>, check <Link href="/hot-games">hot games</Link>, or choose a category from the main navigation.</p></section>
  </div>;
}
