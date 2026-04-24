import { prisma } from '@/lib/prisma-db';
import PostCard from '@/components/PostCard';
import AdSlot from '@/components/AdSlot';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: 'Category Not Found' };
  return {
    title: `${category.name} | PulseEdge Intelligence`,
    description: category.description || `Browse all articles in the ${category.name} intelligence sector.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      _count: { select: { posts: true } }
    }
  });

  if (!category) notFound();

  const posts = await prisma.post.findMany({
    where: {
      category: { slug },
      published: true
    },
    include: { category: true, author: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container">
      <header style={{ marginBottom: '4rem' }}>
        <span style={{ color: 'var(--accent)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Sector Analysis</span>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem' }}>{category.name}</h1>
        <p style={{ color: '#64748b', fontSize: '1.25rem', maxWidth: '700px' }}>{category.description}</p>
        <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          <strong>{category._count.posts}</strong> Intel Files Found
        </div>
      </header>

      <AdSlot type="banner" id="category-top" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #e2e8f0' }}>
          <h3>No intelligence reports in this sector yet.</h3>
          <p>Our analysts are currently working on new dossiers.</p>
        </div>
      )}

      <AdSlot type="footer" id="category-footer" />
    </div>
  );
}
