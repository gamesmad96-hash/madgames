import Link from 'next/link';
import type { Game } from '@/lib/types';

export function GameCard({ game, featured = false, compact = false }: { game: Game; featured?: boolean; compact?: boolean }) {
  return (
    <Link href={`/game/${game.slug}`} className={`gameCard ${featured ? 'featuredCard' : ''} ${compact ? 'compactCard' : ''}`}>
      <div className={`gameArt ${game.thumbnailUrl ? 'hasThumb' : (game.gradient || 'g1')}`} style={game.thumbnailUrl ? {backgroundImage:`linear-gradient(to top,rgba(0,0,0,.6),rgba(0,0,0,.03) 60%),url("${game.thumbnailUrl.replaceAll('"','')}")`} : undefined}>
        {!game.thumbnailUrl && <div className="artGlow" />}
        {game.badge && <span className="badge">{game.badge}</span>}
        {!game.thumbnailUrl && <span className="emojiArt">{game.emoji || '🎮'}</span>}
        <div className="cardTitle"><strong>{game.title}</strong><span>{game.category}</span></div>
        <span className="playBubble">▶</span>
      </div>
    </Link>
  );
}
