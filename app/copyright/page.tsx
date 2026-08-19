import type {Metadata} from 'next';
import {InfoPage} from '@/components/InfoPage';

const description='Copyright and removal information for MADGAMES.FUN, including how developers, publishers and rights holders can report games or assets.';

export const metadata:Metadata={
  title:'Copyright & Game Removal Requests',
  description,
  alternates:{canonical:'/copyright'},
  openGraph:{title:'Copyright & Game Removal Requests | MADGAMES.FUN',description,url:'/copyright'}
};

export default function Page(){return <InfoPage eyebrow="RIGHTS" title="Copyright & removals"><p>We respect game developers, publishers, and rights holders. If you believe a game or asset should not appear on MADGAMES.FUN, submit a report with the game URL, the reason for the request, and sufficient contact information.</p><p>Administrators can disable a reported game from the catalogue while the request is reviewed.</p></InfoPage>}
