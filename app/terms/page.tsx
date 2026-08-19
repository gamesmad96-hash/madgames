import type {Metadata} from 'next';
import {InfoPage} from '@/components/InfoPage';

export const metadata:Metadata={
  title:'Terms of Use — MADGAMES.FUN',
  description:'Read the MADGAMES.FUN terms for lawful site use, third-party game availability, provider restrictions and service changes.',
  alternates:{canonical:'/terms'}
};

export default function Page(){return <InfoPage eyebrow="LEGAL" title="Terms of Use">
  <p>Use MADGAMES.FUN for lawful entertainment and game discovery. Do not attempt to disrupt the service, bypass technical or provider restrictions, misuse infrastructure, or interfere with other users.</p>
  <h2>Third-party games</h2>
  <p>Games can be supplied by third-party publishers or distribution providers under their respective licenses, availability rules and technical requirements. A game may be updated, replaced, restricted or removed without notice.</p>
  <h2>Game ownership</h2>
  <p>Third-party game names, artwork, brands and related intellectual property remain the property of their respective owners. Listing a game on MADGAMES.FUN does not transfer ownership of that content.</p>
  <h2>Availability and compatibility</h2>
  <p>Browser, mobile and desktop support can vary by game and provider. MADGAMES.FUN may display compatibility information from the catalog, but actual operation can also depend on the player device, browser, network and provider service.</p>
  <h2>Service changes</h2>
  <p>The site, catalog, navigation and integrations may change as games are added or removed and platform features are improved.</p>
</InfoPage>}
