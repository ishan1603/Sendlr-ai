import Groq from "groq-sdk";

// Get your free API key from: https://console.groq.com/keys
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Add this to your .env.local
});

export async function generateNewsletterSummary(
  articles: any[],
  categories: string[]
) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert newsletter editor creating a personalized newsletter. 
            Write a concise, engaging summary that:
            - Highlights the most important stories
            - Provides context and insights
            - Uses a friendly, conversational tone
            - Is well-structured with clear sections
            - Keeps the reader informed and engaged
            Format the response as a proper newsletter with a title and organized content.
            Make it email-friendly with clear sections and engaging subject lines.`,
        },
        {
          role: "user",
          content: `Create a newsletter summary for these articles from the past week.
                    Categories requested: ${categories.join(", ")}
                    
                    Articles:
                    ${articles
                      .map(
                        (article: any, idx: number) =>
                          `${idx + 1}. ${article.title} \n  ${
                            article.description
                          } \n Source: ${article.url} \n`
                      )
                      .join("\n")}
                    `,
        },
      ],
      model: "llama-3.1-70b-versatile", // Fast and free model
      temperature: 0.7,
      max_tokens: 1000,
    });

    return (
      completion.choices[0]?.message?.content || "Unable to generate summary"
    );
  } catch (error) {
    console.error("Groq API error:", error);

    // Fallback to simple summary
    return `Newsletter Summary - ${new Date().toLocaleDateString()}
    
📰 Today's Top Stories from ${categories.join(", ")}:

${articles
  .slice(0, 5)
  .map(
    (article: any, idx: number) =>
      `${idx + 1}. ${article.title}\n   ${article.description}\n   Read more: ${
        article.url
      }\n`
  )
  .join("\n")}

Generated with Groq AI`;
  }
}

export { groq };
