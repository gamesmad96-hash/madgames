import { NextRequest, NextResponse } from 'next/server';

type RobloxExperience = {
  universeId?: number | string;
  rootPlaceId?: number | string;
  name?: string;
  playerCount?: number;
  totalUpVotes?: number;
  totalDownVotes?: number;
};

export const dynamic = 'force-dynamic';

function compactNumber(value: unknown) {
  const num = Number(value || 0);
  return Number.isFinite(num) ? num : 0;
}

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get('q') || 'popular').trim().slice(0, 80);
  const cursor = (request.nextUrl.searchParams.get('cursor') || '').trim().slice(0, 500);

  const searchUrl = new URL('https://apis.roblox.com/search-api/omni-search');
  searchUrl.searchParams.set('searchQuery', q || 'popular');
  searchUrl.searchParams.set('sessionId', crypto.randomUUID());
  searchUrl.searchParams.set('pageType', 'all');
  if (cursor) searchUrl.searchParams.set('pageToken', cursor);

  try {
    const response = await fetch(searchUrl, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Roblox search is temporarily unavailable.', games: [], nextPageToken: null },
        { status: 502 },
      );
    }

    const data = await response.json();
    const groups = Array.isArray(data?.searchResults) ? data.searchResults : [];
    const rawGames: RobloxExperience[] = groups.flatMap((group: any) =>
      Array.isArray(group?.contents) ? group.contents : [],
    );

    const seen = new Set<string>();
    const games = rawGames
      .filter((game) => game?.universeId && game?.rootPlaceId && game?.name)
      .filter((game) => {
        const id = String(game.universeId);
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      })
      .slice(0, 60);

    const universeIds = games.map((game) => String(game.universeId));
    const thumbnails = new Map<string, string>();

    if (universeIds.length) {
      const thumbUrl = new URL('https://thumbnails.roblox.com/v1/games/icons');
      thumbUrl.searchParams.set('universeIds', universeIds.join(','));
      thumbUrl.searchParams.set('returnPolicy', 'PlaceHolder');
      thumbUrl.searchParams.set('size', '512x512');
      thumbUrl.searchParams.set('format', 'Png');
      thumbUrl.searchParams.set('isCircular', 'false');

      const thumbResponse = await fetch(thumbUrl, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      }).catch(() => null);

      if (thumbResponse?.ok) {
        const thumbData = await thumbResponse.json().catch(() => ({ data: [] }));
        for (const item of Array.isArray(thumbData?.data) ? thumbData.data : []) {
          if (item?.targetId && item?.imageUrl) thumbnails.set(String(item.targetId), item.imageUrl);
        }
      }
    }

    return NextResponse.json({
      query: q,
      games: games.map((game) => ({
        universeId: String(game.universeId),
        rootPlaceId: String(game.rootPlaceId),
        name: String(game.name),
        playerCount: compactNumber(game.playerCount),
        totalUpVotes: compactNumber(game.totalUpVotes),
        totalDownVotes: compactNumber(game.totalDownVotes),
        thumbnailUrl: thumbnails.get(String(game.universeId)) || null,
        robloxUrl: `https://www.roblox.com/games/${game.rootPlaceId}`,
      })),
      nextPageToken: data?.nextPageToken || null,
    });
  } catch {
    return NextResponse.json(
      { error: 'Roblox search is temporarily unavailable.', games: [], nextPageToken: null },
      { status: 502 },
    );
  }
}
