export async function fetchArticles(
  categories: string[]
): Promise<
  Array<{ title: string; url: string; description: string; category: string }>
> {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const promises = categories.map(async (category) => {
    try {
      // Use more specific search terms and sources for better results
      const searchQuery =
        category === "science"
          ? "science research breakthrough discovery innovation medical space climate AI technology -entertainment -sports -gaming"
          : category === "sports"
            ? "sports NFL NBA MLB soccer olympics championship tournament -entertainment -movies -gaming"
            : category === "technology"
              ? "technology software hardware AI startup cybersecurity innovation -entertainment -movies -gaming -betting"
              : category;

      console.log(
        `Fetching articles for category: ${category} with query: ${searchQuery}`
      );

      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          searchQuery
        )}&from=${since}&sortBy=publishedAt&language=en&domains=techcrunch.com,arstechnica.com,reuters.com,bbc.com,cnn.com,espn.com,sciencedaily.com,nature.com&apiKey=${process.env.NEWS_API_KEY}`
      );

      if (!response.ok) {
        console.error(
          `Failed fetching for category: ${category}`,
          response.status,
          response.statusText
        );

        // Try with a simpler approach using top-headlines
        console.log(`Trying fallback approach for category: ${category}`);
        const fallbackCategory =
          category === "science"
            ? "science"
            : category === "sports"
              ? "sports"
              : "technology";
        const fallbackResponse = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${fallbackCategory}&language=en&country=us&apiKey=${process.env.NEWS_API_KEY}`
        );

        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          console.log(
            `Fallback found ${fallbackData.articles?.length || 0} articles for ${category}`
          );
          return fallbackData.articles.slice(0, 5).map((article: any) => ({
            title: article.title,
            url: article.url,
            description: article.description || "No description available",
            category: category,
          }));
        } else {
          console.error(
            `Fallback also failed for ${category}:`,
            fallbackResponse.status,
            fallbackResponse.statusText
          );
        }

        return [];
      }

      const data = await response.json();
      console.log(
        `Raw API response for ${category}:`,
        data.articles?.length || 0,
        "articles"
      );

      if (!data.articles || data.articles.length === 0) {
        console.log(
          `No articles returned for ${category}, trying simpler query`
        );

        // Try with just the category name if complex query fails
        const simpleQuery = category;
        const simpleResponse = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            simpleQuery
          )}&from=${since}&sortBy=publishedAt&language=en&apiKey=${process.env.NEWS_API_KEY}`
        );

        if (simpleResponse.ok) {
          const simpleData = await simpleResponse.json();
          console.log(
            `Simple query found ${simpleData.articles?.length || 0} articles for ${category}`
          );

          if (simpleData.articles && simpleData.articles.length > 0) {
            return simpleData.articles.slice(0, 5).map((article: any) => ({
              title: article.title,
              url: article.url,
              description: article.description || "No description available",
              category: category,
            }));
          }
        }
      }

      // Filter out articles with missing content but be less restrictive
      const filteredArticles = data.articles
        .filter(
          (article: any) =>
            article.title &&
            article.description &&
            article.url &&
            article.title.length > 5 &&
            article.description.length > 10 &&
            !article.title.includes("[Removed]") &&
            !article.description.includes("[Removed]") &&
            // Exclude obviously irrelevant content
            !article.title.toLowerCase().includes("betting") &&
            !article.title.toLowerCase().includes("casino") &&
            !article.title.toLowerCase().includes("porn")
        )
        .slice(0, 5) // Take 5 per category for better content
        .map((article: any) => ({
          title: article.title,
          url: article.url,
          description: article.description,
          category: category,
        }));

      console.log(
        `Filtered to ${filteredArticles.length} articles for ${category}`
      );
      return filteredArticles;
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
      return [];
    }
  });

  const results = await Promise.all(promises);
  const allArticles = results.flat();

  console.log(`Total articles fetched: ${allArticles.length}`);
  console.log(
    `Articles by category:`,
    categories
      .map(
        (cat) =>
          `${cat}: ${allArticles.filter((a) => a.category === cat).length}`
      )
      .join(", ")
  );

  return allArticles;
}
