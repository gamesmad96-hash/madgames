import Image from 'next/image';
import Link from 'next/link';
import type { Game } from '@/lib/types';

const optimizedThumbnailHosts=new Set(['img.gamemonetize.com','img.gamedistribution.com']);

function canOptimizeThumbnail(src:string){
  try{return optimizedThumbnailHosts.has(new URL(src).hostname.toLowerCase());}
  catch{return false;}
}

export function GameCard({ game, featured = false, compact = false, priority = false }: { game: Game; featured?: boolean; compact?: boolean; priority?: boolean }) {
  const thumb=game.thumbnailUrl?.replaceAll('"','');
  const optimized=Boolean(thumb&&canOptimizeThumbnail(thumb));
  const alt=`${game.title} ${game.category} game thumbnail`;
  return (
    <Link
      href={`/game/${game.slug}`}
      prefetch={false}
      aria-label={`Play ${game.title}`}
      className={`gameCard ${featured ? 'featuredCard' : ''} ${compact ? 'compactCard' : ''}`}
    >
      <div className={`gameArt ${thumb ? 'hasThumb' : (game.gradient || 'g1')}`}>
        {thumb && <>
          {optimized ? <Image
            src={thumb}
            alt={alt}
            fill
            sizes="(max-width: 800px) 50vw, (max-width: 1100px) 25vw, 20vw"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'low'}
            className="gameThumb"
          /> : <img
            src={thumb}
            alt={alt}
            width={480}
            height={360}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'low'}
            decoding="async"
            className="gameThumb"
          />}
          <span aria-hidden="true" className="gameThumbOverlay"/>
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
