import { inngest } from "../client";
import { fetchArticles } from "@/lib/news";
import { generateNewsletterSummary } from "@/lib/groq-client";
import { marked } from "marked";

export default inngest.createFunction(
  { id: "newsletter/scheduled" },
  { event: "newsletter.schedule" },
  async ({ event, step, runId }) => {
    const categories = ["technology", "business", "politics"];

    const allArticles = await step.run("fetch-news", async () => {
      return fetchArticles(categories);
    });

    const summary = await step.run("generate-summary", async () => {
      return await generateNewsletterSummary(allArticles, categories);
    });

    const processedNewsletter = await step.run(
      "process-newsletter",
      async () => {
        console.log("Raw summary:", summary);

        // Use summary directly as newsletter content
        const newsletterContent = summary;

        if (!newsletterContent) {
          throw new Error("Failed to generate newsletter content");
        }

        // Fix: Actually convert markdown to HTML
        const htmlResult = marked(newsletterContent);

        return {
          content: newsletterContent,
          html: htmlResult,
          timestamp: new Date().toISOString(),
          categories: categories,
          articleCount: allArticles.length,
        };
      }
    );

    return processedNewsletter;
  }
);
