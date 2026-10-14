import type { RawArticle, Article, Section } from './types';

const SYSTEM_PROMPT = `You are a professional news translator and editor for an English-language news site serving expats in the Netherlands. Your role is to:

1. Translate Dutch news articles into clear, neutral English
2. Write concise summaries (150-350 words) in the style of NL Times or DutchNews
3. Explain Dutch context that expats might not understand
4. Keep Dutch terms in italics with brief translations (e.g., "*gemeente* (municipality)")
5. Always attribute information ("NOS reports...", "according to AD...")
6. Be factual and neutral - never invent facts, quotes, or content beyond the source
7. Categorize the article into one of: politics, economy, amsterdam, society, crime, tech, sport, culture, weather

Return a JSON object with:
{
  "englishTitle": "clear, engaging headline in English",
  "englishSummary": "150-350 word summary with Dutch context explained",
  "section": "one of the categories above"
}`;

interface TranslationResult {
  englishTitle: string;
  englishSummary: string;
  section: Section;
}

export async function translateArticle(
  article: RawArticle
): Promise<TranslationResult | null> {
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!openaiKey && !anthropicKey) {
    return null;
  }

  try {
    if (anthropicKey) {
      return await translateWithAnthropic(article, anthropicKey);
    } else if (openaiKey) {
      return await translateWithOpenAI(article, openaiKey);
    }
  } catch (error) {
    console.error('Translation error:', error);
    return null;
  }

  return null;
}

async function translateWithAnthropic(
  article: RawArticle,
  apiKey: string
): Promise<TranslationResult> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Source: ${article.sourceName}
Original Title: ${article.originalTitle}
Content: ${article.originalContent.slice(0, 2000)}

Translate and summarize this Dutch news article.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`);
  }

  const data = await response.json();
  const textContent = data.content[0].text;

  const jsonMatch = textContent.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in response');
  }

  return JSON.parse(jsonMatch[0]);
}

async function translateWithOpenAI(
  article: RawArticle,
  apiKey: string
): Promise<TranslationResult> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Source: ${article.sourceName}
Original Title: ${article.originalTitle}
Content: ${article.originalContent.slice(0, 2000)}

Translate and summarize this Dutch news article.`,
        },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

export function createFallbackArticle(
  raw: RawArticle,
  id: string
): Article {
  return {
    id,
    slug: generateSlug(raw.originalTitle),
    englishTitle: raw.originalTitle,
    englishSummary: raw.originalContent.slice(0, 300) + '...',
    sourceName: raw.sourceName,
    sourceUrl: raw.originalUrl,
    originalUrl: raw.originalUrl,
    originalTitle: raw.originalTitle,
    publishedAt: raw.publishedAt,
    updatedAt: new Date(),
    section: 'society',
    featured: false,
    translated: false,
  };
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 100);
}
