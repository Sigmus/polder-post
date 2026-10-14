import { loadArticles } from '@/lib/storage';
import ArticleCard from '@/components/ArticleCard';
import { SECTIONS, type Section } from '@/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ section: Section }>;
}

export async function generateStaticParams() {
  return SECTIONS.map((section) => ({
    section: section.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const sectionInfo = SECTIONS.find((s) => s.id === section);

  if (!sectionInfo) {
    return {
      title: 'Section Not Found',
    };
  }

  return {
    title: `${sectionInfo.label} | Polder Post`,
    description: `Latest ${sectionInfo.label.toLowerCase()} news from the Netherlands in English`,
  };
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  const sectionInfo = SECTIONS.find((s) => s.id === section);

  if (!sectionInfo) {
    notFound();
  }

  const articles = await loadArticles();
  const sectionArticles = articles.filter((a) => a.section === section);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-2">
          {sectionInfo.label}
        </h1>
        <p className="text-lg text-[var(--muted)]">
          Latest {sectionInfo.label.toLowerCase()} news from the Netherlands
        </p>
      </header>

      {sectionArticles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-[var(--muted)]">
            No articles in this section yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {sectionArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
