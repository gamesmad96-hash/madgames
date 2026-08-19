import type {Metadata} from 'next';
import {getGames} from '@/lib/catalog';
import {SearchClient} from '@/components/SearchClient';

export const metadata:Metadata={
  title:'Search Free Online Games',
  description:'Search the MADGAMES.FUN catalog for free browser games by title, category or keyword.',
  alternates:{canonical:'/search'},
  robots:{index:false,follow:true}
};

export default async function SearchPage(){
  const games=await getGames(500);
  return <div className="pageShell"><div className="pageTitle"><div className="eyebrow">FIND YOUR NEXT GAME</div><h1>Search games</h1><p>Find free browser games by title, category or keyword.</p></div><SearchClient games={games}/></div>;
}
