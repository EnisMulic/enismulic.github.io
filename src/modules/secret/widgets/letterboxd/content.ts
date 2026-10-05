import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { notionRows, number } from '../../lib/notion';

// Notion data source; the ID isn't secret, the token is (see .env).
const NOTION_LETTERBOXD = '3eea0400-5d2c-800e-ba15-000b8a738ac4';

// One entry, 'stats': Letterboxd profile totals, copied by hand into a one-row Notion database.
export const letterboxd = defineCollection({
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
