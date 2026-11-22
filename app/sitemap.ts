import type {MetadataRoute} from 'next';
import {getGames,getCategories} from '@/lib/catalog';
import {guides} from '@/lib/guides';
import {robloxTrafficGuides} from '@/lib/roblox-guides';
import {MIN_INDEXABLE_CATEGORY_GAMES} from '@/lib/index-policy';

function cleanBase(value:string){return value.replace(/\/$/,'')}
function categorySlug(value:string){return value.toLowerCase().trim().replaceAll(' ','-')}
function validDate(value?:string|null){
  if(!value)return undefined;
  const date=new Date(value);
  return Number.isNaN(date.getTime())?undefined:date;
}
function latest(dates:Array<Date|undefined>){
  const valid=dates.filter((d):d is Date=>Boolean(d));
  if(!valid.length)return undefined;
  return new Date(Math.max(...valid.map(d=>d.getTime())));
}

export const revalidate=3600;

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const base=cleanBase(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun');
  const [games,cats]=await Promise.all([getGames(5000),getCategories()]);
  const latestCatalogUpdate=latest(games.map(g=>validDate(g.updatedAt)||validDate(g.publishedAt)));
  const latestGuideUpdate=latest(guides.map(guide=>validDate(guide.updatedAt)));

  const fixed:MetadataRoute.Sitemap=[
    {url:`${base}/`,lastModified:latestCatalogUpdate,changeFrequency:'daily',priority:1},
    {url:`${base}/games`,lastModified:latestCatalogUpdate,changeFrequency:'daily',priority:.95},
    {url:`${base}/new-games`,lastModified:latestCatalogUpdate,changeFrequency:'daily',priority:.9},
    {url:`${base}/hot-games`,lastModified:latestCatalogUpdate,changeFrequency:'daily',priority:.9},
    {url:`${base}/roblox`,changeFrequency:'daily',priority:.9},
    {url:`${base}/roblox/guides`,changeFrequency:'weekly',priority:.84},
    {url:`${base}/guides`,lastModified:latestGuideUpdate,changeFrequency:'weekly',priority:.7},
    {url:`${base}/about`,changeFrequency:'monthly',priority:.6},
    {url:`${base}/contact`,changeFrequency:'monthly',priority:.4},
    {url:`${base}/privacy`,changeFrequency:'yearly',priority:.3},
    {url:`${base}/terms`,changeFrequency:'yearly',priority:.3},
    {url:`${base}/cookies`,changeFrequency:'yearly',priority:.2},
    {url:`${base}/copyright`,changeFrequency:'yearly',priority:.4},
    {url:`${base}/game-publishers`,changeFrequency:'monthly',priority:.5}
  ];

  const guideUrls:MetadataRoute.Sitemap=guides.map(guide=>({
    url:`${base}/guides/${guide.slug}`,
    lastModified:validDate(guide.updatedAt)||validDate(guide.publishedAt),
    changeFrequency:'monthly',
    priority:.65
  }));

  const robloxGuideUrls:MetadataRoute.Sitemap=robloxTrafficGuides.map(guide=>({
    url:`${base}/roblox/guides/${guide.slug}`,
    changeFrequency:'daily' as const,
    priority:.8
  }));

  const categories:MetadataRoute.Sitemap=cats.flatMap(c=>{
    const categoryGames=games.filter(g=>categorySlug(g.category)===c.slug||(g.categories||[]).some(name=>categorySlug(name)===c.slug));
    if(categoryGames.length<MIN_INDEXABLE_CATEGORY_GAMES)return [];
    const lastModified=latest(categoryGames.map(g=>validDate(g.updatedAt)||validDate(g.publishedAt)));
    return [{url:`${base}/category/${c.slug}`,lastModified,changeFrequency:'daily' as const,priority:.75}];
  });

  const gameUrls:MetadataRoute.Sitemap=games.map(g=>({
    url:`${base}/game/${g.slug}`,
    lastModified:validDate(g.updatedAt)||validDate(g.publishedAt),
    changeFrequency:'weekly',
    priority:.8
  }));

  // Roblox game/category pages and /play collections are auto-generated and noindexed, so they are not listed.
  return [...fixed,...robloxGuideUrls,...guideUrls,...categories,...gameUrls];
}
