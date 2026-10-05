import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { order } from '../../lib/content';
import { notionRows, number, text, type NotionPage } from '../../lib/notion';
import { status, statusSchema } from '../shelf/shelf';

// Notion data source; the ID isn't secret, the token is (see .env).
const NOTION_BOOKS = '3eca0400-5d2c-8029-bca9-000b92400183';

// "x, y, w, h" as percentages of the cover image.
const crop = (page: NotionPage) => {
  const parts = text(page, 'Cover Crop')?.split(',').map(Number);
  return parts?.length === 4 ? { x: parts[0], y: parts[1], w: parts[2], h: parts[3] } : undefined;
};

// Fields:
// - isbn: ISBN-13 of the edition owned or wanted, digits only
// - coverId: Open Library cover ID, from the book's record on openlibrary.org
// - coverUrl: any image URL, for editions without an Open Library cover; used instead of coverId
// - coverCrop: part of the cover image to show, as percentages of its width and height; for mockup images
export const books = defineCollection({
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
    status: statusSchema,
    note: z.string().optional(),
    coverId: z.number().int().optional(),
    coverUrl: z.url().optional(),
    coverCrop: z.object({ x: z.number(), y: z.number(), w: z.number(), h: z.number() }).optional(),
  }),
});
