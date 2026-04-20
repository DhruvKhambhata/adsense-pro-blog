import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header style={{ 
      borderBottom: '1px solid #f1f5f9', 
      padding: '1.25rem 0', 
      position: 'sticky', 
      top: 0, 
      background: 'rgba(255, 255, 255, 0.8)', 
      backdropFilter: 'blur(10px)',
      zIndex: 100 
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#0f172a' }}>
          FUTURE<span style={{ color: '#3b82f6' }}>EDGE</span>
        </Link>
        
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/blog" className="nav-link">Articles</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ color: '#64748b', cursor: 'pointer' }} />
          </div>
        </nav>
      </div>
    </header>
  );
}
