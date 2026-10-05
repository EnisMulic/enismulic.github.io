// The shelf shared by the Books and Records widgets: owned items and a wishlist, shown as covers.
import { z } from 'astro/zod';
import { text, type NotionPage } from '../../lib/notion';

// Part of a cover image to show, as percentages of its width and height.
export interface CoverCrop { x: number; y: number; w: number; h: number }

// What the shelf modal shows for one book or record.
export interface CollectionItem {
  title: string;
  by: string;
  note?: string;
  cover?: string;
  crop?: CoverCrop;
  wishlist: boolean;
}

// The Notion Status column: "Wishlist" puts an item on the wishlist, anything else counts as owned.
export const status = (page: NotionPage) => (text(page, 'Status')?.toLowerCase() === 'wishlist' ? 'wishlist' : 'owned');
export const statusSchema = z.enum(['owned', 'wishlist']);

export const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

// Owned items first, then the wishlist, each in data order.
export const ownedFirst = (items: CollectionItem[]) => [...items.filter(i => !i.wishlist), ...items.filter(i => i.wishlist)];

export const ownedCount = (items: CollectionItem[]) => items.filter(i => !i.wishlist).length;
export const wishlistTag = (items: CollectionItem[]) => `${items.filter(i => i.wishlist).length} on the wishlist`;
