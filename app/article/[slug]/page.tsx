import { loadArticles } from '@/lib/storage';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await loadArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articles = await loadArticles();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.englishTitle} | Polder Post`,
    description: article.englishSummary.slice(0, 160),
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const articles = await loadArticles();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((a) => a.section === article.section && a.id !== article.id)
    .slice(0, 3);

  const formattedDate = format(article.publishedAt, 'MMMM d, yyyy');
  const formattedTime = format(article.publishedAt, 'h:mm a');

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8 space-y-4">
        <div className="flex items-center space-x-2 text-sm uppercase tracking-wide text-[var(--muted)]">
          <Link
            href={`/section/${article.section}`}
            className="hover:text-[var(--accent)] transition-colors"
          >
            {article.section}
          </Link>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight">
          {article.englishTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          <time dateTime={article.publishedAt.toISOString()}>
            {formattedDate} at {formattedTime}
          </time>
          <span>·</span>
          <span>{article.sourceName}</span>
          {!article.translated && (
            <>
              <span>·</span>
              <span className="text-[var(--accent)] font-medium">
                Untranslated
              </span>
            </>
          )}
        </div>
      </header>

      <div className="prose prose-lg max-w-none mb-8 leading-relaxed">
        {article.englishSummary.split('\n').map((paragraph, i) => (
          <p key={i} className="mb-5 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="border-t border-[var(--border)] pt-6 mb-8">
        <div className="bg-stone-50 dark:bg-stone-900 p-6 rounded-lg">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-2">
            Original Source
          </h2>
          <p className="text-sm text-[var(--muted)] mb-3">
            This story was originally published by{' '}
            <strong>{article.sourceName}</strong>:
          </p>
          <p className="font-serif text-base mb-3 italic">
            "{article.originalTitle}"
          </p>
          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-[var(--accent)] hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
          >
            <span>Read original article in Dutch</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <div className="border-t border-[var(--border)] pt-8">
          <h2 className="text-2xl font-serif font-bold mb-6">
            Related Stories
          </h2>
          <div className="space-y-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/article/${related.slug}`}
                className="block group"
              >
                <h3 className="text-xl font-serif font-bold group-hover:text-[var(--accent)] transition-colors mb-2">
                  {related.englishTitle}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {format(related.publishedAt, 'MMMM d, yyyy')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
