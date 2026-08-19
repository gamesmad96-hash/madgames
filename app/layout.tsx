import type {Metadata,Viewport} from 'next';
import Script from 'next/script';
import './globals.css';
import {Header} from '@/components/Header';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');
const gaId=process.env.NEXT_PUBLIC_GA_ID||'G-HN1N7QYK77';
const siteDescription='Play free online browser games instantly on MADGAMES.FUN. Discover action, racing, puzzle, sports and casual games with no downloads required.';

export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  applicationName:'MADGAMES.FUN',
  title:{default:'MADGAMES.FUN — Play Free Online Games',template:'%s | MADGAMES.FUN'},
  description:siteDescription,
  keywords:['free online games','browser games','play games online','action games','racing games','puzzle games','sports games'],
  manifest:'/manifest.webmanifest',
  referrer:'origin-when-cross-origin',
  formatDetection:{telephone:false,address:false,email:false},
  robots:{
    index:true,
    follow:true,
    googleBot:{
      index:true,
      follow:true,
      'max-image-preview':'large',
      'max-snippet':-1,
      'max-video-preview':-1
    }
  },
  openGraph:{
    siteName:'MADGAMES.FUN',
    type:'website',
    locale:'en_US',
    title:'MADGAMES.FUN — Play Free Online Games',
    description:siteDescription
  },
  twitter:{
    card:'summary_large_image',
    title:'MADGAMES.FUN — Play Free Online Games',
    description:siteDescription
  }
};

export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#090b10'};

export default function RootLayout({children}:{children:React.ReactNode}){
  const websiteLd={
    '@context':'https://schema.org',
    '@type':'WebSite',
    name:'MADGAMES.FUN',
    alternateName:'Mad Games',
    url:siteUrl,
    description:siteDescription,
    inLanguage:'en'
  };
  return <html lang="en"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteLd)}}/>
    {gaId&&<>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload"/>
      <Script id="google-analytics" strategy="lazyOnload">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `}</Script>
    </>}
    <Header/>
    <main className="appMain">{children}</main>
    <footer className="footer"><div><strong>MADGAMES.FUN</strong><p>Play free online games. No downloads.</p></div><div className="footerLinks"><a href="/">Games</a><a href="/search">Search</a><a href="/favorites">Favorites</a><a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/copyright">Copyright</a></div></footer>
  </body></html>
}
