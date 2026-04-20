import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

export default function PostCard({ post, horizontal = false }) {
  return (
    <div style={{
      display: horizontal ? 'flex' : 'block',
      gap: '2rem',
      background: '#fff',
      border: '1px solid #f1f5f9',
      borderRadius: '1.25rem',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }} className="post-card">
      <div style={{ 
        width: horizontal ? '40%' : '100%', 
        aspectRatio: '16/9', 
        overflow: 'hidden',
        background: '#f1f5f9'
      }}>
        <img 
          src={post.featuredImage || `https://api.dicebear.com/7.x/shapes/svg?seed=${post.slug}`} 
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ 
            background: '#eff6ff', 
            color: '#3b82f6', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '2rem', 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            textTransform: 'uppercase' 
          }}>
            {post.category?.name}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#94a3b8' }}>
            <Clock size={14} />
            {post.readingTime} min read
          </div>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.3 }}>
          <Link href={`/blog/${post.slug}`} style={{ color: '#0f172a' }}>{post.title}</Link>
        </h3>
        
        <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
          {post.excerpt}
        </p>

        <Link href={`/blog/${post.slug}`} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: '#3b82f6', 
          fontWeight: 700, 
          fontSize: '0.875rem' 
        }}>
          READ ARTICLE <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
