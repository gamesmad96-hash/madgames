import type { MetadataRoute } from 'next';
import { getGames, getCategories } from '@/lib/catalog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://madgames.fun';
  const [games, cats] = await Promise.all([getGames(5000), getCategories()]);
  const fixed: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/copyright`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/game-publishers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];
  const categories: MetadataRoute.Sitemap = cats.map(c => ({ url: `${base}/category/${c.slug}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 }));
  const gameUrls: MetadataRoute.Sitemap = games.map(g => ({ url: `${base}/game/${g.slug}`, lastModified: g.updatedAt ? new Date(g.updatedAt) : new Date(), changeFrequency: 'weekly', priority: 0.8 }));
  return [...fixed, ...categories, ...gameUrls];
}
