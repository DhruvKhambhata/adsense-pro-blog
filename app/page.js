import { prisma } from '@/lib/prisma-db';
import PostCard from '@/components/PostCard';
import AdSlot from '@/components/AdSlot';
import HeroGrid from '@/components/HeroGrid';
import Sidebar from '@/components/Sidebar';
import { syncIntelligenceAction } from '@/lib/actions';
import SyncButton from '@/components/SyncButton';

export default async function Home() {
  const allPosts = await prisma.post.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  const featuredPost = allPosts[0];
  const secondaryPosts = allPosts.slice(1, 4);
  const remainingPosts = allPosts.slice(4);

  async function handleSync() {
    'use server';
    await syncIntelligenceAction();
  }

  return (
    <div style={{ background: 'var(--muted)', minHeight: '100vh', paddingTop: '2rem' }}>
      <div className="container">
        <AdSlot type="banner" id="home-top-ad" />
        
        {allPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '10rem 0', background: 'white', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 900 }}>NO INTELLIGENCE DETECTED</h1>
            <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.2rem' }}>Our systems are ready to synchronize with the latest AI and IT market news.</p>
            <form action={handleSync}>
              <SyncButton />
            </form>
          </div>
        ) : (
          <>
            {/* Main News Section */}
            <HeroGrid featuredPost={featuredPost} secondaryPosts={secondaryPosts} />

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '3rem', marginTop: '4rem' }}>
              {/* Main Feed */}
              <div>
                <div className="section-title">
                  <h2>Top Intelligence</h2>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                  {remainingPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>

                <div style={{ marginTop: '4rem' }}>
                  <AdSlot type="banner" id="home-mid-ad" />
                </div>
              </div>

              {/* Sidebar */}
              <Sidebar />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
