import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { AwsClient } from 'aws4fetch';
import exifr from 'exifr';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().optional().default(false),
  }),
});

// Notion data sources for the secret page's collections. IDs aren't secret; the token is (see .env).
const NOTION_BOOKS = '3eca0400-5d2c-8029-bca9-000b92400183';
const NOTION_VINYL = '3eca0400-5d2c-8022-9e35-000bfa397aa0';
const NOTION_LETTERBOXD = '3eea0400-5d2c-800e-ba15-000b8a738ac4';

type NotionProperty = { type: string; [key: string]: any };
type NotionPage = { id: string; properties: Record<string, NotionProperty> };

// Reads a setting from .env locally, or from the environment in CI.
// Pull requests from Dependabot and forks get no secrets, so a missing value only fails the build
// when DATA_REQUIRED is 'true' (set by CI for deploys); otherwise the collections it feeds are left empty.
function setting(name: string, feeds: string): string | undefined {
  try { process.loadEnvFile(); } catch {}
  const value = process.env[name];
  if (value) return value;
  if (process.env.DATA_REQUIRED === 'true') throw new Error(`${name} is not set, and this build deploys. Add it to the CI environment.`);
  console.warn(`${name} is not set; ${feeds} will be empty.`);
  return undefined;
}

const notionToken = () => setting('NOTION_API_TOKEN', 'books and records');

// All rows of a data source, oldest first, following pagination.
async function notionRows(dataSourceId: string): Promise<NotionPage[]> {
  const token = notionToken();
  if (!token) return [];
  const rows: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_size: 100,
        start_cursor: cursor,
        sorts: [{ timestamp: 'created_time', direction: 'ascending' }],
      }),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(`Notion query for ${dataSourceId} failed (${res.status}): ${body.message}`);
    rows.push(...body.results);
    cursor = body.has_more ? body.next_cursor : undefined;
  } while (cursor);
  return rows;
}

// Reads a property as text, whatever its type (columns may be text, number, URL or select).
function text(page: NotionPage, name: string): string | undefined {
  const p = page.properties[name];
  if (!p) return undefined;
  const value = p[p.type];
  let out: string | undefined;
  if (p.type === 'title' || p.type === 'rich_text') out = value.map((t: { plain_text: string }) => t.plain_text).join('');
  else if (p.type === 'select' || p.type === 'status') out = value?.name;
  else if (value !== null && value !== undefined) out = String(value);
  return out?.trim() || undefined;
}

const number = (page: NotionPage, name: string) => {
  const t = text(page, name);
  return t ? Number(t) : undefined;
};

const status = (page: NotionPage) => (text(page, 'Status')?.toLowerCase() === 'wishlist' ? 'wishlist' : 'owned');

// "x, y, w, h" as percentages of the cover image.
const crop = (page: NotionPage) => {
  const parts = text(page, 'Cover Crop')?.split(',').map(Number);
  return parts?.length === 4 ? { x: parts[0], y: parts[1], w: parts[2], h: parts[3] } : undefined;
};

const status_ = z.enum(['owned', 'wishlist']);
// Position in Notion, oldest first; the content store doesn't keep the loader's order.
const order = z.number().int();

const books = defineCollection({
  loader: async () => (await notionRows(NOTION_BOOKS)).map((page, order) => ({
    id: page.id,
    order,
    title: text(page, 'Title'),
    author: text(page, 'Author'),
    isbn: text(page, 'ISBN'),
    status: status(page),
    note: text(page, 'Note'),
    coverId: number(page, 'Cover ID'),
    coverUrl: text(page, 'Cover URL'),
    coverCrop: crop(page),
  })),
  schema: z.object({
    order,
    title: z.string(),
    author: z.string(),
    isbn: z.string().optional(),
    status: status_,
    note: z.string().optional(),
    coverId: z.number().int().optional(),
    coverUrl: z.url().optional(),
    coverCrop: z.object({ x: z.number(), y: z.number(), w: z.number(), h: z.number() }).optional(),
  }),
});

// Front cover of a Discogs release, or undefined (with a warning) if it can't be fetched.
// Requests go one at a time; without a token Discogs allows 25 a minute, so a 429 waits a minute and retries once.
async function discogsCover(releaseId: string, retried = false): Promise<string | undefined> {
  const res = await fetch(`https://api.discogs.com/releases/${releaseId}`, {
    headers: { 'User-Agent': 'enismulic.github.io/1.0 +https://enismulic.github.io' },
  });
  if (res.status === 429 && !retried) {
    await new Promise(resolve => setTimeout(resolve, 60_000));
    return discogsCover(releaseId, true);
  }
  if (!res.ok) {
    console.warn(`Discogs release ${releaseId}: no cover (HTTP ${res.status})`);
    return undefined;
  }
  const release = await res.json();
  const images: { type: string; uri: string }[] = release.images ?? [];
  return (images.find(i => i.type === 'primary') ?? images[0])?.uri;
}

