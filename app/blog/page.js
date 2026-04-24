import { prisma } from '@/lib/prisma-db';
import PostCard from '@/components/PostCard';
import AdSlot from '@/components/AdSlot';

export default async function BlogListing({ searchParams }) {
  const { q } = await searchParams;
  
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      OR: q ? [
        { title: { contains: q } },
        { excerpt: { contains: q } }
      ] : undefined
    },
    include: { category: true, author: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container">
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Enterprise Intelligence</h1>
        <p style={{ color: '#64748b', fontSize: '1.25rem' }}>Exploring the frontiers of technology and strategy.</p>
      </header>

      <AdSlot type="banner" id="listing-header" />

      {q && (
        <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f1f5f9', borderRadius: '0.5rem' }}>
          Search results for: <strong>{q}</strong>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
          <h3>No articles found.</h3>
          <p>Try searching for different keywords.</p>
        </div>
      )}

      <AdSlot type="footer" id="listing-footer" />
    </div>
  );
}
