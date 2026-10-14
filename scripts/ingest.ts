#!/usr/bin/env node

import { NEWS_SOURCES } from '../lib/sources';
import { fetchAllFeeds, deduplicateArticles } from '../lib/ingestion';
import { translateArticle, createFallbackArticle } from '../lib/translation';
import { addArticles } from '../lib/storage';
import type { Article } from '../lib/types';

async function runIngestion() {
  console.log('Starting ingestion...');
  console.log('Fetching RSS feeds...');

  const rawArticles = await fetchAllFeeds(NEWS_SOURCES);
  console.log(`Fetched ${rawArticles.length} articles`);

  const deduplicated = deduplicateArticles(rawArticles);
  console.log(`After deduplication: ${deduplicated.length} articles`);

  const topArticles = deduplicated.slice(0, 30);

  const hasApiKey = !!(
    process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY
  );

  if (!hasApiKey) {
    console.log('⚠️  No API key found - running in FALLBACK MODE');
    console.log(
      'Articles will show original Dutch text without translation.'
    );
    console.log(
      'Set OPENAI_API_KEY or ANTHROPIC_API_KEY to enable translation.'
    );
  }

  const articles: Article[] = [];

  for (let i = 0; i < topArticles.length; i++) {
    const raw = topArticles[i];
    const id = `${raw.sourceId}-${Date.now()}-${i}`;

    if (hasApiKey) {
      console.log(
        `Translating ${i + 1}/${topArticles.length}: ${raw.originalTitle.slice(0, 50)}...`
      );

      const translation = await translateArticle(raw);

      if (translation) {
        articles.push({
          id,
          slug: generateSlug(translation.englishTitle),
          englishTitle: translation.englishTitle,
          englishSummary: translation.englishSummary,
          sourceName: raw.sourceName,
          sourceUrl: raw.originalUrl,
          originalUrl: raw.originalUrl,
          originalTitle: raw.originalTitle,
          publishedAt: raw.publishedAt,
          updatedAt: new Date(),
          section: translation.section,
          featured: i === 0,
          translated: true,
        });
      } else {
        articles.push(createFallbackArticle(raw, id));
      }
    } else {
      articles.push(createFallbackArticle(raw, id));
    }
  }

  console.log(`Saving ${articles.length} articles...`);
  await addArticles(articles);

  console.log('✅ Ingestion complete!');
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 100);
}

runIngestion().catch((error) => {
  console.error('Ingestion failed:', error);
  process.exit(1);
});
