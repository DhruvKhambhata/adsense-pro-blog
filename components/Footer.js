import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#020617', color: 'white', padding: '5rem 0 2rem', marginTop: '6rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--accent)', color: 'white', padding: '0.5rem', fontWeight: 900, borderRadius: '4px', fontSize: '1.5rem' }}>PE</div>
              <span style={{ fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em' }}>PulseEdge Intelligence</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '400px' }}>
              The definitive resource for IT market shifts and AI evolution. Providing institutional-grade reporting for tech professionals and decision-makers.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Intelligence</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.9rem' }}>
              <Link href="/" style={{ color: '#94a3b8' }}>Market Analysis</Link>
              <Link href="/" style={{ color: '#94a3b8' }}>Workforce Shifts</Link>
              <Link href="/" style={{ color: '#94a3b8' }}>AI Policy</Link>
              <Link href="/" style={{ color: '#94a3b8' }}>Hardware Tech</Link>
              <Link href="/" style={{ color: '#94a3b8' }}>Software Economy</Link>
            </nav>
          </div>

          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Global Governance</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.9rem' }}>
              <Link href="/about" style={{ color: '#94a3b8' }}>Editorial Standards</Link>
              <Link href="/" style={{ color: '#94a3b8' }}>Correction Policy</Link>
              <Link href="/privacy-policy" style={{ color: '#94a3b8' }}>Privacy Infrastructure</Link>
              <Link href="/terms" style={{ color: '#94a3b8' }}>Terms of Service</Link>
              <Link href="/" style={{ color: '#94a3b8' }}>Advertise with PulseEdge</Link>
            </nav>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748b' }}>
          <div>&copy; {new Date().getFullYear()} PulseEdge Intelligence Network. Part of the FutureTech Media Group.</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span>TWITTER</span>
            <span>LINKEDIN</span>
            <span>RSS FEED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
