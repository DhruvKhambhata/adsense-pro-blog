import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({
    where: { slug }
  });

  if (!page) return { title: 'Page Not Found' };

  return {
    title: page.title,
    description: `Learn more about ${page.title} on FutureEdge Insights.`,
  };
}

export default async function DynamicPage({ params }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({
    where: { slug }
  });

  if (!page) {
    notFound();
  }

  return (
    <article className="container" style={{ maxWidth: '800px', margin: '4rem auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{page.title}</h1>
      <div 
        className="prose"
        dangerouslySetInnerHTML={{ __html: page.content }} 
        style={{ lineHeight: '1.8', color: '#334155' }}
      />
    </article>
  );
}
