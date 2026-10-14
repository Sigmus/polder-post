# Polder Post

English-language news for expats in the Netherlands. Automatically translates and summarizes news from respected Dutch sources with clear attribution.

## Features

- 🗞️ **Automated news ingestion** from major Dutch outlets (NOS, NU.nl, RTL Nieuws, AD, and more)
- 🌐 **AI translation & summarization** in NL Times/DutchNews editorial style
- 📱 **Responsive design** - mobile-first, works on all devices
- 🌓 **Light & dark modes** - automatic based on system preference
- ♿ **Accessible** - built with WCAG AA compliance in mind
- 🔗 **Always attributed** - every story links to the original Dutch source
- ⚡ **Fast & lightweight** - static generation for optimal performance

## Local Development

### Prerequisites

- Node.js 20+ and npm
- Optional: API key for translation (OpenAI or Anthropic)

### Setup

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Configure environment variables (optional):**

Create a `.env.local` file for translation features:

```bash
# Use ONE of these (not both):
OPENAI_API_KEY=your_openai_key_here
# OR
ANTHROPIC_API_KEY=your_anthropic_key_here
```

Without API keys, the site runs in **fallback mode** showing untranslated Dutch article links.

3. **Run ingestion to fetch articles:**

```bash
npm run ingest
```

This polls RSS feeds from Dutch news sources and stores articles in `data/articles.json`. With API keys, articles are translated to English. Without keys, original Dutch titles/snippets are stored.

4. **Start the development server:**

```bash
npm run dev
```

Visit http://localhost:3000

## Architecture

### Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Typography:** Merriweather (serif), Inter (sans-serif)
- **Rendering:** Static generation with ISR (Incremental Static Regeneration)
- **Storage:** JSON file-based (easily replaceable with database)
- **Feed parsing:** rss-parser
- **Translation:** OpenAI GPT-4 or Anthropic Claude

### Why Next.js + Static Generation?

- **Cost-effective hosting**: Static files can be hosted anywhere (Vercel, Netlify, Cloudflare Pages, S3)
- **Performance**: Pre-rendered pages load instantly
- **SEO-friendly**: Fully server-rendered HTML
- **Scalability**: No server load from traffic spikes

### Project Structure

```
/app                   # Next.js App Router pages
  /article/[slug]      # Article detail pages
  /section/[section]   # Section pages (Politics, Economy, etc.)
  /about               # About page
  /search              # Search page
  /api/articles        # API endpoint for search
/components            # React components (Header, Footer, ArticleCard)
/lib                   # Core logic
  types.ts             # TypeScript types
  sources.ts           # News source configuration
  ingestion.ts         # RSS feed fetching & deduplication
  translation.ts       # LLM translation service
  storage.ts           # JSON file storage
/scripts
  ingest.ts            # CLI ingestion script
/data
  articles.json        # Article database (created on first ingest)
```

## Adding News Sources

Edit `lib/sources.ts` to add or remove RSS feeds:

```typescript
{
  id: 'source-id',
  name: 'Source Name',
  feedUrl: 'https://example.com/rss',
  websiteUrl: 'https://example.com',
  enabled: true,
}
```

**Note:** Respect `robots.txt` and terms of service. Only use official RSS feeds.

## Scheduling Ingestion

### Option 1: Cron (Linux/macOS)

```bash
# Run every 30 minutes
*/30 * * * * cd /path/to/polder-post && npm run ingest
```

### Option 2: GitHub Actions

Create `.github/workflows/ingest.yml`:

```yaml
name: Ingest News
on:
  schedule:
    - cron: '*/30 * * * *'  # Every 30 minutes
  workflow_dispatch:

jobs:
  ingest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run ingest
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
      - name: Commit articles
        run: |
          git config user.name "Bot"
          git config user.email "bot@example.com"
          git add data/articles.json
          git commit -m "Update articles" || true
          git push
```

### Option 3: Vercel Cron Jobs

For Vercel deployments, create `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/cron/ingest",
    "schedule": "0 */1 * * *"
  }]
}
```

Then create `app/api/cron/ingest/route.ts` (implement ingestion as API route).

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard under Settings → Environment Variables.

### Netlify

```bash
npm run build
# Deploy /out directory
```

### Static Export

```bash
npm run build
```

Deploy the generated `.next` output to any static host.

## Configuration

### Site Name

The site name "Polder Post" can be changed in:
- `components/Header.tsx`
- `components/Footer.tsx`
- `app/layout.tsx` (metadata)
- `README.md`

### Styling

- Typography: Edit `app/globals.css` (CSS variables for fonts)
- Colors: Edit CSS custom properties in `app/globals.css`
- Layout: Edit component files in `/components`

### Translation Prompt

The translation prompt and editorial style can be customized in `lib/translation.ts` under `SYSTEM_PROMPT`.

## Design Principles

This site follows **Impeccable** design standards:

- **Strong typography** with editorial hierarchy (Merriweather serif headings, Inter body)
- **Clear information architecture** - scannable, predictable
- **Performance first** - minimal JavaScript, optimized images
- **Accessible** - semantic HTML, ARIA labels, keyboard navigation
- **Responsive** - mobile-first, works on all screen sizes
- **Professional** - clean, trustworthy, authoritative

## License

MIT License - see LICENSE file

## Attribution

All news content is sourced from and attributed to respected Dutch news outlets. This site does not claim ownership of any news content.

Sources include: NOS, NU.nl, RTL Nieuws, AD, Het Parool, NRC, de Volkskrant, Telegraaf, and others.

## Credits

Inspired by [NL Times](https://nltimes.nl) and [DutchNews](https://dutchnews.nl).

Built with [Impeccable](https://github.com/pbakaus/impeccable) design guidance.
