import Groq from "groq-sdk";

// Get your free API key from: https://console.groq.com/keys
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Add this to your .env.local
});

export async function generateNewsletterSummary(
  articles: any[],
  categories: string[]
) {
  console.log(
    `Generating newsletter for ${articles.length} articles in categories: ${categories.join(", ")}`
  );

  // Check if we have articles
  if (!articles || articles.length === 0) {
    console.error("No articles provided to generate newsletter");
    return `<h2>Newsletter Summary - ${new Date().toLocaleDateString()}</h2>
    
<p>⚠️ No articles were found for the selected categories: ${categories.join(", ")}</p>
<p>This might be due to:</p>
<ul>
  <li>API rate limits or quota exceeded</li>
  <li>No recent articles in the selected categories</li>
  <li>Network connectivity issues</li>
</ul>

<p><em>Generated with Groq AI</em></p>`;
  }

  // Check API key
  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY is not set in environment variables");
    return generateFallbackNewsletter(articles, categories);
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a professional tech newsletter editor specializing in creating engaging, well-formatted newsletters. 

WRITING STYLE:
- Professional yet conversational tone
- Clear, concise sentences with proper punctuation
- Engaging headlines and smooth transitions
- Focus on why stories matter to readers
- Include actionable insights where possible

FORMATTING REQUIREMENTS:
- Start with a compelling opening line
- Use HTML formatting: <h2>, <h3>, <p>, <strong>, <em>
- Group related stories under themed sections
- Each story should have: headline, brief summary, key takeaway
- End with a brief conclusion or forward-looking statement
- Use bullet points or numbered lists for readability

CONTENT STRUCTURE:
1. Opening greeting/hook
2. 3-4 themed sections (e.g., "AI Breakthroughs", "Tech Policy", "Security Updates")
3. Each section: 1-2 key stories with analysis
4. Brief conclusion with forward-looking insight

Make it scannable, informative, and engaging. Focus on quality over quantity.`,
        },
        {
          role: "user",
          content: `Create a professional newsletter for these ${categories.join(", ")} stories.

IMPORTANT REQUIREMENTS:
- ONLY include articles in English
- Group articles by their actual categories (${categories.join(", ")})
- Ensure each requested category is represented
- Skip any non-English or irrelevant content
- Create engaging section headers for each category

ARTICLES TO PROCESS:
${articles
  .map(
    (article: any, idx: number) =>
      `${idx + 1}. CATEGORY: ${article.category || "general"}
HEADLINE: ${article.title}
SUMMARY: ${article.description}
SOURCE: ${article.url}
---`
  )
  .join("\n")}

Please create a well-structured newsletter with:
1. Brief engaging introduction
2. Separate sections for each category (${categories.join(", ")})
3. 2-3 top stories per category with analysis
4. Professional HTML formatting
5. Only English content

Make sure BOTH categories are represented with quality content.`,
        },
      ],
      model: "llama-3.1-70b-versatile", // Fast and free model
      temperature: 0.7,
      max_tokens: 1000,
    });

    const result = completion.choices[0]?.message?.content;
    if (!result || result.trim().length === 0) {
      console.error("Groq API returned empty content");
      return generateFallbackNewsletter(articles, categories);
    }

    console.log("Successfully generated newsletter with Groq AI");
    return result;
  } catch (error) {
    console.error("Groq API error:", error);
    return generateFallbackNewsletter(articles, categories);
  }
}

function generateFallbackNewsletter(articles: any[], categories: string[]) {
  console.log("Using fallback newsletter generation");

  return `<h2>Newsletter Summary - ${new Date().toLocaleDateString()}</h2>
    
<p>📰 Today's Top Stories from ${categories.join(", ")}:</p>

${articles
  .slice(0, 5)
  .map(
    (article: any, idx: number) =>
      `<h3>${idx + 1}. ${article.title}</h3>
<p><strong>Category:</strong> ${article.category}</p>
<p>${article.description}</p>
<p><a href="${article.url}" target="_blank">Read more →</a></p>
<hr>`
  )
  .join("\n")}

<p><em>Generated with Groq AI (fallback mode)</em></p>`;
}

export { groq };
