'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import type { Article } from '@/lib/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const response = await fetch('/data/articles.json');
        const data = await response.json();
        setArticles(
          data.map((a: any) => ({
            ...a,
            publishedAt: new Date(a.publishedAt),
            updatedAt: new Date(a.updatedAt),
          }))
        );
      } catch (error) {
        console.error('Failed to load articles:', error);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return articles.filter(
      (article) =>
        article.englishTitle.toLowerCase().includes(lowerQuery) ||
        article.englishSummary.toLowerCase().includes(lowerQuery) ||
        article.sourceName.toLowerCase().includes(lowerQuery) ||
        article.section.toLowerCase().includes(lowerQuery)
    );
  }, [query, articles]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-8">
          Search Articles
        </h1>

        <div className="mb-12">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full px-6 py-4 text-lg border-2 border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)] bg-[var(--background)] text-[var(--foreground)]"
              aria-label="Search articles"
            />
          </div>
        </div>

        {loading && (
          <div className="text-center py-16">
            <p className="text-lg text-[var(--muted)]">Loading articles...</p>
          </div>
        )}

        {!loading && query && filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-[var(--muted)]">
              No articles found for "{query}"
            </p>
          </div>
        )}

        {!loading && filteredArticles.length > 0 && (
          <div>
            <p className="text-sm text-[var(--muted)] mb-6">
              Found {filteredArticles.length} article
              {filteredArticles.length !== 1 ? 's' : ''} for "{query}"
            </p>
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-8">
            Search Articles
          </h1>
          <div className="text-center py-16">
            <p className="text-lg text-[var(--muted)]">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
