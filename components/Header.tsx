'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  ['◉','Home','/'],['♨','Hot','/'],['✣','New','/'],['♞','Action','/category/action'],
  ['⚔','Adventure','/category/adventure'],['♙','Casual','/category/casual'],['⚄','Racing','/category/racing'],
  ['▧','Puzzle','/category/puzzle'],['✦','Sports','/category/sports'],['⌾','Recent','/recent']
] as const;

export function Header() {
  const pathname = usePathname();
  return <>
    <aside className="sideRail" aria-label="Game categories">
      <Link href="/" className="railLogo" aria-label="MADGAMES.FUN home">M</Link>
      <nav className="railNav">
        {nav.map(([icon,label,href]) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return <Link key={label} href={href} className={`railItem ${active ? 'active' : ''}`}><span className="railIcon">{icon}</span><span>{label}</span></Link>;
        })}
      </nav>
    </aside>
    <header className="topBar">
      <Link href="/" className="brandWord">MADGAMES<span>.FUN</span></Link>
      <Link href="/search" className="topSearch" aria-label="Search games"><span>⌕</span><span className="searchHint">Search games...</span></Link>
      <div className="topActions"><Link href="/favorites" className="roundAction" aria-label="Favorites">♡</Link><Link href="/recent" className="roundAction" aria-label="Recent games">↻</Link></div>
    </header>
  </>;
}
