import type {Metadata} from 'next';
import {InfoPage} from '@/components/InfoPage';

const description='Learn how MADGAMES.FUN uses essential cookies, local browser storage, analytics and advertising technologies.';

export const metadata:Metadata={
  title:'Cookie Policy',
  description,
  alternates:{canonical:'/cookies'},
  openGraph:{title:'Cookie Policy | MADGAMES.FUN',description,url:'/cookies'}
};

export default function Page(){return <InfoPage eyebrow="LEGAL" title="Cookies"><p>The site can use essential cookies for secure admin sessions and local browser storage for favorites and recent games. Analytics and advertising cookies should remain disabled until configured with an appropriate consent flow where required.</p></InfoPage>}
