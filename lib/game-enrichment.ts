import type { Game } from './types';

const CANONICAL_CATEGORIES = [
  'Action', 'Adventure', 'Arcade', 'Board', 'Casual', 'Girls', 'Multiplayer',
  'Puzzle', 'Racing', 'Shooting', 'Sports', '2 Player'
] as const;

type CanonicalCategory = typeof CANONICAL_CATEGORIES[number];

const categoryAliases: Record<string, CanonicalCategory> = {
  action: 'Action', adventure: 'Adventure', arcade: 'Arcade', board: 'Board', casual: 'Casual',
  girls: 'Girls', girl: 'Girls', multiplayer: 'Multiplayer', puzzle: 'Puzzle', racing: 'Racing',
  race: 'Racing', shooting: 'Shooting', shooter: 'Shooting', sports: 'Sports', sport: 'Sports',
  '2 player': '2 Player', '2-player': '2 Player', 'two player': '2 Player', 'two-player': '2 Player'
};

const categoryKeywords: Array<[CanonicalCategory, string[]]> = [
  ['2 Player', ['2 player', 'two player', '2-player', 'two-player', 'versus']],
  ['Racing', ['racing', 'race', 'racer', 'car ', 'cars ', 'drift', 'driving', 'driver', 'bike', 'moto', 'motorcycle', 'parking', 'truck']],
  ['Sports', ['football', 'soccer', 'basketball', 'cricket', 'tennis', 'golf', 'baseball', 'hockey', 'penalty', 'sports', 'boxing']],
  ['Shooting', ['shooting', 'shooter', 'sniper', ' gun', 'guns', 'fps', 'weapon', 'archery']],
  ['Puzzle', ['puzzle', 'brain', 'match 3', 'match-3', 'merge', 'mahjong', 'sudoku', 'jigsaw', 'word game', 'quiz', 'tiles']],
  ['Board', ['chess', 'checkers', 'ludo', 'board game', 'backgammon', 'solitaire']],
  ['Multiplayer', ['multiplayer', 'battle royale', '.io ', ' io game', 'online arena']],
  ['Girls', ['makeover', 'make up', 'makeup', 'dress up', 'dress-up', 'fashion', 'princess', 'salon']],
  ['Adventure', ['adventure', 'quest', 'platformer', 'runner', 'running', 'escape', 'island', 'explore']],
  ['Action', ['action', 'battle', 'combat', 'fight', 'fighter', 'ninja', 'zombie', 'survival', 'warrior']],
  ['Arcade', ['arcade', 'retro', 'endless', 'high score']]
];