const records = defineCollection({
  loader: async () => {
    const rows = [];
    for (const [order, page] of (await notionRows(NOTION_VINYL)).entries()) {
      const discogsReleaseId = text(page, 'DiscogsReleaseId');
      rows.push({
        id: page.id,
        order,
        title: text(page, 'Title'),
        artist: text(page, 'Artist'),
        year: number(page, 'Year'),
        status: status(page),
        note: text(page, 'Note'),
        discogsReleaseId,
        cover: discogsReleaseId ? await discogsCover(discogsReleaseId) : undefined,
      });
    }
    return rows;
  },
  schema: z.object({
    order,
    title: z.string(),
    artist: z.string(),
    year: z.number().int().optional(),
    status: status_,
    note: z.string().optional(),
    discogsReleaseId: z.string().optional(),
    cover: z.url().optional(),
  }),
});

// The NYT session cookie (NYT-S) of the account whose game stats the secret page shows. It's a login, so keep it secret.
const nytCookie = () => setting('NYT_COOKIE', 'Connections stats');

// One entry, 'stats': lifetime Connections stats from the NYT Games state endpoint.
const connections = defineCollection({
  loader: async () => {
    const cookie = nytCookie();
    if (!cookie) return [];
    const res = await fetch('https://www.nytimes.com/svc/games/state/connections/latests', {
      headers: { Cookie: `NYT-S=${cookie}`, 'User-Agent': 'Mozilla/5.0' },
    });
    if (!res.ok) throw new Error(`NYT Games stats failed (HTTP ${res.status}); NYT_COOKIE may have expired.`);
    const all = (await res.json()).player?.stats;
    const stats = all?.connections;
    if (!stats) throw new Error('NYT Games stats have no Connections data; NYT_COOKIE may be logged out.');
    return [{
      id: 'stats',
      currentStreak: stats.current_streak,
      maxStreak: stats.max_streak,
      played: stats.puzzles_completed,
      won: stats.puzzles_won,
      lastPlayed: stats.last_played_print_date,
      // Games by mistakes made, 0 to 4; four mistakes loses the game
      mistakes: [0, 1, 2, 3, 4].map(n => stats.mistakes?.[n] ?? 0),
      // Wins solving the purple (hardest) group first, and solving purple, blue, green, yellow in that order
      purpleFirst: all.cxns_prpl_frst?.purple_first_wins ?? 0,
      reverseRainbow: all.cxns_reverse_rainbow?.reverse_rainbow_wins ?? 0,
    }];
  },
  schema: z.object({
    currentStreak: z.number().int(),
    maxStreak: z.number().int(),
    played: z.number().int(),
    won: z.number().int(),
    lastPlayed: z.string().optional(),
    mistakes: z.array(z.number().int()).length(5),
    purpleFirst: z.number().int(),
    reverseRainbow: z.number().int(),
  }),
});

// One entry, 'stats': Letterboxd profile totals, copied by hand into a one-row Notion database.
const letterboxd = defineCollection({
  loader: async () => {
    const [page] = await notionRows(NOTION_LETTERBOXD);
    if (!page) return [];
    return [{ id: 'stats', films: number(page, 'Films'), thisYear: number(page, 'This Year') }];
  },
  schema: z.object({
    films: z.number().int(),
    thisYear: z.number().int(),
  }),
});

// Cloudflare R2 bucket for the secret page's photo album. Photos are uploaded through the Cloudflare dashboard,
// already resized, and the build lists whatever is in the bucket. None of these are secret; the API token is (see .env).
const R2_ACCOUNT_ID = 'f0663c2fc98e1355c81969f7ffcabb77';
const R2_BUCKET = 'album';
// The bucket's public URL, e.g. https://pub-xxxx.r2.dev
const R2_PUBLIC_URL = 'https://pub-1b0e1ef0dac041e4abc1622724762bdc.r2.dev';
const PHOTO_TYPES = /\.(jpe?g|png|webp|avif)$/i;

