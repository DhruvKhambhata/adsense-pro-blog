import Parser from 'rss-parser';
import { GoogleGenerativeAI } from "@google/generative-ai";

const parser = new Parser();

// Configure Gemini (User will need to provide GOOGLE_AI_API_KEY in .env)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "MOCK_KEY");

/**
 * Fetches latest AI and IT Market news from Google News RSS
 */
export async function getLatestNewsHeadlines() {
  const query = 'Artificial Intelligence IT Market Job Trends';
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  
  try {
    const feed = await parser.parseURL(url);
    return feed.items.slice(0, 5).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      source: item.source
    }));
  } catch (error) {
    console.error("RSS Fetch Error:", error);
    return [];
  }
}

/**
 * Generates a high-quality, SEO-optimized article based on a headline
 * This is the CORE of the AdSense strategy: Unique, high-value content.
 */
export async function generateAIEnhancedArticle(headline) {
  if (!process.env.GOOGLE_AI_API_KEY) {
    console.warn("No Google AI API Key found. Returning mock content.");
    return generateMockArticle(headline);
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are a professional IT and AI market analyst for 'PulseEdge Intelligence'.
    Write a 800-word authoritative news article based on this headline: "${headline}".
    
    CRITICAL INSTRUCTIONS FOR ADSENSE APPROVAL:
    1. ORIGINALITY: Do not copy the original story. Analyze the implications for the global IT market.
    2. STRUCTURE: Use clear H2 and H3 headings.
    3. INSIGHT: Include a section on "Market Impact" and "Workforce Implications".
    4. TONE: Professional, institutional, and objective.
    5. FORMAT: Return ONLY a valid JSON object. Do not include markdown code blocks.
    
    JSON Template:
    {
      "title": "Unique Catchy Title",
      "content": "Full HTML content with <h2> and <p> tags",
      "excerpt": "2 sentence summary",
      "metaTitle": "SEO Title",
      "metaDescription": "SEO Description",
      "featuredImage": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Remove potential markdown code blocks
    if (text.startsWith('```')) {
      text = text.replace(/```json|```/g, '').trim();
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return generateMockArticle(headline);
  }
}

function generateMockArticle(headline) {
  const cleanHeadline = headline.split(' - ')[0]; // Remove source from Google News title
  return {
    title: cleanHeadline,
    content: `
      <p>The latest shifts in the ${cleanHeadline} sector are sending ripples across the global IT landscape. 
      As PulseEdge Intelligence monitors these developments, it becomes clear that the intersection of 
      artificial intelligence and infrastructure is reaching a pivotal turning point.</p>
      
      <h2>Market Analysis: A Strategic Shift</h2>
      <p>Institutional investors and tech leaders are increasingly focused on the scalability of these new systems. 
      The current trend suggests a 15% increase in operational efficiency for firms adopting early-stage automation patterns.</p>
      
      <!-- ADSENSE_IN_ARTICLE -->
      
      <h2>Workforce Implications</h2>
      <p>For IT professionals, the mandate is clear: upskilling in neural architecture and data ethics is no longer optional. 
      The ${cleanHeadline} movement represents a broader trend of "Intelligence Integration" across traditional sectors.</p>
      
      <h3>Key Takeaways for Q4 2026</h3>
      <ul>
        <li>Increased focus on sovereign AI clouds.</li>
        <li>Efficiency gains in legacy system migration.</li>
        <li>Rising demand for Ethical AI Compliance Officers.</li>
      </ul>
    `,
    excerpt: `Evaluating the strategic impact of ${cleanHeadline} on the current IT market and global workforce trends.`,
    metaTitle: `${cleanHeadline} | PulseEdge Intelligence Analysis`,
    metaDescription: `In-depth analysis of the institutional impact of ${cleanHeadline} for tech professionals and investors.`,
    featuredImage: `https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80`
  };
}
