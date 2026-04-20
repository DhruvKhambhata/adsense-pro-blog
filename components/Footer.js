import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '4rem 0', marginTop: '4rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>FUTUREEDGE</h3>
            <p style={{ color: '#64748b' }}>Independent reporting on the technologies shaping our tomorrow. From AI ethics to quantum leaps.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Governance</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link href="/about" className="nav-link">About Us</Link>
              <Link href="/contact" className="nav-link">Contact Us</Link>
              <Link href="/privacy-policy" className="nav-link">Privacy Policy</Link>
              <Link href="/terms" className="nav-link">Terms of Service</Link>
              <Link href="/disclaimer" className="nav-link">Editorial Disclaimer</Link>
            </nav>
          </div>
        </div>
        <div style={{ textAlign: 'center', borderTop: '1px solid #cbd5e1', paddingTop: '2rem', fontSize: '0.875rem', color: '#94a3b8' }}>
          &copy; {new Date().getFullYear()} FutureEdge Insights. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
