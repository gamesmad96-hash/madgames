import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getGames} from '@/lib/catalog';
import {getSeoTopic,getTopicFaqs,getTopicGames,seoTopics} from '@/lib/seo-topics';
import {GameCard} from '@/components/GameCard';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

export function generateStaticParams(){return seoTopics.map(topic=>({slug:topic.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const topic=getSeoTopic(slug);
  if(!topic)return{};
  return{
    title:topic.title,
    description:topic.metaDescription,
    keywords:[topic.h1.toLowerCase(),'free online games','browser games','no download games',...topic.terms],
    alternates:{canonical:`/play/${topic.slug}`},
    openGraph:{title:`${topic.title} | MADGAMES.FUN`,description:topic.metaDescription,url:`/play/${topic.slug}`},
    twitter:{card:'summary_large_image',title:topic.title,description:topic.metaDescription}
  };
}

export default async function SeoTopicPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const topic=getSeoTopic(slug);
  if(!topic)notFound();
  const games=getTopicGames(topic,await getGames(500),24);
  const faqs=getTopicFaqs(topic);
  const related=seoTopics.filter(item=>item.slug!==topic.slug&&(item.categories.some(category=>topic.categories.includes(category))||item.terms.some(term=>topic.terms.includes(term)))).slice(0,6);
  const breadcrumbLd={
    '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
      {'@type':'ListItem',position:2,name:topic.h1,item:`${siteUrl}/play/${topic.slug}`}
    ]
  };
  const collectionLd={
    '@context':'https://schema.org','@type':'CollectionPage','@id':`${siteUrl}/play/${topic.slug}#collection`,url:`${siteUrl}/play/${topic.slug}`,
    name:topic.h1,description:topic.metaDescription,isPartOf:{'@id':`${siteUrl}/#website`},inLanguage:'en',numberOfItems:games.length,
    mainEntity:{'@type':'ItemList',itemListElement:games.map((game,index)=>({'@type':'ListItem',position:index+1,url:`${siteUrl}/game/${game.slug}`,name:game.title}))}
  };
  const faqLd={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(item=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))};

  return <div className="pageShell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(collectionLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqLd)}}/>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span>{topic.h1}</span></nav>
    <div className="pageTitle"><div className="eyebrow">INSTANT BROWSER GAME COLLECTION</div><h1>{topic.h1}</h1><p>{topic.metaDescription}</p></div>
    <div className="gameGrid">{games.map((game,index)=><GameCard key={game.id} game={game} priority={index===0}/>)}</div>

    <section className="contentCard" aria-labelledby={`${topic.slug}-guide`}>
      <p className="tinyLabel">SEARCH-INTENT GAME GUIDE</p><h2 id={`${topic.slug}-guide`}>How to choose from {topic.h1.toLowerCase()}</h2>
      <p>{topic.summary}</p><h3>What this collection is for</h3><p>{topic.searchIntent}</p><h3>How to pick a game</h3><p>{topic.playAdvice}</p><h3>Mobile and desktop compatibility</h3><p>{topic.compatibility}</p>
      <p>For broader discovery, browse <Link href="/">all free online games</Link>, use <Link href="/search">Search</Link>, or open the game&apos;s category from its detail page.</p>
    </section>

    <section className="contentCard" aria-labelledby={`${topic.slug}-faq`}><h2 id={`${topic.slug}-faq`}>{topic.h1} FAQ</h2>{faqs.map(item=><div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</section>
    {related.length?<section className="gameSection" aria-labelledby={`${topic.slug}-related`}><div className="sectionHead"><h2 id={`${topic.slug}-related`}>Related ways to find games</h2></div><nav className="adminNav" aria-label="Related game collections">{related.map(item=><Link key={item.slug} href={`/play/${item.slug}`}>{item.h1}</Link>)}</nav></section>:null}
  </div>;
}
