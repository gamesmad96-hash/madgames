import type {Metadata} from 'next';
import {InfoPage} from '@/components/InfoPage';

const description='Read the MADGAMES.FUN terms of use for lawful gameplay, third-party game availability, provider restrictions and acceptable use of the service.';

export const metadata:Metadata={
  title:'Terms of Use',
  description,
  alternates:{canonical:'/terms'},
  openGraph:{title:'Terms of Use | MADGAMES.FUN',description,url:'/terms'}
};

export default function Page(){return <InfoPage eyebrow="LEGAL" title="Terms"><p>Use MADGAMES.FUN for lawful entertainment. Do not attempt to disrupt the service, bypass provider restrictions, or misuse games, accounts, or infrastructure.</p><p>Third-party games are supplied under their respective licenses and terms. Availability may change without notice.</p><p>These starter terms are not legal advice and should be reviewed for your actual business before launch.</p></InfoPage>}
