import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <Link href={`/blog/${post.slug}`}>
        <div className="post-card-img-wrap">
          <img 
            src={post.featuredImage || `https://api.dicebear.com/7.x/shapes/svg?seed=${post.slug}`} 
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </Link>
      
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {post.category?.name}
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--secondary)', fontWeight: 600 }}>
            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.75rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          <Link href={`/blog/${post.slug}`} style={{ color: 'var(--primary)' }}>{post.title}</Link>
        </h3>
        
        <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.excerpt}
        </p>

        <Link href={`/blog/${post.slug}`} style={{ 
          fontSize: '0.75rem', 
          fontWeight: 800, 
          color: 'var(--primary)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          borderBottom: '2px solid var(--accent)',
          paddingBottom: '2px',
          display: 'inline-block'
        }}>
          Full Intel
        </Link>
      </div>
    </div>
  );
}
