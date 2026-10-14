import { loadArticles } from '@/lib/storage';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import { SECTIONS } from '@/lib/types';

export default async function Home() {
  const articles = await loadArticles();
  const featured = articles.find((a) => a.featured) || articles[0];
  const latest = articles.slice(0, 12);

  if (articles.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold">
            Welcome to Polder Post
          </h1>
          <p className="text-lg text-[var(--muted)]">
            No articles yet. Run <code className="bg-stone-200 dark:bg-stone-800 px-2 py-1 rounded">npm run ingest</code> to fetch and
            translate news from Dutch sources.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {featured && <ArticleCard article={featured} featured />}

      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold mb-6">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {latest.slice(1).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-[var(--border)]">
        <h2 className="text-2xl font-serif font-bold mb-6">Browse by Section</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`/section/${section.id}`}
              className="p-4 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] hover:bg-stone-50 dark:hover:bg-stone-900 transition-all"
            >
              <h3 className="font-semibold text-lg">{section.label}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
