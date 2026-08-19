import type {Metadata} from 'next';
import Link from 'next/link';
import {InfoPage} from '@/components/InfoPage';

export const metadata:Metadata={
  title:'Game Publishers & Distribution — MADGAMES.FUN',
  description:'Learn how MADGAMES.FUN handles licensed HTML5/WebGL game feeds, publisher integrations, catalog metadata and rights requests.',
  alternates:{canonical:'/game-publishers'}
};

export default function Page(){return <InfoPage eyebrow="PUBLISHERS" title="Game publishers & distribution">
  <p>MADGAMES.FUN is built to support licensed HTML5/WebGL game distribution feeds and direct iframe integrations where publishing permission exists.</p>
  <h2>Supported publishing approach</h2>
  <p>Provider feeds should come from an official publisher dashboard, feed endpoint or documented integration. Game records can include title, category, description, thumbnail, provider information, controls, device compatibility and the provider game URL needed for browser play.</p>
  <h2>What MADGAMES.FUN does not do</h2>
  <p>The site does not intentionally scrape or rehost third-party game files unless the relevant license explicitly allows that use. Third-party game names, artwork and brands remain the property of their respective owners.</p>
  <h2>Catalog quality</h2>
  <p>Game and category pages are structured to make discovery clearer for players and to give search engines and AI systems understandable information about the title, category, controls, device support and related games.</p>
  <h2>Rights and removal requests</h2>
  <p>If you are a rights holder and need a listing reviewed or removed, use <Link href="/copyright">Copyright & removals</Link>. For game-specific technical problems, use the <Link href="/report-game">report flow</Link>.</p>
</InfoPage>}
