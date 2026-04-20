import { prisma } from '../lib/db.js';
import fetch from 'node-fetch';

async function main() {
  console.log('Connecting to Cloud Database via lib/db.js to seed articles...');
  
  // Clear existing content
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.author.deleteMany();
  await prisma.page.deleteMany();

  const author = await prisma.author.create({
    data: {
      name: 'FutureTech Editorial',
      bio: 'Insightful tech reporting from the edge of innovation.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    }
  });

  const aiCategory = await prisma.category.create({ data: { name: 'Artificial Intelligence', slug: 'ai' } });
  const careerCategory = await prisma.category.create({ data: { name: 'Tech Careers', slug: 'careers' } });

  console.log('Fetching news from DEV.to...');
  const response = await fetch('https://dev.to/api/articles?per_page=15&tag=ai');
  const articles = await response.json();

  for (const article of articles) {
    const tagsToConnect = [];
    for (const tagName of article.tag_list) {
      const tag = await prisma.tag.upsert({
        where: { slug: tagName },
        update: {},
        create: { name: tagName, slug: tagName }
      });
      tagsToConnect.push({ id: tag.id });
    }

    await prisma.post.create({
      data: {
        title: article.title,
        slug: article.slug + '-' + Math.floor(Math.random() * 1000),
        excerpt: article.description,
        content: `
          <img src="${article.cover_image || 'https://via.placeholder.com/800x400'}" alt="${article.title}" style="width:100%; border-radius:12px; margin-bottom:2rem;" />
          <p>${article.description}</p>
          <!-- ADSENSE_IN_ARTICLE -->
          <h2>Overview of ${article.title}</h2>
          <p>This article explores the core concepts as discussed in the latest tech circles.</p>
          <p>Read the full original discussion on <a href="${article.url}" target="_blank">DEV.to</a>.</p>
        `,
        published: true,
        featured: Math.random() > 0.7,
        readingTime: Math.floor(Math.random() * 10) + 5,
        authorId: author.id,
        categoryId: aiCategory.id,
        tags: { connect: tagsToConnect }
      }
    });
  }

  console.log('Inserting original 2026 job market content...');
  await prisma.post.create({
    data: {
      title: 'The Rise of Agentic AI Architects: 2026 Market Report',
      slug: 'agentic-ai-2026',
      excerpt: 'How AI agents are redefining the hiring landscape in 2026.',
      content: '<p>The era of simple coding tools is over. Welcome to the agentic era.</p>',
      published: true,
      featured: true,
      readingTime: 6,
      authorId: author.id,
      categoryId: careerCategory.id
    }
  });

  console.log('Seeding mandatory AdSense pages...');
  const pages = [
    { title: 'About Us', slug: 'about', content: '<h1>About FutureEdge</h1><p>Innovation at every step.</p>' },
    { title: 'Privacy Policy', slug: 'privacy-policy', content: '<h1>Privacy Policy</h1>' },
    { title: 'Contact Us', slug: 'contact', content: '<h1>Contact Us</h1>' },
    { title: 'Terms', slug: 'terms', content: '<h1>Terms</h1>' }
  ];

  for (const page of pages) {
    await prisma.page.create({ data: page });
  }

  console.log('Cloud Database is now fully populated!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
