import type { Metadata } from 'next';
import Link from 'next/link';
import { RobloxBrowser } from '../../components/RobloxBrowser';
import {fetchRobloxSearch,robloxGamePath,robloxSeoCollections} from '@/lib/roblox-seo';
import './roblox.css';

export const revalidate=21600;

export const metadata: Metadata = {
  title: 'Roblox Games — Search, Browse Categories & Play | MADGAMES.FUN',
  description: 'Browse live Roblox games, popular categories and individual experience pages on MADGAMES.FUN, then launch games on the official Roblox platform.',
  keywords:['Roblox games','best Roblox games','play Roblox games','Roblox obby','Roblox simulator','Roblox tycoon','Roblox horror games'],
  alternates: { canonical: '/roblox' },
};

export default async function RobloxPage() {
  const popular=await fetchRobloxSearch('Popular');
  return <main className="robloxPage">
    <div className="robloxBrowser">
      <RobloxBrowser />
      <section className="robloxSeoSection" aria-labelledby="roblox-directory-title">
        <div className="robloxResultsHead"><div><span className="robloxKicker">CRAWLABLE DIRECTORY</span><h2 id="roblox-directory-title">Browse Roblox games on MADGAMES</h2></div></div>
        <p className="robloxSeoIntro">Open an individual game page for details, current activity and its official Roblox launch link. These server-rendered links also help search engines discover the Roblox directory beyond the live search interface.</p>
        {popular.length?<div className="robloxTextGameGrid">{popular.slice(0,30).map(game=><Link key={game.universeId} href={robloxGamePath(game)}><span>{game.name}</span><small>{game.playerCount.toLocaleString('en')} playing</small></Link>)}</div>:null}
      </section>
      <section className="robloxSeoSection" aria-labelledby="roblox-categories-title">
        <div className="robloxResultsHead"><div><span className="robloxKicker">EXPLORE BY INTEREST</span><h2 id="roblox-categories-title">Roblox game categories</h2></div><span className="robloxCount">{robloxSeoCollections.length} discovery hubs</span></div>
        <div className="robloxTopicGrid">{robloxSeoCollections.map(item=><Link key={item.slug} href={`/roblox/category/${item.slug}`}><strong>{item.title}</strong><span>{item.description}</span></Link>)}</div>
      </section>
    </div>
  </main>;
}
