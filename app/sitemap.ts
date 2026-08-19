import type { MetadataRoute } from 'next';
import { getGames, getCategories } from '@/lib/catalog';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.madgames.fun').replace(/\/$/, '');

function safeDate(value?: string | null): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [games, cats] = await Promise.all([getGames(5000), getCategories()]);

  const fixed: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/contact`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${siteUrl}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteUrl}/terms`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteUrl}/cookies`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${siteUrl}/copyright`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/game-publishers`, changeFrequency: 'monthly', priority: 0.4 },
  ];

  const categories: MetadataRoute.Sitemap = cats.map(category => ({
    url: `${siteUrl}/category/${category.slug}`,
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const gameUrls: MetadataRoute.Sitemap = games.map(game => {
    const lastModified = safeDate(game.updatedAt) || safeDate(game.publishedAt) || safeDate(game.createdAt);
    return {
      url: `${siteUrl}/game/${game.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

  return [...fixed, ...categories, ...gameUrls];
}
