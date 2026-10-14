import type { Source } from './types';

export const NEWS_SOURCES: Source[] = [
  {
    id: 'nos',
    name: 'NOS',
    feedUrl: 'https://feeds.nos.nl/nosnieuwsalgemeen',
    websiteUrl: 'https://nos.nl',
    enabled: true,
  },
  {
    id: 'nu',
    name: 'NU.nl',
    feedUrl: 'https://www.nu.nl/rss/Algemeen',
    websiteUrl: 'https://nu.nl',
    enabled: true,
  },
  {
    id: 'rtl',
    name: 'RTL Nieuws',
    feedUrl: 'https://www.rtlnieuws.nl/feeds/algemeen.xml',
    websiteUrl: 'https://rtlnieuws.nl',
    enabled: true,
  },
  {
    id: 'ad',
    name: 'AD',
    feedUrl: 'https://www.ad.nl/rss.xml',
    websiteUrl: 'https://ad.nl',
    enabled: true,
  },
  {
    id: 'parool',
    name: 'Het Parool',
    feedUrl: 'https://www.parool.nl/feed',
    websiteUrl: 'https://parool.nl',
    enabled: true,
  },
];
