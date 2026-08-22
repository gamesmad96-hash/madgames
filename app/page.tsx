import Link from 'next/link';
import {getCategories,getGames} from '@/lib/catalog';
import {guides} from '@/lib/guides';
import {seoTopics} from '@/lib/seo-topics';
import {robloxTrafficGuides} from '@/lib/roblox-guides';
import {GameCard} from '@/components/GameCard';
import {GameSection} from '@/components/GameSection';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

const faqs=[
  {
    question:'What is MADGAMES.FUN?',
    answer:'MADGAMES.FUN is a free online browser gaming site built for discovering and playing games directly in a web browser.'
  },
  {
    question:'Do I need to download games to play?',
    answer:'No download is required for normal gameplay on MADGAMES.FUN. Open a game page and play it in your browser when the game supports your device.'
  },
  {
    question:'What types of free online games are available?',
    answer:'The catalog includes categories such as action, racing, puzzle, sports, adventure, arcade, casual and multiplayer games, with availability changing as the catalog is updated.'
  },
  {
    question:'Can I play MADGAMES.FUN games on mobile and desktop?',
    answer:'MADGAMES.FUN includes games for mobile and desktop browsers. Individual game pages show whether a game supports mobile, desktop or both.'
  },
  {
    question:'How can I find a game quickly?',
    answer:'Use Search, browse a category, open Recent games or save games to Favorites so you can return to them more easily.'
  }
];

