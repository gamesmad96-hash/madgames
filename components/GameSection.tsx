import Link from 'next/link';
import type { Game } from '@/lib/types';
import { GameCard } from './GameCard';
export function GameSection({ title, items, href }: { title: string; items: Game[]; href?: string }) {
  if(!items.length) return null;
  return <section className="gameSection"><div className="sectionHead"><h2>{title}</h2>{href && <Link href={href}>View all →</Link>}</div><div className="gameGrid">{items.map(game=><GameCard key={game.id} game={game}/>)}</div></section>;
}
