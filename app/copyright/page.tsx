import type {Metadata} from 'next';
import Link from 'next/link';
import {InfoPage} from '@/components/InfoPage';

export const metadata:Metadata={
  title:'Copyright & Game Removal Requests — MADGAMES.FUN',
  description:'Information for developers, publishers and rights holders who need to report or request review of a game or asset on MADGAMES.FUN.',
  alternates:{canonical:'/copyright'}
};

export default function Page(){return <InfoPage eyebrow="RIGHTS" title="Copyright & removals">
  <p>MADGAMES.FUN respects game developers, publishers and rights holders. If you believe a game, image or other asset should not appear on the site, provide enough information for the listing and rights claim to be reviewed accurately.</p>
  <h2>Information to include</h2>
  <p>Include the affected MADGAMES.FUN game URL or title, the material you believe is affected, the reason for the request, your relationship to the rights holder, and sufficient contact information for follow-up.</p>
  <h2>Game-specific reports</h2>
  <p>For a loading problem, broken controls, incorrect thumbnail or another title-specific issue, use the <Link href="/report-game">game report flow</Link> or the report link shown on the individual game page.</p>
  <h2>Review and removal</h2>
  <p>Administrators can disable or remove a reported game from the catalog while a legitimate request is reviewed. Third-party game files and services may also be controlled by the original provider.</p>
  <h2>Publisher information</h2>
  <p>If you want to discuss authorized distribution rather than removal, review the <Link href="/game-publishers">Game Publishers</Link> page.</p>
</InfoPage>}
