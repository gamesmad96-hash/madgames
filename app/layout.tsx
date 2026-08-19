import type {Metadata,Viewport} from 'next';
import './globals.css';
import {Header} from '@/components/Header';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');

export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  applicationName:'MADGAMES.FUN',
  title:{default:'MADGAMES.FUN — Play Free Online Games',template:'%s | MADGAMES.FUN'},
  description:'Play free online browser games instantly. No downloads, no waiting.',
  alternates:{canonical:'/'},
  manifest:'/manifest.webmanifest',
  robots:{index:true,follow:true},
  openGraph:{siteName:'MADGAMES.FUN',type:'website',url:'/'},
  twitter:{card:'summary_large_image'}
};

export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#090b10'};

export default function RootLayout({children}:{children:React.ReactNode}){
  const websiteLd={
    '@context':'https://schema.org',
    '@type':'WebSite',
    name:'MADGAMES.FUN',
    alternateName:'Mad Games',
    url:siteUrl
  };
  return <html lang="en"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteLd)}}/>
    <Header/>
    <main className="appMain">{children}</main>
    <footer className="footer"><div><strong>MADGAMES.FUN</strong><p>Play free online games. No downloads.</p></div><div className="footerLinks"><a href="/">Games</a><a href="/search">Search</a><a href="/favorites">Favorites</a><a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/copyright">Copyright</a></div></footer>
  </body></html>
}
