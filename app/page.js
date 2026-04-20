import { prisma } from '@/lib/database';
import PostCard from '@/components/PostCard';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';

export default async function Home() {
  const featuredPost = await prisma.post.findFirst({
    where: { featured: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  const recentPosts = await prisma.post.findMany({
    where: { published: true, NOT: { id: featuredPost?.id } },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 6
  });

  return (
    <div className="container">
      <AdSlot type="banner" id="top-banner" />

      {featuredPost && (
        <section style={{ marginBottom: '4rem' }}>
          <PostCard post={featuredPost} horizontal={true} />
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) 1fr', gap: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderLeft: '4px solid #3b82f6', paddingLeft: '1.5rem' }}>
            Latest Intelligence
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {recentPosts.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        </div>

        <aside>
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
              <h3>Subscribe</h3>
              <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 1.5rem', color: '#64748b' }}>Get the Weekly Edge newsletter delivered to your inbox.</p>
              <input type="text" placeholder="Email address" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', marginBottom: '1rem' }} />
              <button className="btn btn-primary" style={{ width: '100%' }}>Join 15k+ Readers</button>
            </div>
            <AdSlot type="sidebar" id="sidebar-home" />
          </div>
        </aside>
      </div>

      <AdSlot type="footer" id="footer-banner" />
    </div>
  );
}
