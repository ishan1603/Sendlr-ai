import { inngest } from "../client";
import { fetchArticles } from "@/lib/news";
import { generateNewsletterSummary } from "@/lib/groq-client";
import { marked } from "marked";
import { sendEmail } from "@/lib/email";

export default inngest.createFunction(
  { id: "newsletter/scheduled" },
  { event: "newsletter.schedule" },
  async ({ event, step, runId }) => {
    const categories = event.data.categories;

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
        const htmlResult = await marked(newsletterContent);
        await step.run("send-email", async () => {
          await sendEmail(
            event.data.email,
            event.data.categories.join(", "),
            allArticles.length,
            htmlResult
          );
        });
      }
    );
  }
);
