import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getByCategory,getCategories} from '@/lib/catalog';
import {GameCard} from '@/components/GameCard';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const {category}=await getByCategory(slug);
  if(!category)return{};
  const description=category.description||`Play free ${category.name.toLowerCase()} games instantly in your browser.`;
  const title=category.seoTitle||`${category.name} Games`;
  return{
    title,
    description,
    alternates:{canonical:`/category/${slug}`},
    openGraph:{title:`${title} | MADGAMES.FUN`,description,url:`/category/${slug}`},
    twitter:{card:'summary_large_image',title,description}
  };
}

export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const [{category,games},categories]=await Promise.all([getByCategory(slug),getCategories()]);
  if(!category)notFound();
  const breadcrumbLd={
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
      {'@type':'ListItem',position:2,name:`${category.name} Games`,item:`${siteUrl}/category/${slug}`}
    ]
  };
  const itemListLd={
    '@context':'https://schema.org',
    '@type':'ItemList',
    name:`${category.name} Games`,
    itemListElement:games.slice(0,50).map((game,index)=>({
      '@type':'ListItem',
      position:index+1,
      name:game.title,
      url:`${siteUrl}/game/${game.slug}`
    }))
  };
  return <div className="pageShell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(itemListLd)}}/>
    <div className="pageTitle"><div className="eyebrow">CATEGORY</div><h1>{category.name} Games</h1><p>{category.description}</p></div>
    <div className="gameGrid">{games.map((g,i)=><GameCard key={g.id} game={g} priority={i===0}/>)}</div>
    <section className="gameSection" aria-labelledby="more-categories"><div className="sectionHead"><h2 id="more-categories">Explore more games</h2></div><nav className="adminNav" aria-label="More game categories">{categories.filter(c=>c.slug!==slug).slice(0,12).map(c=><Link key={c.id} href={`/category/${c.slug}`}>{c.name} games</Link>)}</nav></section>
  </div>;
}
