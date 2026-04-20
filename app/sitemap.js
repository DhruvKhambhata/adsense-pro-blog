import { prisma } from '@/lib/db';

export default async function sitemap() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true }
  });

  const pages = await prisma.page.findMany({
    select: { slug: true, updatedAt: true }
  });

  const blogPosts = posts.map((post) => ({
    url: `http://localhost:3000/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  const staticPages = pages.map((page) => ({
    url: `http://localhost:3000/${page.slug}`,
    lastModified: page.updatedAt,
  }));

  return [
    {
      url: 'http://localhost:3000',
      lastModified: new Date(),
    },
    {
      url: 'http://localhost:3000/blog',
      lastModified: new Date(),
    },
    ...blogPosts,
    ...staticPages,
  ];
}
