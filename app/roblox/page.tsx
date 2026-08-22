import type { Metadata } from 'next';
import { RobloxBrowser } from '../../components/RobloxBrowser';
import './roblox.css';

export const metadata: Metadata = {
  title: 'Roblox Games — Search & Play | MADGAMES.FUN',
  description: 'Browse and search Roblox experiences from MADGAMES.FUN, then launch them on the official Roblox platform.',
  alternates: { canonical: '/roblox' },
};

export default function RobloxPage() {
  return <main className="robloxPage">
    <RobloxBrowser />
  </main>;
}
