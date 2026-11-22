import { getImage } from 'astro:assets';

// A WebP copy of a remote image, made at build time and scaled down to `width` pixels wide (never up). If the image
// can't be fetched or decoded, the original URL is returned, so one broken cover doesn't fail the build.
export async function resized(src: string, width: number) {
  width = Math.round(width);
  try {
    // Width alone with inferSize keeps the original height (Astro fills it in before working out the aspect ratio),
    // so the image is fitted inside a box only its width limits instead
    return (await getImage({ src, width, height: width * 10, fit: 'inside', format: 'webp' })).src;
  } catch (e) {
    console.warn(`Image ${src}: not resized (${e instanceof Error ? e.message : e})`);
    return src;
  }
}
