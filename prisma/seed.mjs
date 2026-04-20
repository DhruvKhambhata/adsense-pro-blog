import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import fetch from 'node-fetch';
import path from 'path';

const databaseUrl = 'file:' + path.resolve(process.cwd(), 'prisma/dev.db');

const adapter = new PrismaLibSql({
  url: databaseUrl,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Fetching articles from DEV.to API...');
  
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.author.deleteMany();

  const defaultAuthor = await prisma.author.create({
    data: {
      name: 'FutureTech Editorial',
      bio: 'Insightful tech reporting from the edge of innovation.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    }
  });

  const categoriesMap = {
    'programming': await prisma.category.create({ data: { name: 'Programming', slug: 'programming' } }),
    'ai': await prisma.category.create({ data: { name: 'Artificial Intelligence', slug: 'ai' } }),
    'webdev': await prisma.category.create({ data: { name: 'Web Development', slug: 'webdev' } }),
  };

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
        authorId: defaultAuthor.id,
        categoryId: categoriesMap['ai'].id,
        tags: { connect: tagsToConnect }
      }
    });
  }

  await prisma.page.upsert({
    where: { slug: 'about' },
    update: {},
    create: {
      title: 'About FutureEdge',
      slug: 'about',
      content: '<h1>About Us</h1><p>FutureEdge Insights is a premier platform dedicated to exploring the intersection of technology, humanity, and the future. Our team of experts provides deep-dive analysis into AI, blockchain, quantum computing, and ethical technology.</p>'
    }
  });

  await prisma.page.upsert({
    where: { slug: 'privacy-policy' },
    update: {},
    create: {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      content: '<h1>Privacy Policy</h1><p>At FutureEdge Insights, accessible from FutureEdge, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by FutureEdge and how we use it.</p><h2>Log Files</h2><p>FutureEdge follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services\' analytics.</p>'
    }
  });

  await prisma.page.upsert({
    where: { slug: 'terms' },
    update: {},
    create: {
      title: 'Terms of Service',
      slug: 'terms',
      content: '<h1>Terms of Service</h1><p>By accessing this website we assume you accept these terms and conditions. Do not continue to use FutureEdge Insights if you do not agree to take all of the terms and conditions stated on this page.</p>'
    }
  });

  await prisma.page.upsert({
    where: { slug: 'disclaimer' },
    update: {},
    create: {
      title: 'Editorial Disclaimer',
      slug: 'disclaimer',
      content: '<h1>Disclaimer</h1><p>The information provided by FutureEdge Insights is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>'
    }
  });

  console.log('Successfully seeded 15 articles!');
}

main()
  .catch((e) => {
    console.error(JSON.stringify(e, null, 2));
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
