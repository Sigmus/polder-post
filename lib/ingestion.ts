import Parser from 'rss-parser';
import type { RawArticle, Source } from './types';

const parser = new Parser({
  timeout: 10000,
  customFields: {
    item: ['description', 'content:encoded', 'content'],
  },
});

export async function fetchFeed(source: Source): Promise<RawArticle[]> {
  try {
    const feed = await parser.parseURL(source.feedUrl);
    const articles: RawArticle[] = [];

    for (const item of feed.items.slice(0, 20)) {
      if (!item.link || !item.title) continue;

      const content =
        (item as any)['content:encoded'] ||
        item.content ||
        item.contentSnippet ||
        item.description ||
        '';

      articles.push({
        sourceId: source.id,
        sourceName: source.name,
        originalUrl: item.link,
        originalTitle: item.title,
        originalContent: content,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        guid: item.guid || item.link,
      });
    }

    return articles;
  } catch (error) {
    console.error(`Error fetching feed from ${source.name}:`, error);
    return [];
  }
}

export async function fetchAllFeeds(sources: Source[]): Promise<RawArticle[]> {
  const enabledSources = sources.filter((s) => s.enabled);
  const results = await Promise.allSettled(
    enabledSources.map((source) => fetchFeed(source))
  );

  const articles: RawArticle[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      articles.push(...result.value);
    }
  }

  return articles;
}

export function deduplicateArticles(articles: RawArticle[]): RawArticle[] {
  const seen = new Set<string>();
  const deduplicated: RawArticle[] = [];

  const sortedArticles = [...articles].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
  );

  for (const article of sortedArticles) {
    const normalizedTitle = article.originalTitle
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .trim();

    const key = normalizedTitle.slice(0, 50);

    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(article);
    }
  }

  return deduplicated;
}
