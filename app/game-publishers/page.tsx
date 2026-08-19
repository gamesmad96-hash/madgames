import type {Metadata} from 'next';
import {InfoPage} from '@/components/InfoPage';

const description='Information for HTML5 and WebGL game publishers interested in licensed distribution, direct integrations and game submissions on MADGAMES.FUN.';

export const metadata:Metadata={
  title:'Game Publishers & Distribution',
  description,
  alternates:{canonical:'/game-publishers'},
  openGraph:{title:'Game Publishers & Distribution | MADGAMES.FUN',description,url:'/game-publishers'}
};

export default function Page(){return <InfoPage eyebrow="PUBLISHERS" title="Game publishers"><p>MADGAMES.FUN is built to support licensed HTML5/WebGL game distribution feeds and direct iframe integrations. Provider-specific feeds should come from the official publisher dashboard or documentation.</p><p>We do not scrape or rehost game files unless the relevant license explicitly allows it.</p></InfoPage>}
