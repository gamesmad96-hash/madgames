import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getByCategory,getCategories} from '@/lib/catalog';
import {GameCard} from '@/components/GameCard';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

function categoryDescription(name:string){
  const lower=name.toLowerCase();
  return `Play free ${lower} games online instantly on MADGAMES.FUN. Browse browser-based ${lower} games, open a title and start playing with no normal game download required.`;
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const {category}=await getByCategory(slug);
  if(!category)return{};
  const description=categoryDescription(category.name);
  const seoTitle=category.seoTitle||`Free ${category.name} Games Online — Play Instantly`;
  return{
    title:seoTitle,
    description,
    keywords:[`free ${category.name.toLowerCase()} games`,`${category.name.toLowerCase()} games online`,'browser games','free online games'],
    alternates:{canonical:`/category/${slug}`},
    openGraph:{title:`${seoTitle} | MADGAMES.FUN`,description,url:`/category/${slug}`},
    twitter:{card:'summary_large_image',title:seoTitle,description}
  };
}

export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const [{category,games},categories]=await Promise.all([getByCategory(slug),getCategories()]);
  if(!category)notFound();
  const description=categoryDescription(category.name);
  const breadcrumbLd={
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
      {'@type':'ListItem',position:2,name:`${category.name} Games`,item:`${siteUrl}/category/${slug}`}
    ]
  };
  const collectionLd={
    '@context':'https://schema.org',
    '@type':'CollectionPage',
    '@id':`${siteUrl}/category/${slug}#collection`,
    url:`${siteUrl}/category/${slug}`,
    name:`Free ${category.name} Games Online`,
    description,
    isPartOf:{'@id':`${siteUrl}/#website`},
    inLanguage:'en',
    numberOfItems:games.length
  };
  return <div className="pageShell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(collectionLd)}}/>
    <div className="pageTitle"><div className="eyebrow">FREE ONLINE {category.name.toUpperCase()} GAMES</div><h1>{category.name} Games</h1><p>{description}</p></div>
    <div className="gameGrid">{games.map((g,i)=><GameCard key={g.id} game={g} priority={i===0}/>)}</div>

    <section className="contentCard" aria-labelledby={`about-${slug}-games`}>
      <h2 id={`about-${slug}-games`}>About free {category.name.toLowerCase()} games</h2>
      <p>Explore {category.name.toLowerCase()} games available through MADGAMES.FUN and open any title to view its game page, gameplay description, controls when available and device-support information. The site is designed for browser play, so normal gameplay does not require a separate game installation.</p>
      <h3>How to choose a {category.name.toLowerCase()} game</h3>
      <p>Start with the game cards above, use <Link href="/search">Search</Link> for a specific title or browse another category if you want a different style of game. Individual game pages also link to related titles to make discovery easier.</p>
    </section>

    <section className="gameSection" aria-labelledby="more-categories"><div className="sectionHead"><h2 id="more-categories">Explore more free game categories</h2></div><nav className="adminNav" aria-label="More game categories">{categories.filter(c=>c.slug!==slug).slice(0,12).map(c=><Link key={c.id} href={`/category/${c.slug}`}>{c.name} games</Link>)}</nav></section>
  </div>;
}
