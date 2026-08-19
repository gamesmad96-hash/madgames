import type {Metadata} from 'next';
import {InfoPage} from '@/components/InfoPage';

export const metadata:Metadata={
  title:'Privacy Policy — MADGAMES.FUN',
  description:'Read how MADGAMES.FUN handles site functionality, local browser storage, analytics configuration and third-party game providers.',
  alternates:{canonical:'/privacy'}
};

export default function Page(){return <InfoPage eyebrow="LEGAL" title="Privacy Policy">
  <p>MADGAMES.FUN may process basic technical information required to deliver the website, measure site and game usage, remember local preferences, and protect the service from abuse.</p>
  <h2>Local browser storage</h2>
  <p>Favorites and recently played games are stored locally in the browser on the device unless a future account-sync feature explicitly changes that behavior.</p>
  <h2>Analytics</h2>
  <p>Site analytics may be used to understand page visits and engagement when the relevant analytics configuration is enabled. Analytics configuration can change over time, so this policy should remain aligned with the services actually active on the site.</p>
  <h2>Advertising and third-party games</h2>
  <p>Games can be supplied by third-party distribution providers. Those providers may operate their own services, embeds, analytics, advertising or privacy practices. Their processing is governed by their own policies and agreements.</p>
  <h2>Changes to site functionality</h2>
  <p>If MADGAMES.FUN adds accounts, new analytics tools, advertising systems or other data-processing features, this page should be updated so it continues to describe the live site accurately.</p>
</InfoPage>}
