export interface Source {
  id: string;
  name: string;
  feedUrl: string;
  websiteUrl: string;
  enabled: boolean;
}

export interface RawArticle {
  sourceId: string;
  sourceName: string;
  originalUrl: string;
  originalTitle: string;
  originalContent: string;
  publishedAt: Date;
  guid: string;
}

export interface Article {
  id: string;
  slug: string;
  englishTitle: string;
  englishSummary: string;
  sourceName: string;
  sourceUrl: string;
  originalUrl: string;
  originalTitle: string;
  publishedAt: Date;
  updatedAt: Date;
  section: Section;
  featured: boolean;
  translated: boolean;
}

export type Section =
  | 'politics'
  | 'economy'
  | 'amsterdam'
  | 'society'
  | 'crime'
  | 'tech'
  | 'sport'
  | 'culture'
  | 'weather';

export const SECTIONS: { id: Section; label: string }[] = [
  { id: 'politics', label: 'Politics' },
  { id: 'economy', label: 'Economy' },
  { id: 'amsterdam', label: 'Amsterdam' },
  { id: 'society', label: 'Society' },
  { id: 'crime', label: 'Crime' },
  { id: 'tech', label: 'Tech' },
  { id: 'sport', label: 'Sport' },
  { id: 'culture', label: 'Culture' },
  { id: 'weather', label: 'Weather' },
];
