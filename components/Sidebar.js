import { prisma } from '@/lib/prisma-db';
import AdSlot from './AdSlot';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default async function Sidebar() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { posts: true } } }
  });

  const recent = await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { title: true, slug: true }
  });

  const marketWire = [
    { time: '10:42 AM', title: 'Google Gemini 2.0 Benchmarks peak', trend: '+12%' },
    { time: '09:15 AM', title: 'Tech Hiring in Austin Surges', trend: '+8%' },
    { time: '08:00 AM', title: 'OpenAI Enterprise Revenue hits $2B', trend: '+15%' },
    { time: '07:30 AM', title: 'EU AI Act Compliance Deadlines set', trend: 'Focus' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <section style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <TrendingUp size={20} color="#ef4444" />
          <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Market Wire</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {marketWire.map((item, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.time}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6' }}>{item.trend}</span>
              </div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>{item.title}</p>
            </div>
          ))}
        </div>
      </section>

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
