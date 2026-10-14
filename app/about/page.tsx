import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Polder Post',
  description:
    'Learn about Polder Post, our sourcing policy, and how we bring English-language news to expats in the Netherlands.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-8">
          About Polder Post
        </h1>

        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Polder Post is an English-language news service for expats,
            international workers, and foreign residents in the Netherlands. We
            translate and summarize important news from respected Dutch sources,
            making it accessible to those who don't read Dutch fluently.
          </p>

          <h2 className="text-3xl font-serif font-bold mt-12 mb-4">
            Our Sourcing Policy
          </h2>

          <p>
            We believe in <strong>transparency and attribution</strong>. Every
            story on Polder Post:
          </p>

          <ul className="space-y-2 list-disc pl-6">
            <li>
              Comes from a respected Dutch news outlet (NOS, NU.nl, RTL Nieuws,
              AD, Het Parool, NRC, de Volkskrant, Telegraaf, and others)
            </li>
            <li>
              Clearly shows the source outlet and links back to the original
              Dutch article
            </li>
            <li>
              Is translated and summarized, never fabricated or invented
            </li>
            <li>
              Maintains the original headline in Dutch alongside our English
              translation
            </li>
          </ul>

          <h2 className="text-3xl font-serif font-bold mt-12 mb-4">
            How It Works
          </h2>

          <p>
            Polder Post automatically polls RSS feeds from major Dutch news
            outlets every 30-60 minutes. We select the most important and
            timely stories, translate them into English using AI, and present
            them in a concise, readable format that explains Dutch context for
            international readers.
          </p>

          <p>
            Our editorial style is inspired by{' '}
            <a
              href="https://nltimes.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              NL Times
            </a>{' '}
            and{' '}
            <a
              href="https://dutchnews.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              DutchNews
            </a>
            : neutral, concise, and focused on explaining the Netherlands to
            English speakers.
          </p>

          <h2 className="text-3xl font-serif font-bold mt-12 mb-4">
            Translation Technology
          </h2>

          <p>
            We use AI language models (OpenAI or Anthropic) to translate and
            summarize articles. When translation services are unavailable, we
            run in fallback mode and display untranslated links directly from
            the source feeds.
          </p>

          <h2 className="text-3xl font-serif font-bold mt-12 mb-4">
            Dutch Terms
          </h2>

          <p>
            We keep important Dutch terms in <em>italics</em> with brief English
            translations to help you learn the language and understand local
            context. Common examples include:
          </p>

          <ul className="space-y-2 list-disc pl-6">
            <li>
              <em>gemeente</em> (municipality)
            </li>
            <li>
              <em>Tweede Kamer</em> (House of Representatives)
            </li>
            <li>
              <em>burgemeester</em> (mayor)
            </li>
            <li>
              <em>kabinet</em> (cabinet/government)
            </li>
          </ul>

          <h2 className="text-3xl font-serif font-bold mt-12 mb-4">Contact</h2>

          <p>
            Polder Post is an independent project created for expats in
            Amsterdam and across the Netherlands. All content is attributed to
            its original sources.
          </p>
        </div>
      </article>
    </div>
  );
}
