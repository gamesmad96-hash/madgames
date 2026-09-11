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
        disallow:['/admin/','/api/','/search?']
      }
    ],
    sitemap:`${base}/sitemap.xml`,
    host:base
  };
}
