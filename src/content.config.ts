import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

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

type NotionProperty = { type: string; [key: string]: any };
type NotionPage = { id: string; properties: Record<string, NotionProperty> };

// Loads NOTION_API_TOKEN from .env locally; in CI it comes from the environment.
function notionToken() {
  try { process.loadEnvFile(); } catch {}
  const token = process.env.NOTION_API_TOKEN;
  if (!token) throw new Error('NOTION_API_TOKEN is not set. Add it to .env, or to the CI environment.');
  return token;
}

// All rows of a data source, oldest first, following pagination.
async function notionRows(dataSourceId: string): Promise<NotionPage[]> {
  const token = notionToken();
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

const records = defineCollection({
  loader: async () => (await notionRows(NOTION_VINYL)).map((page, order) => ({
    id: page.id,
    order,
    title: text(page, 'Title'),
    artist: text(page, 'Artist'),
    year: number(page, 'Year'),
    status: status(page),
    note: text(page, 'Note'),
    mbid: text(page, 'MBID'),
    releaseId: text(page, 'Release ID'),
  })),
  schema: z.object({
    order,
    title: z.string(),
    artist: z.string(),
    year: z.number().int().optional(),
    status: status_,
    note: z.string().optional(),
    mbid: z.string().optional(),
    releaseId: z.string().optional(),
  }),
});

export const collections = { blog, books, records };
