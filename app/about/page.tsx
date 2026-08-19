import type {Metadata} from 'next';
import Link from 'next/link';
import {InfoPage} from '@/components/InfoPage';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

export const metadata:Metadata={
  title:'About MADGAMES.FUN — Free Browser Games',
  description:'Learn how MADGAMES.FUN organizes free browser games, handles game listings, supports discovery, and provides rights and publisher information.',
  alternates:{canonical:'/about'}
};

export default function Page(){
  const aboutLd={
    '@context':'https://schema.org',
    '@type':'AboutPage',
    '@id':`${siteUrl}/about#about`,
    url:`${siteUrl}/about`,
    name:'About MADGAMES.FUN',
    description:'Information about MADGAMES.FUN, its browser-game catalog, discovery experience and publishing approach.',
    isPartOf:{'@id':`${siteUrl}/#website`},
    about:{'@id':`${siteUrl}/#organization`},
    inLanguage:'en'
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(aboutLd)}}/>
    <InfoPage eyebrow="ABOUT" title="About MADGAMES.FUN">
      <p>MADGAMES.FUN is a free online games platform focused on fast game discovery and browser-based play. The site organizes games into clear categories, gives each title its own information page, and helps players move between related games without requiring a separate game download for normal supported browser play.</p>
      <h2>What you can find here</h2>
      <p>The catalog includes categories such as <Link href="/category/action">Action</Link>, <Link href="/category/adventure">Adventure</Link>, <Link href="/category/casual">Casual</Link>, <Link href="/category/racing">Racing</Link>, <Link href="/category/puzzle">Puzzle</Link>, <Link href="/category/sports">Sports</Link>, Arcade, Board, Multiplayer, Shooting and 2 Player games. Availability changes as titles are added, updated or removed.</p>
      <h2>How game information is organized</h2>
      <p>Category pages explain the type of games they contain and link to individual game pages. Game pages can include a gameplay description, controls when available, provider information, mobile and desktop support, related games, and a route for reporting a problem.</p>
      <h2>How games are provided</h2>
      <p>Games can be embedded from licensed distribution partners or added manually when there is permission to publish them. MADGAMES.FUN does not claim ownership of third-party game names, artwork or brands. Those remain the property of their respective owners.</p>
      <h2>Editorial and catalog approach</h2>
      <p>Site copy is written to describe what a category or game page contains in clear language. Catalog information is maintained as entries are added or updated, and pages are structured so players, search engines and AI systems can understand the relationship between categories, titles, gameplay details and site policies.</p>
      <h2>Trust, rights and publisher information</h2>
      <p>Rights holders can review the <Link href="/copyright">Copyright & removals</Link> page, game publishers can review <Link href="/game-publishers">Game Publishers</Link>, and site policies are available through <Link href="/privacy">Privacy</Link> and <Link href="/terms">Terms</Link>. For issue routing, visit <Link href="/contact">Contact</Link>.</p>
    </InfoPage>
  </>;
}
