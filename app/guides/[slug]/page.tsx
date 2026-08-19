import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getGuide,guides} from '@/lib/guides';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

export function generateStaticParams(){return guides.map(guide=>({slug:guide.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const guide=getGuide(slug);
  if(!guide)return{};
  return{
    title:guide.title,
    description:guide.description,
    alternates:{canonical:`/guides/${guide.slug}`},
    openGraph:{title:`${guide.title} | MADGAMES.FUN`,description:guide.description,url:`/guides/${guide.slug}`,type:'article'},
    twitter:{card:'summary_large_image',title:guide.title,description:guide.description}
  };
}

export default async function GuidePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const guide=getGuide(slug);
  if(!guide)notFound();
  const relatedGuides=guides.filter(item=>item.slug!==guide.slug).slice(0,3);
  const breadcrumbLd={
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:`${siteUrl}/`},
      {'@type':'ListItem',position:2,name:'Gaming Guides',item:`${siteUrl}/guides`},
      {'@type':'ListItem',position:3,name:guide.title,item:`${siteUrl}/guides/${guide.slug}`}
    ]
  };
  const articleLd={
    '@context':'https://schema.org',
    '@type':'Article',
    headline:guide.title,
    description:guide.description,
    datePublished:guide.publishedAt,
    dateModified:guide.updatedAt,
    mainEntityOfPage:`${siteUrl}/guides/${guide.slug}`,
    author:{'@type':'Organization','@id':`${siteUrl}/#organization`,name:'MADGAMES.FUN Editorial'},
    publisher:{'@id':`${siteUrl}/#organization`},
    isPartOf:{'@id':`${siteUrl}/#website`},
    inLanguage:'en'
  };
  const faqLd={
    '@context':'https://schema.org',
    '@type':'FAQPage',
    mainEntity:guide.faqs.map(item=>({
      '@type':'Question',
      name:item.question,
      acceptedAnswer:{'@type':'Answer',text:item.answer}
    }))
  };

  return <div className="pageShell narrow">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqLd)}}/>

    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/guides">Guides</Link><span>›</span><span>{guide.title}</span></nav>
    <div className="pageTitle"><div className="eyebrow">MADGAMES.FUN EDITORIAL GUIDE</div><h1>{guide.title}</h1><p>{guide.summary}</p><p><small>Published <time dateTime={guide.publishedAt}>{guide.publishedAt}</time> · Updated <time dateTime={guide.updatedAt}>{guide.updatedAt}</time></small></p></div>

    <article className="contentCard infoText">
      {guide.sections.map(section=><section key={section.heading}>
        <h2>{section.heading}</h2>
        {section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
        {section.bullets?.length?<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>:null}
      </section>)}
    </article>

    <section className="contentCard" aria-labelledby="related-categories">
      <h2 id="related-categories">Explore related game categories</h2>
      <p>Use these category pages to compare current games after reading the guide.</p>
      <nav className="adminNav" aria-label="Related game categories">{guide.relatedCategories.map(category=><Link key={category.slug} href={`/category/${category.slug}`}>{category.name} games</Link>)}</nav>
    </section>

    <section className="contentCard" aria-labelledby={`${guide.slug}-faq`}>
      <h2 id={`${guide.slug}-faq`}>Quick answers</h2>
      {guide.faqs.map(item=><div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}
    </section>

    <section className="contentCard" aria-labelledby="more-guides">
      <h2 id="more-guides">More browser gaming guides</h2>
      {relatedGuides.map(item=><p key={item.slug}><Link href={`/guides/${item.slug}`}>{item.title}</Link> — {item.summary}</p>)}
      <p><Link href="/guides">View all guides →</Link></p>
    </section>
  </div>;
}
