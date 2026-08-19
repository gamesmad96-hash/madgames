import type {Metadata} from 'next';
import Link from 'next/link';
import {guides} from '@/lib/guides';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

export const metadata:Metadata={
  title:'Browser Gaming Guides — Tips for Choosing and Playing',
  description:'Explore practical MADGAMES.FUN guides for choosing browser games, mobile play, no-download gaming, 2 Player games and category discovery.',
  alternates:{canonical:'/guides'},
  openGraph:{
    title:'Browser Gaming Guides | MADGAMES.FUN',
    description:'Practical guides for choosing and playing free online browser games.',
    url:'/guides'
  },
  twitter:{card:'summary_large_image',title:'Browser Gaming Guides | MADGAMES.FUN',description:'Practical guides for choosing and playing free online browser games.'}
};

export default function GuidesPage(){
  const itemListLd={
    '@context':'https://schema.org',
    '@type':'ItemList',
    name:'MADGAMES.FUN Browser Gaming Guides',
    itemListElement:guides.map((guide,index)=>({
      '@type':'ListItem',
      position:index+1,
      name:guide.title,
      url:`${siteUrl}/guides/${guide.slug}`
    }))
  };
  const breadcrumbLd={
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
      {'@type':'ListItem',position:2,name:'Gaming Guides',item:`${siteUrl}/guides`}
    ]
  };

  return <div className="pageShell narrow">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(itemListLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span>Gaming Guides</span></nav>
    <div className="pageTitle"><div className="eyebrow">MADGAMES.FUN EDITORIAL</div><h1>Browser Gaming Guides</h1><p>Answer-first guides for choosing games, understanding browser play, checking device support and discovering a category that fits the session you want.</p></div>

    <section className="contentCard" aria-labelledby="guide-index">
      <h2 id="guide-index">Start with a practical gaming question</h2>
      <p>These guides are designed to support the game and category pages rather than replace them. Use a guide to understand a type of browser-gaming decision, then follow the relevant category links to compare actual games.</p>
      {guides.map(guide=><article key={guide.slug}>
        <h3><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h3>
        <p>{guide.summary}</p>
        <p><Link href={`/guides/${guide.slug}`}>Read guide →</Link></p>
      </article>)}
    </section>

    <section className="contentCard" aria-labelledby="popular-categories">
      <h2 id="popular-categories">Explore game categories</h2>
      <p>If you already know the style you want, go directly to a category page and compare current titles.</p>
      <nav className="adminNav" aria-label="Popular game categories">
        <Link href="/category/action">Action games</Link>
        <Link href="/category/puzzle">Puzzle games</Link>
        <Link href="/category/racing">Racing games</Link>
        <Link href="/category/casual">Casual games</Link>
        <Link href="/category/arcade">Arcade games</Link>
        <Link href="/category/2-player">2 Player games</Link>
      </nav>
    </section>
  </div>;
}
