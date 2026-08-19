import type {Metadata} from 'next';
import {InfoPage} from '@/components/InfoPage';

const description='Learn how MADGAMES.FUN helps players discover and instantly play free browser games, and how games are sourced from licensed publishers and partners.';

export const metadata:Metadata={
  title:'About MADGAMES.FUN',
  description,
  alternates:{canonical:'/about'},
  openGraph:{title:'About MADGAMES.FUN',description,url:'/about'}
};

export default function Page(){return <InfoPage eyebrow="ABOUT" title="MADGAMES.FUN"><p>MADGAMES.FUN is a browser-games portal focused on fast discovery and instant play. We do not require downloads for normal gameplay.</p><h2>How games are provided</h2><p>Games can be embedded from licensed distribution partners or added manually when we have permission to publish them. Each game and brand remains the property of its respective owner.</p></InfoPage>}
