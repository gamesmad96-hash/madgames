import type {Metadata} from 'next';
import {InfoPage} from '@/components/InfoPage';

const description='Contact MADGAMES.FUN for general questions, partnerships, game submissions, publisher requests and copyright or rights-related issues.';

export const metadata:Metadata={
  title:'Contact MADGAMES.FUN',
  description,
  alternates:{canonical:'/contact'},
  openGraph:{title:'Contact MADGAMES.FUN',description,url:'/contact'}
};

export default function Page(){return <InfoPage eyebrow="CONTACT" title="Contact"><p>For general questions, partnerships, game submissions, or rights requests, contact the site operator using the email address configured for MADGAMES.FUN.</p><p>Before launch, replace this text with your official support email in the site settings or this page.</p></InfoPage>}
