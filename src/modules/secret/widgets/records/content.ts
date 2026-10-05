import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { order } from '../../lib/content';
import { notionRows, number, text } from '../../lib/notion';
import { status, statusSchema } from '../shelf/shelf';

// Notion data source; the ID isn't secret, the token is (see .env).
const NOTION_VINYL = '3eca0400-5d2c-8022-9e35-000bfa397aa0';

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

// Fields:
// - discogsReleaseId: the number in a Discogs release URL (discogs.com/release/<id>-...)
// - cover: that release's front image, fetched from Discogs at build time
export const records = defineCollection({
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
    status: statusSchema,
    note: z.string().optional(),
    discogsReleaseId: z.string().optional(),
    cover: z.url().optional(),
  }),
});
