import type {Metadata} from 'next';
import Link from 'next/link';
import {getCategories,getGames} from '@/lib/catalog';
import {GameCard} from '@/components/GameCard';
import {GameSection} from '@/components/GameSection';

const description='Play free online games instantly on MADGAMES.FUN. Discover action, racing, puzzle, sports and casual browser games with no downloads required.';

export const metadata:Metadata={
  title:{absolute:'MADGAMES.FUN — Play Free Online Games'},
  description,
  alternates:{canonical:'/'},
  openGraph:{
    title:'MADGAMES.FUN — Play Free Online Games',
    description,
    url:'/'
  },
  twitter:{
    card:'summary_large_image',
    title:'MADGAMES.FUN — Play Free Online Games',
    description
  }
};

export default async function Home(){
  const [games,categories]=await Promise.all([getGames(160),getCategories()]);
  const top=games.slice(0,24);
  const by=(c:string)=>games.filter(g=>g.category===c).slice(0,10);
  return <div className="homePage">
    <div className="homeIntro"><div><p className="tinyLabel">MADGAMES.FUN</p><h1>Play something mad.</h1></div><Link href="/search" className="browseLink">Browse all games <span>→</span></Link></div>
    <section className="discoveryGrid" aria-label="Featured games">{top.map((game,i)=><GameCard key={game.id} game={game} priority={i===0} featured={[0,4,9,14].includes(i)} compact={[2,3,6,7,10,11,17,18].includes(i)}/>)}</section>
    <GameSection title="Trending now" items={games.filter(g=>g.trending).slice(0,10)}/>
    <GameSection title="Racing games" items={by('Racing')} href="/category/racing"/>
    <GameSection title="Action games" items={by('Action')} href="/category/action"/>
    <GameSection title="Puzzle games" items={by('Puzzle')} href="/category/puzzle"/>
    <GameSection title="Sports games" items={by('Sports')} href="/category/sports"/>
    <section className="gameSection" aria-labelledby="browse-categories"><div className="sectionHead"><h2 id="browse-categories">Browse by category</h2></div><nav className="adminNav" aria-label="Game categories">{categories.slice(0,18).map(c=><Link key={c.id} href={`/category/${c.slug}`}>{c.name} games</Link>)}</nav></section>
  </div>;
}
