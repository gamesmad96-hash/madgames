'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

type RobloxGame = {
  universeId: string;
  rootPlaceId: string;
  name: string;
  playerCount: number;
  totalUpVotes: number;
  totalDownVotes: number;
  thumbnailUrl: string | null;
  robloxUrl: string;
};

type RobloxResponse = {
  games: RobloxGame[];
  nextPageToken: string | null;
  error?: string;
};

const quickSearches = ['Popular', 'Obby', 'Tycoon', 'Simulator', 'Anime', 'Horror', 'Racing', 'Roleplay'];

function compact(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value || 0);
}

function score(game: RobloxGame) {
  const total = game.totalUpVotes + game.totalDownVotes;
  return total > 0 ? Math.round((game.totalUpVotes / total) * 100) : null;
}

function slugify(value:string){return value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80)||'roblox-game'}
function gamePath(game:RobloxGame){return `/roblox/game/${encodeURIComponent(game.universeId)}/${slugify(game.name)}`}

export function RobloxBrowser() {
  const [query, setQuery] = useState('popular');
  const [input, setInput] = useState('');
  const [games, setGames] = useState<RobloxGame[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');

  async function load(search: string, nextCursor?: string | null, append = false) {
    append ? setLoadingMore(true) : setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ q: search });
      if (nextCursor) params.set('cursor', nextCursor);
      const response = await fetch(`/api/roblox/search?${params.toString()}`, { cache: 'no-store' });
      const data: RobloxResponse = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not load Roblox games.');
      setGames((current) => append ? [...current, ...data.games.filter((game) => !current.some((old) => old.universeId === game.universeId))] : data.games);
      setCursor(data.nextPageToken || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load Roblox games.');
      if (!append) setGames([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    load(query);
  }, [query]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;
    setQuery(value);
  }

  return <div className="robloxBrowserLive">
    <section className="robloxHero">
      <div className="robloxEyebrow">ROBLOX ON MADGAMES</div>
      <h1>Find your next Roblox game.</h1>
      <p>Search Roblox experiences from MADGAMES, view their own game detail pages, then launch them on the official Roblox platform.</p>
      <form className="robloxSearch" onSubmit={submit}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Search Roblox games — Brookhaven, obby, anime..."
          aria-label="Search Roblox games"
        />
        <button type="submit">Search</button>
      </form>
      <div className="robloxChips" aria-label="Popular Roblox searches">
        {quickSearches.map((item) => <button key={item} onClick={() => { setInput(item); setQuery(item.toLowerCase()); }}>{item}</button>)}
      </div>
    </section>

    <section className="robloxResults" aria-live="polite">
      <div className="robloxResultsHead">
        <div>
          <span className="robloxKicker">LIVE CATALOG</span>
          <h2>{query === 'popular' ? 'Popular Roblox games' : `Results for “${query}”`}</h2>
        </div>
        <span className="robloxCount">{games.length ? `${games.length}+ loaded` : ''}</span>
      </div>

      {loading && <div className="robloxStatus">Loading Roblox games…</div>}
      {!loading && error && <div className="robloxStatus robloxError">{error}<button onClick={() => load(query)}>Try again</button></div>}
      {!loading && !error && games.length === 0 && <div className="robloxStatus">No games found. Try another search.</div>}

      {!loading && games.length > 0 && <div className="robloxGrid">
        {games.map((game) => {
          const rating = score(game);
          const path=gamePath(game);
          return <article key={game.universeId} className="robloxCard">
            <Link href={path} className="robloxThumbLink" aria-label={`View ${game.name} details`}>
              {game.thumbnailUrl
                ? <img src={game.thumbnailUrl} alt={`${game.name} Roblox game`} className="robloxThumb" loading="lazy" />
                : <div className="robloxThumb robloxThumbFallback">R</div>}
              <span className="robloxPlayBadge">View game</span>
            </Link>
            <div className="robloxCardBody">
              <h3 title={game.name}><Link className="robloxTitleLink" href={path}>{game.name}</Link></h3>
              <div className="robloxStats">
                <span>● {compact(game.playerCount)} playing</span>
                {rating !== null && <span>👍 {rating}%</span>}
              </div>
              <a className="robloxLaunch" href={game.robloxUrl} target="_blank" rel="noopener noreferrer">Play on Roblox ↗</a>
            </div>
          </article>;
        })}
      </div>}

      {!loading && !error && cursor && <div className="robloxMoreWrap">
        <button className="robloxMore" disabled={loadingMore} onClick={() => load(query, cursor, true)}>
          {loadingMore ? 'Loading…' : 'Load more Roblox games'}
        </button>
      </div>}
    </section>

    <p className="robloxDisclaimer">Roblox experiences are owned and operated by their respective creators on Roblox. MADGAMES does not copy or host Roblox game files.</p>
  </div>;
}
