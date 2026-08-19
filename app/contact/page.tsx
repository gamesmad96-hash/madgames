import type {Metadata} from 'next';
import Link from 'next/link';
import {InfoPage} from '@/components/InfoPage';

export const metadata:Metadata={
  title:'Contact MADGAMES.FUN',
  description:'Find the right MADGAMES.FUN contact route for game problems, rights and removal requests, publisher inquiries, privacy and site information.',
  alternates:{canonical:'/contact'}
};

export default function Page(){return <InfoPage eyebrow="CONTACT" title="Contact MADGAMES.FUN">
  <p>Use the route below that best matches your request. MADGAMES.FUN does not publish an unverified support email, phone number or business address on this page.</p>
  <h2>Report a game problem</h2>
  <p>If a title does not load, has broken controls, incorrect artwork or another game-specific issue, open that game page and select <strong>Report a problem with this game</strong>. You can also open the <Link href="/report-game">game report page</Link>.</p>
  <h2>Copyright or removal request</h2>
  <p>If you are a developer, publisher or rights holder and believe a game or asset should not appear on MADGAMES.FUN, review the required information on <Link href="/copyright">Copyright & removals</Link>.</p>
  <h2>Game publisher or distribution inquiry</h2>
  <p>For game-feed and distribution information, see the <Link href="/game-publishers">Game Publishers</Link> page. The site is designed for licensed HTML5/WebGL feeds and direct integrations where publishing permission exists.</p>
  <h2>Privacy and site policies</h2>
  <p>For site-level information, review <Link href="/privacy">Privacy</Link>, <Link href="/terms">Terms</Link> and <Link href="/about">About MADGAMES.FUN</Link>.</p>
</InfoPage>}
