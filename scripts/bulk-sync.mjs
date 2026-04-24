import { prisma } from '../lib/prisma-db.js';
import { getLatestNewsHeadlines, generateAIEnhancedArticle } from '../lib/intelligence.js';
import Parser from 'rss-parser';

const parser = new Parser();

async function fetchNewsForTopic(topic) {
  console.log(`Searching news for: ${topic}...`);
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=en-US&gl=US&ceid=US:en`;
  try {
    const feed = await parser.parseURL(url);
    return feed.items.slice(0, 3); // Take top 3 for each topic
  } catch (error) {
    console.error(`Error fetching for ${topic}:`, error);
    return [];
  }
}

async function startBulkSync() {
  const topics = [
    { query: 'NVIDIA AI Chips 2026', category: 'Artificial Intelligence' },
    { query: 'OpenAI GPT-5 leaks', category: 'Artificial Intelligence' },
    { query: 'Azure Cloud Infrastructure updates', category: 'Cloud Computing' },
    { query: 'AWS re:Invent 2026 predictions', category: 'Cloud Computing' },
    { query: 'IT Job Layoffs 2026 Trends', category: 'IT Job Market' },
    { query: 'Python Data Science libraries 2026', category: 'Data Science' },
    { query: 'Large Language Model training techniques', category: 'Deep Learning' }
  ];

  // Get or Create Author
  let author = await prisma.author.findFirst();
  if (!author) {
    author = await prisma.author.create({
      data: {
        name: 'Editorial Team',
        email: 'editor@pulseedge.intel',
        bio: 'The specialized editorial desk at PulseEdge Intelligence.'
      }
    });
  }

  for (const topic of topics) {
    const newsItems = await fetchNewsForTopic(topic.query);
    
    // Find category
    let category = await prisma.category.findUnique({ where: { name: topic.category } });
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: topic.category,
          slug: topic.category.toLowerCase().replace(/ /g, '-'),
          description: `Strategic insights into the ${topic.category} sector.`
        }
      });
    }

    for (const item of newsItems) {
      const slug = item.title.toLowerCase().split(' ').slice(0, 8).join('-').replace(/[^a-z0-9-]/g, '');
      
      // Check if exists
      const existing = await prisma.post.findUnique({ where: { slug } });
      if (existing) {
        console.log(`Post exists: ${slug}`);
        continue;
      }

      console.log(`Generating article: ${item.title}`);
      const article = await generateAIEnhancedArticle(item.title);

      await prisma.post.create({
        data: {
          title: article.title,
          slug: slug,
          content: article.content,
          excerpt: article.excerpt,
          metaTitle: article.metaTitle,
          metaDescription: article.metaDescription,
          featuredImage: article.featuredImage,
          published: true,
          categoryId: category.id,
          authorId: author.id
        }
      });
      console.log(`Saved: ${article.title}`);
    }
  }
}

startBulkSync()
  .then(() => console.log('Bulk Sync Complete'))
  .catch(e => console.error('Bulk Sync Failed', e))
  .finally(() => prisma.$disconnect());
