import type {MetadataRoute} from 'next';
import {getGames,getCategories} from '@/lib/catalog';
import {guides} from '@/lib/guides';

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

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const base=cleanBase(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun');
  const [games,cats]=await Promise.all([getGames(5000),getCategories()]);
  const latestCatalogUpdate=latest(games.map(g=>validDate(g.updatedAt)||validDate(g.publishedAt)));
  const latestGuideUpdate=latest(guides.map(guide=>validDate(guide.updatedAt)));

  const fixed:MetadataRoute.Sitemap=[
    {url:`${base}/`,lastModified:latestCatalogUpdate,changeFrequency:'daily',priority:1},
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

  const categories:MetadataRoute.Sitemap=cats.map(c=>{
    const categoryGames=games.filter(g=>categorySlug(g.category)===c.slug||(g.categories||[]).some(name=>categorySlug(name)===c.slug));
    const lastModified=latest(categoryGames.map(g=>validDate(g.updatedAt)||validDate(g.publishedAt)));
    return {url:`${base}/category/${c.slug}`,lastModified,changeFrequency:'daily' as const,priority:.75};
  });

  const gameUrls:MetadataRoute.Sitemap=games.map(g=>({
    url:`${base}/game/${g.slug}`,
    lastModified:validDate(g.updatedAt)||validDate(g.publishedAt),
    changeFrequency:'weekly',
    priority:.8
  }));

  return [...fixed,...guideUrls,...categories,...gameUrls];
}
