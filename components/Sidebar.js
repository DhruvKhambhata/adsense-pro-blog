import { prisma } from '@/lib/db-prod';
import AdSlot from './AdSlot';
import Link from 'next/link';

export default async function Sidebar() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { posts: true } } }
  });

  const recent = await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { title: true, slug: true }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <section>
        <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem', borderBottom: '2px solid #3b82f6', display: 'inline-block' }}>Categories</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {categories.map(cat => (
            <Link key={cat.id} href={`/category/${cat.slug}`} style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.925rem' }}>
              <span>{cat.name}</span>
              <span style={{ color: '#94a3b8' }}>({cat._count.posts})</span>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot type="sidebar" id="sidebar-sticky" />

      <section>
        <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem', borderBottom: '2px solid #3b82f6', display: 'inline-block' }}>Latest Posts</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recent.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.925rem', lineHeight: 1.4 }}>
              {post.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
