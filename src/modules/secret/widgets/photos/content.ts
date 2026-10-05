import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { AwsClient } from 'aws4fetch';
import exifr from 'exifr';
import { order, setting } from '../../lib/content';

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
export const photos = defineCollection({
  loader: async () => {
    // A read-only R2 API token for the bucket
    const keyId = setting('R2_ACCESS_KEY_ID', 'the photo album');
    const secret = setting('R2_SECRET_ACCESS_KEY', 'the photo album');
    if (!keyId || !secret) return [];
    if (!R2_ACCOUNT_ID || !R2_BUCKET || !R2_PUBLIC_URL) throw new Error('Set the R2 bucket constants in src/modules/secret/widgets/photos/content.ts.');
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
