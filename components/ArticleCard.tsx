import Link from 'next/link';
import { format } from 'date-fns';
import type { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({
  article,
  featured = false,
}: ArticleCardProps) {
  const formattedDate = format(article.publishedAt, 'MMMM d, yyyy · h:mm a');

  if (featured) {
    return (
      <article className="border-b border-[var(--border)] pb-8 mb-8">
        <Link href={`/article/${article.slug}`} className="group">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-wide text-[var(--muted)]">
              <span>{article.section}</span>
              <span>·</span>
              <span>{article.sourceName}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight group-hover:text-[var(--accent)] transition-colors">
              {article.englishTitle}
            </h1>
            <p className="text-lg sm:text-xl text-[var(--muted)] leading-relaxed max-w-3xl">
              {article.englishSummary.slice(0, 200)}...
            </p>
            <div className="flex items-center space-x-2 text-sm text-[var(--muted)]">
              <time dateTime={article.publishedAt.toISOString()}>
                {formattedDate}
              </time>
              {!article.translated && (
                <>
                  <span>·</span>
                  <span className="text-[var(--accent)] font-medium">
                    Untranslated
                  </span>
                </>
              )}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="border-b border-[var(--border)] py-6 last:border-b-0">
      <Link href={`/article/${article.slug}`} className="group">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-wide text-[var(--muted)]">
            <span>{article.section}</span>
            <span>·</span>
            <span>{article.sourceName}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold leading-tight group-hover:text-[var(--accent)] transition-colors">
            {article.englishTitle}
          </h2>
          <p className="text-base text-[var(--muted)] leading-relaxed line-clamp-2">
            {article.englishSummary}
          </p>
          <div className="flex items-center space-x-2 text-sm text-[var(--muted)]">
            <time dateTime={article.publishedAt.toISOString()}>
              {format(article.publishedAt, 'MMM d, yyyy')}
            </time>
            {!article.translated && (
              <>
                <span>·</span>
                <span className="text-[var(--accent)] font-medium">
                  Untranslated
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