const decodeXml = (s: string) => s.replace(/&(amp|lt|gt|quot|apos);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" })[e as string]!);

// EXIF capture time ("2024:10:06 15:27:24") as YYYY-MM-DDTHH:mm, the local time on the camera. It's read as text,
// not a Date, because cameras don't record a time zone.
function takenAt(exif: { DateTimeOriginal?: unknown } | undefined) {
  const m = String(exif?.DateTimeOriginal ?? '').match(/^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}` : undefined;
}

// Place from the filename, which ends in _City_Country after whatever name the camera gave it. Leading parts with
// digits or a camera prefix (IMG, PXL, DSC...) are the camera's name and are dropped. The last part left is the
// country; hyphens stand for spaces, as in "New-York_United-States".
// "20241006_152723_Milan_Italy.jpg" and "1000013547_Milan_Italy.jpg" give "Milan, Italy"; "20241006_152723.jpg" gives nothing.
function placeFromName(key: string) {
  const parts = key.split('/').pop()!.replace(PHOTO_TYPES, '').split('_').filter(Boolean);
  while (parts.length && (/\d/.test(parts[0]) || /^(IMG|PXL|DSC|DSCN|DCIM|PHOTO)$/i.test(parts[0]))) parts.shift();
  if (parts.length === 0) return undefined;
  const [country, ...city] = parts.map(part => part.replace(/-/g, ' ')).reverse();
  return city.length ? `${city.reverse().join(' ')}, ${country}` : country;
}

// Every photo in the bucket, oldest first by the date it was taken, falling back to when it was uploaded.
const photos = defineCollection({
  loader: async () => {
    // A read-only R2 API token for the bucket
    const keyId = setting('R2_ACCESS_KEY_ID', 'the photo album');
    const secret = setting('R2_SECRET_ACCESS_KEY', 'the photo album');
    if (!keyId || !secret) return [];
    if (!R2_ACCOUNT_ID || !R2_BUCKET || !R2_PUBLIC_URL) throw new Error('Set the R2 bucket constants in src/content.config.ts.');
    const r2 = new AwsClient({ accessKeyId: keyId, secretAccessKey: secret, service: 's3', region: 'auto' });
    const endpoint = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${R2_BUCKET}`;

    const objects: { key: string; uploaded: string }[] = [];
    let token: string | undefined;
    do {
      const query = new URLSearchParams({ 'list-type': '2', ...(token && { 'continuation-token': token }) });
      const res = await r2.fetch(`${endpoint}?${query}`);
      const xml = await res.text();
      if (!res.ok) throw new Error(`Listing R2 bucket ${R2_BUCKET} failed (HTTP ${res.status}): ${xml}`);
      for (const [, item] of xml.matchAll(/<Contents>(.*?)<\/Contents>/gs)) {
        objects.push({
          key: decodeXml(item.match(/<Key>(.*?)<\/Key>/s)![1]),
          uploaded: item.match(/<LastModified>(.*?)<\/LastModified>/s)![1],
        });
      }
      token = xml.match(/<NextContinuationToken>(.*?)<\/NextContinuationToken>/s)?.[1];
    } while (token);

    const rows = [];
    for (const { key, uploaded } of objects) {
      if (!PHOTO_TYPES.test(key)) {
        if (!key.endsWith('/')) console.warn(`R2 photo ${key}: not a JPEG, PNG, WebP or AVIF, skipped`);
        continue;
      }
      const path = key.split('/').map(encodeURIComponent).join('/');
      // EXIF sits at the start of the file, so the first 128 KB is enough
      const head = await r2.fetch(`${endpoint}/${path}`, { headers: { Range: 'bytes=0-131071' } });
      const exif = await exifr
        .parse(new Uint8Array(await head.arrayBuffer()), { pick: ['DateTimeOriginal', 'GPSLatitude'], reviveValues: false })
        .catch(() => undefined);
      if (exif?.GPSLatitude) console.warn(`R2 photo ${key}: contains GPS location, which anyone can read from the public file`);
      rows.push({
        id: key,
        url: `${R2_PUBLIC_URL.replace(/\/$/, '')}/${path}`,
        taken: takenAt(exif),
        place: placeFromName(key),
        uploaded: uploaded.slice(0, 10),
      });
    }
    return rows
      .sort((a, b) => (a.taken ?? a.uploaded).localeCompare(b.taken ?? b.uploaded))
      .map((row, order) => ({ ...row, order }));
  },
  schema: z.object({
    order,
    url: z.url(),
    // YYYY-MM-DDTHH:mm from EXIF, if the camera recorded it
    taken: z.string().optional(),
    place: z.string().optional(),
    // YYYY-MM-DD the file was uploaded to R2
    uploaded: z.string(),
  }),
});

export const collections = { blog, books, records, connections, letterboxd, photos };
