import { prisma } from '@/lib/db';
import AdSlot from '@/components/AdSlot';
import Sidebar from '@/components/Sidebar';
import { notFound } from 'next/navigation';
import { Clock, User, Calendar, ChevronRight } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true, category: true, tags: true }
  });

  if (!post) notFound();

  // Simple in-article ad injection logic
  const contentParts = post.content.split('<!-- ADSENSE_IN_ARTICLE -->');

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      {/* Breadcrumbs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b', marginBottom: '2rem' }}>
        <a href="/">Home</a> <ChevronRight size={14} />
        <a href={`/category/${post.category.slug}`}>{post.category.name}</a> <ChevronRight size={14} />
        <span style={{ color: '#0f172a', fontWeight: 600 }}>{post.title}</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) 1fr', gap: '4rem' }}>
        <article>
          <header style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>{post.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', borderY: '1px solid #f1f5f9', padding: '1rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={post.author.avatar} alt={post.author.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{post.author.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Editorial Lead</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={16} /> {new Date(post.createdAt).toLocaleDateString()}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={16} /> {post.readingTime} min read</div>
              </div>
            </div>
          </header>

          <AdSlot type="banner" id="article-top" />

          <div className="prose" style={{ fontSize: '1.25rem', lineHeight: 1.8 }}>
             {contentParts[0] && <div dangerouslySetInnerHTML={{ __html: contentParts[0] }} />}
             <AdSlot type="in-article" id="article-mid" />
             {contentParts[1] && <div dangerouslySetInnerHTML={{ __html: contentParts[1] }} />}
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {post.tags.map(tag => (
                <span key={tag.id} style={{ background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.875rem', color: '#475569' }}>#{tag.name}</span>
              ))}
            </div>
          </div>
        </article>

        <aside>
          <Sidebar />
        </aside>
      </div>

      <AdSlot type="footer" id="article-footer" />
    </div>
  );
}
