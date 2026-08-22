import type {Metadata} from 'next';
import Link from 'next/link';
import {getCategories,getGames} from '@/lib/catalog';
import {sortNewest} from '@/lib/discovery';
import {GameCard} from '@/components/GameCard';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

export const metadata:Metadata={
  title:'All Free Online Games — Browse Browser Games',
  description:'Browse all free online browser games on MADGAMES.FUN. Explore the latest games and jump into action, racing, puzzle, sports, casual and more.',
  alternates:{canonical:'/games'},
  openGraph:{title:'All Free Online Games — Browse Browser Games | MADGAMES.FUN',description:'Browse the MADGAMES.FUN browser game catalog by latest releases and category.',url:'/games'},
  twitter:{card:'summary_large_image',title:'All Free Online Games — Browse Browser Games',description:'Browse the MADGAMES.FUN browser game catalog by latest releases and category.'}
};

export default async function GamesPage(){
  const [games,categories]=await Promise.all([getGames(3000),getCategories()]);
  const newest=sortNewest(games);
  const preview=newest.slice(0,48);
  const breadcrumbLd={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
    {'@type':'ListItem',position:2,name:'All Games',item:`${siteUrl}/games`}
  ]};
  const collectionLd={'@context':'https://schema.org','@type':'CollectionPage','@id':`${siteUrl}/games#collection`,url:`${siteUrl}/games`,name:'All Free Online Browser Games',description:'Browse the MADGAMES.FUN browser game catalog.',numberOfItems:games.length,isPartOf:{'@id':`${siteUrl}/#website`},mainEntity:{'@type':'ItemList',numberOfItems:Math.min(games.length,100),itemListElement:newest.slice(0,100).map((game,index)=>({'@type':'ListItem',position:index+1,url:`${siteUrl}/game/${game.slug}`,name:game.title}))}};
  return <div className="pageShell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(collectionLd)}}/>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span>All Games</span></nav>
    <div className="pageTitle"><div className="eyebrow">COMPLETE GAME CATALOG</div><h1>All Free Online Games</h1><p>Browse {games.length} browser games currently published on MADGAMES.FUN. Start with the newest titles below or jump directly to a category or game from the full directory.</p></div>

    <section className="gameSection" aria-labelledby="latest-games-preview"><div className="sectionHead"><h2 id="latest-games-preview">Latest games</h2><Link href="/new-games">See all new games →</Link></div><div className="gameGrid">{preview.map((game,index)=><GameCard key={game.id} game={game} priority={index===0}/>)}</div></section>

    <section className="contentCard" aria-labelledby="browse-game-categories"><h2 id="browse-game-categories">Browse games by category</h2><p>Category pages group similar games together and include gameplay and device guidance.</p><nav className="adminNav" aria-label="All game categories">{categories.map(category=><Link key={category.slug} href={`/category/${category.slug}`}>{category.name} games</Link>)}</nav></section>

    <section className="contentCard" aria-labelledby="full-game-directory"><h2 id="full-game-directory">Full game directory</h2><p>This crawlable directory links directly to every published game currently returned by the catalog.</p>{categories.map(category=>{
      const categoryGames=newest.filter(game=>game.category.toLowerCase()===category.name.toLowerCase()||(game.categories||[]).some(name=>name.toLowerCase()===category.name.toLowerCase()));
      if(!categoryGames.length)return null;
      return <div key={category.slug}><h3><Link href={`/category/${category.slug}`}>{category.name} games</Link></h3><nav className="adminNav" aria-label={`${category.name} game directory`}>{categoryGames.map(game=><Link key={game.id} href={`/game/${game.slug}`}>{game.title}</Link>)}</nav></div>;
    })}</section>

    <section className="contentCard"><h2>More ways to discover games</h2><p><Link href="/hot-games">Browse hot games</Link>, <Link href="/new-games">see new games</Link>, or use <Link href="/search">Search</Link> when you already know the title or game type you want.</p></section>
  </div>;
}
