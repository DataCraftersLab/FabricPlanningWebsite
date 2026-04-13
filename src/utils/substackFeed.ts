import Parser from "rss-parser";

export interface SubstackPost {
  title: string;
  description: string;
  pubDate: Date;
  url: string;
  coverImage: string | undefined;
}

const FEED_URL = "https://fabricplanning.substack.com/feed";

export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(FEED_URL);

    return (feed.items ?? []).map((item) => {
      // Try to extract the first image from the content
      let coverImage: string | undefined;
      const imgMatch = (item["content:encoded"] ?? item.content ?? "").match(
        /<img[^>]+src=["']([^"']+)["']/,
      );
      if (imgMatch) {
        coverImage = imgMatch[1];
      }

      // Build a plain-text snippet from the content snippet or description
      const rawDesc = item.contentSnippet ?? item.content ?? "";
      const description = rawDesc.replace(/<[^>]*>/g, "").slice(0, 200).trim();

      return {
        title: item.title ?? "Untitled",
        description,
        pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
        url: item.link ?? FEED_URL,
        coverImage,
      };
    });
  } catch {
    return [];
  }
}
