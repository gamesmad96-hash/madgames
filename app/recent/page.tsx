import type {Metadata} from 'next';
import {getGames} from '@/lib/catalog';
import {LocalGameList} from '@/components/LocalGameList';

export const metadata:Metadata={title:'Recently Played Games',robots:{index:false,follow:true}};

export default async function RecentPage(){
  const games=await getGames(500);
  return <div className="pageShell"><div className="pageTitle"><div className="eyebrow">KEEP PLAYING</div><h1>Recently played</h1><p>Your recent games on this device.</p></div><LocalGameList games={games} storageKey="madgames:recent" emptyText="Play a game and it will show up here."/></div>;
}
