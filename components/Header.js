import Link from 'next/link';
import { prisma } from '@/lib/prisma-db';

export default async function Header() {
  const categories = await prisma.category.findMany({
    take: 5
  });

  return (
    <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--background)', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top Ticker */}
      <div className="news-ticker">
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: '100%', position: 'relative' }}>
          <div className="animate-pulse" style={{ 
            background: 'var(--news-red)', 
            padding: '0.4rem 0.75rem', 
            marginRight: '1rem', 
            fontSize: '0.7rem',
            fontWeight: 900,
            zIndex: 10,
            position: 'relative',
            boxShadow: '4px 0 10px rgba(0,0,0,0.5)'
          }}>
            LIVE
          </div>
          <div style={{ 
            flex: 1, 
            overflow: 'hidden', 
            position: 'relative',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}>
            <div className="ticker-content">
              2026 AI MARKET NEWS: JOB SHIFTS IN TECH SECTOR --- NVIDIA REVEALS NEW AI CHIP LINEUP --- GLOBAL IT SPENDING PROJECTED TO GROW 12% BY Q4 --- GEN AI TOOLS REACH 2B USERS GLOBALLY --- 
            </div>
          </div>
        </div>
      </div>

      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', fontWeight: 900, borderRadius: '4px', fontSize: '1.25rem' }}>PE</div>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em' }}>PulseEdge</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--secondary)' }}>
          {categories.map(cat => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className="nav-link">
              {cat.name.toUpperCase()}
            </Link>
          ))}
          {categories.length === 0 && (
             <Link href="/blog" className="nav-link">ARCHIVE</Link>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }}>LOGIN</button>
          <button style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>SUBSCRIBE</button>
        </div>
      </nav>
    </header>
  );
}
