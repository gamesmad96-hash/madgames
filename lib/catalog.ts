import type { Category, Game } from './types';
import { seedCategories, seedGames } from './seed-games';
import { hasSupabase, sbSelect } from './supabase-rest';

function normalizeGame(row: any): Game {
  return {
    id: String(row.id),
    provider: row.provider || 'manual',
    providerGameId: row.provider_game_id ?? row.providerGameId ?? null,
    title: row.title,
    slug: row.slug,
    description: row.description || '',
    seoDescription: row.seo_description ?? row.seoDescription ?? null,
    instructions: row.instructions ?? null,
    controls: row.controls ?? null,
    embedUrl: row.embed_url ?? row.embedUrl ?? null,
    thumbnailUrl: row.thumbnail_url ?? row.thumbnailUrl ?? null,
    screenshots: row.screenshots || [],
    category: row.category || 'Casual',
    categories: row.categories || [row.category || 'Casual'],
    tags: row.tags || [],
    mobileSupported: row.mobile_supported ?? row.mobileSupported ?? true,
    desktopSupported: row.desktop_supported ?? row.desktopSupported ?? true,
    width: row.width ?? null,
    height: row.height ?? null,
    orientation: row.orientation ?? null,
    language: row.language ?? 'en',
    status: row.status || 'published',
    featured: Boolean(row.featured),
    trending: Boolean(row.trending),
    badge: row.badge ?? null,
    emoji: row.emoji || '🎮',
    gradient: row.gradient || 'g1',
    publishedAt: row.published_at ?? row.publishedAt ?? null,
    updatedAt: row.updated_at ?? row.updatedAt ?? null,
    createdAt: row.created_at ?? row.createdAt ?? null,
  };
}

export async function getGames(limit = 200): Promise<Game[]> {
  if (!hasSupabase()) return seedGames.slice(0, limit);
  try {
    const rows = await sbSelect<any[]>(`games?select=*&status=eq.published&order=featured.desc,trending.desc,published_at.desc&limit=${limit}`, { revalidate: 60 });
    return rows.length ? rows.map(normalizeGame) : seedGames.slice(0, limit);
  } catch {
    return seedGames.slice(0, limit);
  }
}

export async function getAllGamesForAdmin(limit = 500): Promise<Game[]> {
  if (!hasSupabase()) return seedGames.slice(0, limit);
  try {
    const rows = await sbSelect<any[]>(`games?select=*&order=created_at.desc&limit=${limit}`, { admin: true, revalidate: 0 });
    return rows.map(normalizeGame);
  } catch {
    return seedGames.slice(0, limit);
  }
}

export async function getGame(slug: string): Promise<Game | undefined> {
  if (!hasSupabase()) return seedGames.find(g => g.slug === slug);
  try {
    const rows = await sbSelect<any[]>(`games?select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`, { revalidate: 60 });
    return rows[0] ? normalizeGame(rows[0]) : seedGames.find(g => g.slug === slug);
  } catch {
    return seedGames.find(g => g.slug === slug);
  }
}

export async function getGameById(id: string): Promise<Game | undefined> {
  if (!hasSupabase()) return seedGames.find(g => g.id === id);
  try {
    const rows = await sbSelect<any[]>(`games?select=*&id=eq.${encodeURIComponent(id)}&limit=1`, { admin: true, revalidate: 0 });
    return rows[0] ? normalizeGame(rows[0]) : seedGames.find(g => g.id === id);
  } catch {
    return seedGames.find(g => g.id === id);
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!hasSupabase()) return seedCategories;
  try {
    const rows = await sbSelect<any[]>(`categories?select=*&enabled=eq.true&order=sort_order.asc`, { revalidate: 300 });
    return rows.length ? rows.map(r => ({ id:r.id, name:r.name, slug:r.slug, description:r.description, seoTitle:r.seo_title, enabled:r.enabled, sortOrder:r.sort_order })) : seedCategories;
  } catch {
    return seedCategories;
  }
}

export async function getByCategory(slug: string): Promise<{category?: Category; games: Game[]}> {
  const [cats, games] = await Promise.all([getCategories(), getGames(500)]);
  const category = cats.find(c => c.slug === slug);
  if (!category) return { games: [] };
  return { category, games: games.filter(g => g.category.toLowerCase().replaceAll(' ', '-') === slug || g.categories?.some(c => c.toLowerCase().replaceAll(' ', '-') === slug)) };
}