export default async function Home(){
  const [games,categories]=await Promise.all([getGames(160),getCategories()]);
  const top=games.slice(0,16);
  const by=(c:string)=>games.filter(g=>g.category===c).slice(0,6);
  const currentYear=new Date().getFullYear();
  const faqLd={
    '@context':'https://schema.org',
    '@type':'FAQPage',
    mainEntity:faqs.map(item=>({
      '@type':'Question',
      name:item.question,
      acceptedAnswer:{'@type':'Answer',text:item.answer}
    }))
  };
  const collectionLd={
    '@context':'https://schema.org',
    '@type':'CollectionPage',
    '@id':`${siteUrl}/#games`,
    url:`${siteUrl}/`,
    name:'Free Online Browser Games',
    description:'Discover free online browser games across action, racing, puzzle, sports and more on MADGAMES.FUN.',
    isPartOf:{'@id':`${siteUrl}/#website`},
    inLanguage:'en'
  };

  return <div className="homePage">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(collectionLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqLd)}}/>

    <div className="homeIntro"><div><p className="tinyLabel">MADGAMES.FUN · FREE ONLINE BROWSER GAMES</p><h1>Play free online games instantly.</h1></div><Link href="/games" className="browseLink">Browse all games <span>→</span></Link></div>

    <section className="discoveryGrid" aria-label="Featured free online games">{top.map((game,i)=><GameCard key={game.id} game={game} priority={i===0} featured={[0,4,9,14].includes(i)} compact={[2,3,6,7,10,11].includes(i)}/>)}</section>
    <GameSection title="Trending now" items={games.filter(g=>g.trending).slice(0,6)} href="/hot-games"/>
    <GameSection title="Racing games" items={by('Racing')} href="/category/racing"/>
    <GameSection title="Action games" items={by('Action')} href="/category/action"/>
    <GameSection title="Puzzle games" items={by('Puzzle')} href="/category/puzzle"/>
    <GameSection title="Sports games" items={by('Sports')} href="/category/sports"/>

    <section className="gameSection" aria-labelledby="browse-categories"><div className="sectionHead"><h2 id="browse-categories">Browse free games by category</h2><Link href="/games">All games →</Link></div><nav className="adminNav" aria-label="Game categories">{categories.slice(0,18).map(c=><Link key={c.id} href={`/category/${c.slug}`}>{c.name} games</Link>)}</nav></section>

    <section className="contentCard" aria-labelledby="roblox-discovery">
      <p className="tinyLabel">ROBLOX DISCOVERY</p>
      <h2 id="roblox-discovery">Find Roblox games, live activity and focused guides</h2>
      <p>MADGAMES now includes a Roblox discovery hub with searchable experiences, crawlable game detail pages, live category collections and guides for common searches such as two-player, horror, obby, anime and multiplayer games. Roblox experiences launch on the official Roblox platform.</p>
      <nav className="adminNav" aria-label="Roblox discovery and guides"><Link href="/roblox">Roblox games</Link><Link href="/roblox/guides">All Roblox guides</Link>{robloxTrafficGuides.slice(0,8).map(guide=><Link key={guide.slug} href={`/roblox/guides/${guide.slug}`}>{guide.title}</Link>)}</nav>
    </section>

    <section className="contentCard" aria-labelledby="discovery-hubs">
      <p className="tinyLabel">DISCOVER THE CATALOG</p>
      <h2 id="discovery-hubs">Find fresh and popular games faster</h2>
      <p>Use the permanent discovery pages to browse the complete catalog, recently added games or titles currently marked as trending and featured.</p>
      <nav className="adminNav" aria-label="Game discovery pages"><Link href="/games">All free games</Link><Link href="/new-games">New games</Link><Link href="/hot-games">Hot games</Link></nav>
    </section>

    <section className="contentCard" aria-labelledby="popular-searches">
      <p className="tinyLabel">POPULAR WAYS TO PLAY</p>
      <h2 id="popular-searches">Find games by what you want to play</h2>
      <p>Browse focused collections for common browser-game searches. Each page uses the live catalog, links back to individual games and includes device and play-style guidance instead of being a thin keyword page.</p>
      <nav className="adminNav" aria-label="Popular game collections">{seoTopics.map(topic=><Link key={topic.slug} href={`/play/${topic.slug}`}>{topic.h1}</Link>)}</nav>
    </section>

    <section className="contentCard" aria-labelledby="browser-gaming-guides">
      <p className="tinyLabel">MADGAMES.FUN EDITORIAL</p>
      <h2 id="browser-gaming-guides">Browser gaming guides</h2>
      <p>Use our answer-first guides when you want help choosing a game type, checking mobile compatibility or understanding how browser play works before opening a title.</p>
      {guides.slice(0,3).map(guide=><div key={guide.slug}><h3><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.summary}</p></div>)}
      <p><Link href="/guides">Browse all gaming guides →</Link></p>
    </section>

    <section className="contentCard" aria-labelledby="about-free-games">
      <p className="tinyLabel">ABOUT MADGAMES.FUN</p>
      <h2 id="about-free-games">Free browser games with no downloads</h2>
      <p>MADGAMES.FUN is a browser-games portal designed around quick discovery and instant play. You can explore free online games from the home page, browse dedicated category pages, search the catalog, open a game page and start playing without installing a separate game application for normal gameplay.</p>
      <p>The catalog is organized into clear topics so players and search engines can understand what each section contains. Popular areas include <Link href="/category/action">action games</Link>, <Link href="/category/racing">racing games</Link>, <Link href="/category/puzzle">puzzle games</Link> and <Link href="/category/sports">sports games</Link>, alongside adventure, arcade, casual, multiplayer and other browser-game categories.</p>

      <h3>Find games faster</h3>
      <p>Use <Link href="/search">Search</Link> when you already know the type of game you want, browse <Link href="/guides">Gaming Guides</Link> when you want help choosing a play style, or browse the <Link href="/games">All Games directory</Link> when you want a complete crawlable list. MADGAMES.FUN also includes <Link href="/recent">Recent</Link> and <Link href="/favorites">Favorites</Link> areas to make returning to games easier. Each game page includes its category, gameplay information, basic controls when available, device-support details and links to related games.</p>

      <h3>Browser gaming on mobile and desktop</h3>
      <p>Games in the catalog can support mobile browsers, desktop browsers or both. Compatibility depends on the individual game, so the relevant game page is the best place to confirm device support. The site itself is designed to be responsive across common screen sizes, allowing the catalog and navigation to adapt between desktop, tablet and mobile layouts.</p>

      <h3>How games appear on MADGAMES.FUN</h3>
      <p>Games may be embedded from distribution partners or added manually when there is permission to publish them. Game names, artwork and brands remain the property of their respective owners. If you are a rights holder or publisher, visit the <Link href="/copyright">Copyright</Link>, <Link href="/game-publishers">Game Publishers</Link> or <Link href="/contact">Contact</Link> pages for the site&apos;s relevant information and request paths.</p>

      <p><strong>Site guide updated:</strong> <time dateTime={`${currentYear}`}>{currentYear}</time>. Catalog content may change as games are added, updated or removed.</p>
    </section>

    <section className="contentCard" aria-labelledby="game-faq">
      <p className="tinyLabel">QUICK ANSWERS</p>
      <h2 id="game-faq">Free online games FAQ</h2>
      {faqs.map(item=><div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}
    </section>
  </div>;
}
