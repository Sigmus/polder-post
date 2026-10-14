import fs from 'fs/promises';
import path from 'path';
import type { Article } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');

export async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

export async function loadArticles(): Promise<Article[]> {
  try {
    const data = await fs.readFile(ARTICLES_FILE, 'utf-8');
    const articles = JSON.parse(data);
    return articles.map((a: any) => ({
      ...a,
      publishedAt: new Date(a.publishedAt),
      updatedAt: new Date(a.updatedAt),
    }));
  } catch (error) {
    return [];
  }
}

export async function saveArticles(articles: Article[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2));
}

export async function addArticles(newArticles: Article[]): Promise<void> {
  const existing = await loadArticles();
  const existingIds = new Set(existing.map((a) => a.id));

  const toAdd = newArticles.filter((a) => !existingIds.has(a.id));

  if (toAdd.length === 0) {
    console.log('No new articles to add');
    return;
  }

  const combined = [...toAdd, ...existing]
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, 500);

  await saveArticles(combined);
  console.log(`Added ${toAdd.length} new articles`);
}
