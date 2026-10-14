import Link from 'next/link';
import { SECTIONS } from '@/lib/types';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Polder Post</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              English-language news for expats in the Netherlands. Translating
              and summarizing Dutch news with clear attribution.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">
              Sections
            </h4>
            <ul className="space-y-2">
              {SECTIONS.slice(0, 6).map((section) => (
                <li key={section.id}>
                  <Link
                    href={`/section/${section.id}`}
                    className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">
              About
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border)] text-center">
          <p className="text-sm text-[var(--muted)]">
            © {currentYear} Polder Post. All content attributed to original
            sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
