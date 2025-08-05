import { inngest } from "../client";
import { fetchArticles } from "@/lib/news";
import { generateNewsletterSummary } from "@/lib/groq-client";

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

    console.log(summary);
  }
);
