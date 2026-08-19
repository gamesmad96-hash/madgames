import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {getGame,getGames} from '@/lib/catalog';
import {getGuidesForCategory} from '@/lib/guides';
import {PlayerShell} from '@/components/PlayerShell';
import {ClientGameActions} from '@/components/ClientGameActions';
import {GameSection} from '@/components/GameSection';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

function gameDescription(title:string,category:string,base?:string|null){
  const first=(base||'').trim();
  const suffix=` Play ${title} free online on MADGAMES.FUN in your browser. View gameplay details, controls and device support for this ${category.toLowerCase()} game.`;
  const combined=`${first}${suffix}`.trim();
  return combined.length>160?`${combined.slice(0,157).trimEnd()}...`:combined;
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const g=await getGame(slug);
  if(!g)return{};
  const description=gameDescription(g.title,g.category,g.seoDescription||g.description);
  const seoTitle=`${g.title} — Free ${g.category} Game Online`;
  return{
    title:seoTitle,
    description,
    keywords:[g.title,`free ${g.category.toLowerCase()} game`,`${g.category.toLowerCase()} games online`,'browser game','free online games'],
    alternates:{canonical:`/game/${g.slug}`},
    openGraph:{title:`${seoTitle} | MADGAMES.FUN`,description,url:`/game/${g.slug}`,images:g.thumbnailUrl?[{url:g.thumbnailUrl,alt:`${g.title} ${g.category} game thumbnail`}]:undefined},
    twitter:{card:'summary_large_image',title:seoTitle,description,images:g.thumbnailUrl?[g.thumbnailUrl]:undefined}
  };
}

export default async function GamePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const [game,all]=await Promise.all([getGame(slug),getGames(160)]);
  if(!game)notFound();
  const related=all.filter(g=>g.slug!==game.slug&&(g.category===game.category||g.tags?.some(t=>game.tags?.includes(t)))).slice(0,10);
  const categorySlug=game.category.toLowerCase().replaceAll(' ','-');
  const relatedGuides=getGuidesForCategory(categorySlug,2);
  const description=gameDescription(game.title,game.category,game.description);
  const deviceAnswer=game.mobileSupported&&game.desktopSupported
    ?`${game.title} is listed as supporting both mobile and desktop browsers.`
    :game.mobileSupported
      ?`${game.title} is listed as supporting mobile browsers. Desktop support is not currently marked for this title.`
      :game.desktopSupported
        ?`${game.title} is listed as supporting desktop browsers. Mobile support is not currently marked for this title.`
        :`Device support is not currently confirmed for ${game.title}.`;
  const faqs=[
    {question:`Is ${game.title} free to play?`,answer:`MADGAMES.FUN lists ${game.title} for free browser play. Third-party provider terms or in-game options can vary by title.`},
    {question:`Do I need to download ${game.title}?`,answer:`Normal play is intended to run in the browser, so a separate game installation is not normally required when ${game.title} supports your device.`},
    {question:`Can I play ${game.title} on mobile or desktop?`,answer:deviceAnswer}
  ];
  const breadcrumbLd={
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
      {'@type':'ListItem',position:2,name:`${game.category} Games`,item:`${siteUrl}/category/${categorySlug}`},
      {'@type':'ListItem',position:3,name:game.title,item:`${siteUrl}/game/${game.slug}`}
    ]
  };
  const gameLd={
    '@context':'https://schema.org',
    '@type':'VideoGame',
    '@id':`${siteUrl}/game/${game.slug}#game`,
    name:game.title,
    url:`${siteUrl}/game/${game.slug}`,
    description,
    genre:game.categories?.length?game.categories:[game.category],
    gamePlatform:'Web browser',
    inLanguage:game.language||'en',
    isAccessibleForFree:true,
    image:game.thumbnailUrl||undefined,
    datePublished:game.publishedAt||undefined,
    dateModified:game.updatedAt||undefined,
    mainEntityOfPage:`${siteUrl}/game/${game.slug}`,
    isPartOf:{'@id':`${siteUrl}/#website`},
    publisher:{'@id':`${siteUrl}/#organization`}
  };
  const faqLd={
    '@context':'https://schema.org',
    '@type':'FAQPage',
    mainEntity:faqs.map(item=>({
      '@type':'Question',
      name:item.question,
      acceptedAnswer:{'@type':'Answer',text:item.answer}
    }))
  };
  return <div className="pageShell narrow">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(gameLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqLd)}}/>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href={`/category/${categorySlug}`}>{game.category}</Link><span>›</span><span>{game.title}</span></nav>
    <div className="gameTopbar"><div><p className="tinyLabel">FREE ONLINE {game.category.toUpperCase()} GAME</p><h1>{game.title}</h1><p>{game.category} • {game.provider==='demo'?'Demo catalog':game.provider}</p></div><ClientGameActions slug={game.slug}/></div>
    <PlayerShell game={game}/>
    <section className="contentCard"><h2>About {game.title}</h2><p>{game.description}</p><h3>How to play {game.title}</h3><p>{game.instructions||'Press Play and follow the instructions shown inside the game.'}</p><h3>{game.title} controls</h3><div className="controlChips"><span>{game.controls||'Controls vary by game.'}</span></div><div className="gameDetails"><span>Category <b><Link href={`/category/${categorySlug}`}>{game.category}</Link></b></span><span>Provider <b>{game.provider}</b></span><span>Mobile <b>{game.mobileSupported?'Yes':'No'}</b></span><span>Desktop <b>{game.desktopSupported?'Yes':'No'}</b></span></div><p>Browse more <Link href={`/category/${categorySlug}`}>{game.category.toLowerCase()} games</Link> or use <Link href="/search">Search</Link> to find another title.</p><Link className="reportLink" href={`/report-game?game=${encodeURIComponent(game.slug)}`}>Report a problem with this game</Link></section>
    <section className="contentCard" aria-labelledby={`${game.slug}-faq`}><h2 id={`${game.slug}-faq`}>{game.title} FAQ</h2>{faqs.map(item=><div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</section>
    {relatedGuides.length?<section className="contentCard" aria-labelledby={`${game.slug}-guides`}><h2 id={`${game.slug}-guides`}>Helpful browser gaming guides</h2><p>These guides explain the broader play style, device or browser-game format connected to this category.</p>{relatedGuides.map(guide=><p key={guide.slug}><Link href={`/guides/${guide.slug}`}>{guide.title}</Link> — {guide.summary}</p>)}<p><Link href="/guides">Browse all gaming guides →</Link></p></section>:null}
    <GameSection title={`More ${game.category} games like ${game.title}`} items={related}/>
  </div>;
}
