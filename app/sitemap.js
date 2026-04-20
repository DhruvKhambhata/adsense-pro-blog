import { prisma } from '@/lib/database';

export default async function sitemap() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true }
    });

    const pages = await prisma.page.findMany({
      select: { slug: true, updatedAt: true }
    });

    const blogPosts = posts.map((post) => ({
      url: `https://dhruvblog.com/blog/${post.slug}`, // Replace with your final domain later
      lastModified: post.updatedAt,
    }));

    const staticPages = pages.map((page) => ({
      url: `https://dhruvblog.com/${page.slug}`,
      lastModified: page.updatedAt,
    }));

    return [
      { url: 'https://dhruvblog.com', lastModified: new Date() },
      { url: 'https://dhruvblog.com/blog', lastModified: new Date() },
      ...blogPosts,
      ...staticPages,
    ];
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    // Return a minimal sitemap if DB is not available during build
    return [
      { url: 'https://dhruvblog.com', lastModified: new Date() },
    ];
  }
}
