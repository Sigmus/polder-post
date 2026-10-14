# Product Context

## Product Name
Polder Post (working title, easily configurable)

## What It Is
An English-language news aggregation site for expats living in the Netherlands. Polls respected Dutch news outlets (NOS, NU.nl, RTL Nieuws, AD, Het Parool, NRC, de Volkskrant, Telegraaf, and others), translates/summarizes important stories into English, and publishes them with clear attribution and links back to the original Dutch sources.

## Target Users
- English-speaking expats, international workers, and foreign residents in the Netherlands
- People who want to stay informed about Dutch news but don't read Dutch fluently
- Users expect quality journalism standards: accuracy, attribution, no fabrication
- Mobile-first audience checking news throughout the day

## User Goals
- Quickly understand what's happening in the Netherlands today
- Read concise English summaries of important Dutch news
- Access stories by topic (Politics, Economy, Amsterdam, Society, Crime, Tech, Sport, Culture, Weather/Traffic)
- Always see the source and be able to read the original Dutch article
- Trust that the content is real, attributed journalism

## Product Principles
1. **Transparency First**: Every story shows its source outlet and links to the original Dutch article
2. **Quality Over Speed**: Only translate/publish stories from respectable outlets
3. **Editorial Voice**: Neutral, concise NL Times/DutchNews-like style that explains Dutch context for expats
4. **No Fabrication**: Never invent facts, quotes, or content beyond the sources
5. **Accessibility**: Fast, readable on all devices, WCAG AA compliant

## Mode
**Read** - Visitors come to understand what's happening in the Netherlands. Structure for comprehension and make the reading experience worth staying in. Clear information hierarchy, scannable headlines, clean typography.

## Visual Direction
- **Distinctive editorial news design** (not generic template)
- Strong typography with clear hierarchy
- Professional, trustworthy, authoritative
- Clean and uncluttered
- Fast and lightweight
- Light and dark modes
- Mobile-first responsive design
- High craft attention to detail

## Technical Constraints
- Static/ISR generation for cheap hosting
- RSS feed ingestion only (respect robots.txt)
- LLM translation pluggable via env vars (OpenAI/Anthropic)
- Fallback mode works without API keys (untranslated links)
- Scheduled runs every 30-60 minutes
- No fabricated demo content

## Key Surfaces
1. Homepage - Lead story + latest stories + section navigation
2. Section pages - Stories filtered by category
3. Article page - English summary, attribution, link to original, metadata
4. About page - Sourcing policy and transparency
5. Search - Find stories

## Success Metrics
- Stories are accurate translations/summaries
- Sources are always clearly attributed
- Site loads fast and works on all devices
- Accessible (WCAG AA)
- Users can easily find and read stories
