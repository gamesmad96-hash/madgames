import Link from 'next/link';
import type { Game } from '@/lib/types';

export function GameCard({ game, featured = false, compact = false, priority = false }: { game: Game; featured?: boolean; compact?: boolean; priority?: boolean }) {
  const thumb=game.thumbnailUrl?.replaceAll('"','');
  return (
    <Link
      href={`/game/${game.slug}`}
      prefetch={false}
      aria-label={`Play ${game.title}`}
      className={`gameCard ${featured ? 'featuredCard' : ''} ${compact ? 'compactCard' : ''}`}
    >
      <div className={`gameArt ${thumb ? 'hasThumb' : (game.gradient || 'g1')}`}>
        {thumb && <>
          <img
            src={thumb}
            alt=""
            width={480}
            height={360}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}
          />
          <span aria-hidden="true" style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,.62),rgba(0,0,0,.03) 60%)',pointerEvents:'none'}}/>
        </>}
        {!thumb && <div className="artGlow" />}
        {game.badge && <span className="badge">{game.badge}</span>}
        {!thumb && <span className="emojiArt">{game.emoji || '🎮'}</span>}
        <div className="cardTitle"><strong>{game.title}</strong><span>{game.category}</span></div>
        <span className="playBubble">▶</span>
      </div>
    </Link>
  );
}
