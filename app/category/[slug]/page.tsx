import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getByCategory,getCategories} from '@/lib/catalog';
import {getCategorySeoCopy} from '@/lib/seo-content';
import {getGuidesForCategory} from '@/lib/guides';
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
  const editorial=getCategorySeoCopy(slug,category.name);
  const relatedGuides=getGuidesForCategory(slug,2);
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
  const faqLd={
    '@context':'https://schema.org',
    '@type':'FAQPage',
    mainEntity:editorial.faqs.map(item=>({
      '@type':'Question',
      name:item.question,
      acceptedAnswer:{'@type':'Answer',text:item.answer}
    }))
  };
  return <div className="pageShell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(collectionLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqLd)}}/>

    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span>{category.name} Games</span></nav>
    <div className="pageTitle"><div className="eyebrow">FREE ONLINE {category.name.toUpperCase()} GAMES</div><h1>{category.name} Games</h1><p>{description}</p></div>
    <div className="gameGrid">{games.map((g,i)=><GameCard key={g.id} game={g} priority={i===0}/>)}</div>

    <section className="contentCard" aria-labelledby={`about-${slug}-games`}>
      <h2 id={`about-${slug}-games`}>About free {category.name.toLowerCase()} games</h2>
      <p>{editorial.intro}</p>
      <h3>How to choose a {category.name.toLowerCase()} game</h3>
      <p>{editorial.choose}</p>
      <h3>Who this category is useful for</h3>
      <p>{editorial.playStyle}</p>
      <p>Use <Link href="/search">Search</Link> when you already know the type of game you want, or open an individual title to see its gameplay description, controls when available, provider and mobile/desktop support.</p>
    </section>

    <section className="contentCard" aria-labelledby={`${slug}-faq`}>
      <h2 id={`${slug}-faq`}>{category.name} games FAQ</h2>
      {editorial.faqs.map(item=><div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}
    </section>

    {relatedGuides.length?<section className="contentCard" aria-labelledby={`${slug}-guides`}>
      <h2 id={`${slug}-guides`}>Guides related to {category.name.toLowerCase()} games</h2>
      <p>Use these editorial guides when you want help comparing play styles, devices or browser-game formats before choosing a title.</p>
      {relatedGuides.map(guide=><div key={guide.slug}><h3><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.summary}</p></div>)}
      <p><Link href="/guides">Browse all gaming guides →</Link></p>
    </section>:null}

    <section className="gameSection" aria-labelledby="more-categories"><div className="sectionHead"><h2 id="more-categories">Explore more free game categories</h2></div><nav className="adminNav" aria-label="More game categories">{categories.filter(c=>c.slug!==slug).slice(0,12).map(c=><Link key={c.id} href={`/category/${c.slug}`}>{c.name} games</Link>)}</nav></section>
  </div>;
}
