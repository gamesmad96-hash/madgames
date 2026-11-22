import type {MetadataRoute} from 'next';

export default function robots():MetadataRoute.Robots{
  const base=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.madgames.fun').replace(/\/$/,'');
  return{
    rules:[
      {
        userAgent:'Mediapartners-Google',
        allow:'/'
      },
      {
        userAgent:'Google-Display-Ads-Bot',
        allow:'/'
      },
      {
        userAgent:'*',
        allow:'/',
        // /roblox/game and /roblox/category are auto-generated from Roblox data and were
        // being crawled by bots by the tens of thousands (fake traffic, 0s engagement).
        disallow:['/admin/','/api/','/search?','/roblox/game/','/roblox/category/']
      }
    ],
    sitemap:`${base}/sitemap.xml`,
    host:base
  };
}
