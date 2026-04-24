'use server';

import { prisma } from './prisma-db';
import { getLatestNewsHeadlines, generateAIEnhancedArticle } from './intelligence';
import { revalidatePath } from 'next/cache';

export async function syncIntelligenceAction() {
  console.log("INITIALIZING INTELLIGENCE SYNC...");
  
  try {
    // 1. Ensure we have an author and category
    let author = await prisma.author.findFirst();
    if (!author) {
      author = await prisma.author.create({
        data: {
          name: 'PulseEdge Intelligence Team',
          bio: 'Automated intelligence aggregation and analysis unit.',
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=pulse'
        }
      });
    }

    let category = await prisma.category.findFirst({ where: { slug: 'ai' } });
    if (!category) {
      category = await prisma.category.create({
        data: { name: 'Artificial Intelligence', slug: 'ai', description: 'Institutional reporting on global AI evolution.' }
      });
    }

    // 2. Fetch Latest Headlines
    const headlines = await getLatestNewsHeadlines();
    console.log(`FETCHED ${headlines.length} HEADLINES`);

    if (headlines.length === 0) return { success: false, message: "No news found." };

    // 3. Process and Generate (Limit to 3 for now to avoid timeout)
    const newArticles = [];
    for (const item of headlines.slice(0, 3)) {
      // Check if already exists by title
      const existing = await prisma.post.findFirst({ where: { title: item.title } });
      if (existing) continue;

      console.log(`GENERATING CONTENT FOR: ${item.title}`);
      const aiContent = await generateAIEnhancedArticle(item.title);
      
      const newPost = await prisma.post.create({
        data: {
          title: aiContent.title,
          slug: aiContent.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000),
          content: aiContent.content,
          excerpt: aiContent.excerpt,
          metaTitle: aiContent.metaTitle,
          metaDescription: aiContent.metaDescription,
          featuredImage: aiContent.featuredImage,
          published: true,
          featured: Math.random() > 0.5,
          readingTime: Math.floor(Math.random() * 5) + 5,
          authorId: author.id,
          categoryId: category.id,
        }
      });
      newArticles.push(newPost);
    }

    revalidatePath('/');
    return { success: true, count: newArticles.length };
  } catch (error) {
    console.error("SYNC FAILED:", error);
    return { success: false, error: error.message };
  }
}
