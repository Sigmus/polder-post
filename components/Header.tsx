'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SECTIONS } from '@/lib/types';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)] sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold font-serif tracking-tight hover:text-[var(--accent)] transition-colors"
          >
            Polder Post
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <nav className="hidden md:flex items-center space-x-6">
            {SECTIONS.slice(0, 6).map((section) => (
              <Link
                key={section.id}
                href={`/section/${section.id}`}
                className="text-sm font-medium hover:text-[var(--accent)] transition-colors"
              >
                {section.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="text-sm font-medium hover:text-[var(--accent)] transition-colors"
            >
              About
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </nav>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            {SECTIONS.map((section) => (
              <Link
                key={section.id}
                href={`/section/${section.id}`}
                className="block text-base font-medium hover:text-[var(--accent)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {section.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="block text-base font-medium hover:text-[var(--accent)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/search"
              className="block text-base font-medium hover:text-[var(--accent)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
