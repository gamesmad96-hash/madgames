import type {Metadata,Viewport} from 'next';
import Script from 'next/script';
import './globals.css';
import {Header} from '@/components/Header';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');
const gaId=process.env.NEXT_PUBLIC_GA_ID||'G-HN1N7QYK77';
const defaultTitle='Free Online Browser Games — Play Instantly | MADGAMES.FUN';
const defaultDescription='Play free online browser games instantly on MADGAMES.FUN. Discover action, racing, puzzle, sports and more—no downloads, no installs, no waiting.';

export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  applicationName:'MADGAMES.FUN',
  title:{default:defaultTitle,template:'%s | MADGAMES.FUN'},
  description:defaultDescription,
  keywords:['free online games','browser games','play games online','action games','racing games','puzzle games','sports games'],
  alternates:{canonical:'/'},
  manifest:'/manifest.webmanifest',
  robots:{
    index:true,
    follow:true,
    googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}
  },
  openGraph:{
    siteName:'MADGAMES.FUN',
    type:'website',
    url:'/',
    title:defaultTitle,
    description:defaultDescription
  },
  twitter:{card:'summary_large_image',title:defaultTitle,description:defaultDescription}
};

export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#090b10'};

export default function RootLayout({children}:{children:React.ReactNode}){
  const identityLd={
    '@context':'https://schema.org',
    '@graph':[
      {
        '@type':'Organization',
        '@id':`${siteUrl}/#organization`,
        name:'MADGAMES.FUN',
        url:siteUrl,
        description:'MADGAMES.FUN is a free online browser gaming site for discovering and playing games without downloads.'
      },
      {
        '@type':'WebSite',
        '@id':`${siteUrl}/#website`,
        name:'MADGAMES.FUN',
        alternateName:'Mad Games',
        url:siteUrl,
        description:defaultDescription,
        publisher:{'@id':`${siteUrl}/#organization`},
        inLanguage:'en'
      }
    ]
  };
  return <html lang="en"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(identityLd)}}/>
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
    <footer className="footer"><div><strong>MADGAMES.FUN</strong><p>Free online browser games with instant play and no downloads.</p></div><div className="footerLinks"><a href="/">Games</a><a href="/search">Search</a><a href="/favorites">Favorites</a><a href="/about">About</a><a href="/contact">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/copyright">Copyright</a></div></footer>
  </body></html>
}
