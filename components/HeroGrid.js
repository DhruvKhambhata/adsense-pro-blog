import Link from 'next/link';

export default function HeroGrid({ featuredPost, secondaryPosts = [] }) {
  if (!featuredPost) return null;

  return (
    <section className="hero-grid">
      {/* Principal Intelligence */}
      <div className="hero-main">
        <Link href={`/blog/${featuredPost.slug}`}>
          <img 
            src={featuredPost.featuredImage || `https://api.dicebear.com/7.x/shapes/svg?seed=${featuredPost.slug}`} 
            alt={featuredPost.title}
          />
          <div className="hero-overlay">
            <span className="badge" style={{ marginBottom: '1.25rem', background: 'var(--accent)' }}>Top Intelligence</span>
            <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem', lineHeight: 1 }}>{featuredPost.title}</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', fontWeight: 500 }}>{featuredPost.excerpt}</p>
          </div>
        </Link>
      </div>

      {/* Breaking Intelligence Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {secondaryPosts.slice(0, 2).map((post) => (
          <div key={post.id} className="hero-secondary" style={{ flex: 1 }}>
            <Link href={`/blog/${post.slug}`}>
              <img 
                src={post.featuredImage || `https://api.dicebear.com/7.x/shapes/svg?seed=${post.slug}`} 
                alt={post.title}
              />
              <div className="hero-overlay" style={{ padding: '1.5rem' }}>
                <span className="badge" style={{ marginBottom: '0.75rem', background: 'var(--news-red)', fontSize: '0.6rem' }}>Breaking</span>
                <h3 style={{ color: 'white', fontSize: '1.4rem', lineHeight: 1.1 }}>{post.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