function cleanText(value: unknown): string {
  return String(value ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleFromSlug(slug: string): string {
  return cleanText(slug)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

function cleanTitle(title: unknown, slug: string): string {
  const value = cleanText(title);
  if (value && !/^imported game\s+\d+$/i.test(value)) return value.slice(0, 90);
  return titleFromSlug(slug).slice(0, 90) || 'Browser Game';
}

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function canonicalCategory(raw: unknown): CanonicalCategory | null {
  const parts = cleanText(raw).toLowerCase().split(/[|,;/]+/).map(v => v.trim()).filter(Boolean);
  for (const part of parts) {
    if (categoryAliases[part]) return categoryAliases[part];
  }
  return null;
}

export function inferGameCategory(title: string, description = '', rawCategory = ''): CanonicalCategory {
  const existing = canonicalCategory(rawCategory);
  if (existing) return existing;

  const haystack = ` ${cleanText(title)} ${cleanText(description)} ${cleanText(rawCategory)} `.toLowerCase();
  for (const [category, keywords] of categoryKeywords) {
    if (keywords.some(keyword => haystack.includes(keyword))) return category;
  }
  return 'Casual';
}

function ensureSentence(value: string): string {
  const text = value.trim().replace(/[.!?]+$/g, '');
  return text ? `${text}.` : '';
}

function trimAtWord(value: string, max: number): string {
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > max * 0.65 ? lastSpace : cut.length).trim()}…`;
}

function buildDescription(title: string, category: string, original: string, key: string): string {
  const source = cleanText(original);
  const suffixes = [
    `Play ${title} instantly in your browser on MADGAMES.FUN.`,
    `${title} is available to play free online on desktop and supported mobile devices.`,
    `Jump into ${title} online with quick browser play and no download required.`,
    `Start ${title} free on MADGAMES.FUN whenever you want a quick ${category.toLowerCase()} game.`,
    `Enjoy ${title} as a free ${category.toLowerCase()} browser game on MADGAMES.FUN.`,
    `Launch ${title} online and get straight into this ${category.toLowerCase()} game from your browser.`
  ];
  const suffix = suffixes[hash(key) % suffixes.length];

  if (source.length >= 55) {
    const first = ensureSentence(trimAtWord(source, 260));
    return `${first} ${suffix}`.trim();
  }

  const fallbacks = [
    `${title} is a free ${category.toLowerCase()} browser game you can start instantly. ${suffix}`,
    `Play ${title}, a quick ${category.toLowerCase()} game built for easy browser play. ${suffix}`,
    `${title} brings simple online ${category.toLowerCase()} gameplay to your browser. ${suffix}`,
    `Looking for a quick ${category.toLowerCase()} game? ${title} is ready to play online. ${suffix}`
  ];
  return fallbacks[hash(`${key}-fallback`) % fallbacks.length];
}

function buildSeoDescription(title: string, category: string, key: string): string {
  const variants = [
    `Play ${title} online free on MADGAMES.FUN. Start this ${category.toLowerCase()} browser game instantly on desktop or mobile.`,
    `${title} is free to play online on MADGAMES.FUN. Launch this ${category.toLowerCase()} game instantly in your browser.`,
    `Play ${title} free in your browser on MADGAMES.FUN — a quick ${category.toLowerCase()} game with no download required.`,
    `Start ${title} online for free on MADGAMES.FUN. Enjoy instant ${category.toLowerCase()} browser gameplay on supported devices.`
  ];
  return trimAtWord(variants[hash(`${key}-seo`) % variants.length], 158);
}

function safeThumbnail(value: unknown): string | null {
  const url = cleanText(value).replaceAll('"', '');
  if (!url) return null;
  if (url.startsWith('/')) return url;
  if (url.startsWith('//')) return `https:${url}`;
  if (/^https?:\/\//i.test(url)) return url;
  return null;
}

function fallbackThumbnail(slug: string, title: string, category: string): string {
  return `/api/thumbnail/${encodeURIComponent(slug)}?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`;
}

function uniqueStrings(values: Array<string | null | undefined>): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const value of values) {
    const clean = cleanText(value);
    if (!clean) continue;
    const key = clean.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(clean);
  }
  return out;
}

export function enrichGameForSeo(game: Game): Game {
  const slug = cleanText(game.slug) || `game-${hash(`${game.provider}-${game.providerGameId || game.id}`)}`;
  const title = cleanTitle(game.title, slug);
  const category = inferGameCategory(title, game.description || '', game.category || game.categories?.[0] || '');
  const key = `${game.provider || 'game'}:${game.providerGameId || game.id || slug}:${slug}`;
  const description = buildDescription(title, category, game.description || '', key);
  const thumbnailUrl = safeThumbnail(game.thumbnailUrl) || fallbackThumbnail(slug, title, category);
  const categories = uniqueStrings([category, ...(game.categories || [])]).filter(v => Boolean(canonicalCategory(v)));
  const tags = uniqueStrings([...(game.tags || []), category.toLowerCase(), 'browser-game', 'free-online-game']);

  return {
    ...game,
    title,
    slug,
    category,
    categories: categories.length ? categories : [category],
    description,
    seoDescription: buildSeoDescription(title, category, key),
    thumbnailUrl,
    tags
  };
}
