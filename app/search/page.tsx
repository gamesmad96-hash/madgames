import type {Metadata} from 'next';
import {getGames} from '@/lib/catalog';
import {SearchClient} from '@/components/SearchClient';

export const metadata:Metadata={
  title:'Search Games',
  description:'Search the MADGAMES.FUN catalog for free browser games by title, category or tag.',
  alternates:{canonical:'/search'},
  robots:{index:false,follow:true}
};

export default async function SearchPage(){const games=await getGames(500);return <div className="pageShell"><div className="pageTitle"><div className="eyebrow">FIND YOUR NEXT GAME</div><h1>Search games</h1></div><SearchClient games={games}/></div>}
