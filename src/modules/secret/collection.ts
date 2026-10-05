// Books and records come from Notion at build time; see the `books` and `records` collections in ./content.ts.
import { getCollection, type CollectionEntry } from 'astro:content';

// Book fields:
// - isbn: ISBN-13 of the edition owned or wanted, digits only
// - coverId: Open Library cover ID, from the book's record on openlibrary.org
// - coverUrl: any image URL, for editions without an Open Library cover; used instead of coverId
// - coverCrop: part of the cover image to show, as percentages of its width and height; for mockup images
export type Book = CollectionEntry<'books'>['data'];

// Record fields:
// - discogsReleaseId: the number in a Discogs release URL (discogs.com/release/<id>-...)
// - cover: that release's front image, fetched from Discogs at build time
export type Vinyl = CollectionEntry<'records'>['data'];

export type CoverCrop = NonNullable<Book['coverCrop']>;

// What a modal shows for one book or record.
export interface CollectionItem {
  title: string;
  by: string;
  note?: string;
  cover?: string;
  crop?: CoverCrop;
  wishlist: boolean;
}

const bookCover = (b: Book) =>
  b.coverUrl ?? (b.coverId ? `https://covers.openlibrary.org/b/id/${b.coverId}-L.jpg` : undefined);

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

// Owned items first, then the wishlist, each in data order.
const ownedFirst = (items: CollectionItem[]) => [...items.filter(i => !i.wishlist), ...items.filter(i => i.wishlist)];

export async function getBookItems(): Promise<CollectionItem[]> {
  const books = (await getCollection('books')).map(e => e.data).sort(byOrder);
  return ownedFirst(books.map(b => ({
    title: b.title,
    by: b.author,
    note: b.note,
    cover: bookCover(b),
    crop: b.coverCrop,
    wishlist: b.status === 'wishlist',
  })));
}

export async function getVinylItems(): Promise<CollectionItem[]> {
  const vinyls = (await getCollection('records')).map(e => e.data).sort(byOrder);
  return ownedFirst(vinyls.map(v => ({
    title: v.title,
    by: v.year ? `${v.artist}, ${v.year}` : v.artist,
    note: v.note,
    cover: v.cover,
    wishlist: v.status === 'wishlist',
  })));
}
