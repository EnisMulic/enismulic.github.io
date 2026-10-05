# Secret page

A grid of widgets (`components/Widget.astro`), each loading its data at build time in `content.ts`.

| Widget | Data |
|---|---|
| Books, Records, Letterboxd | Notion databases (`NOTION_API_TOKEN`) |
| NYT Connections | NYT Games (`NYT_COOKIE`; replace it when the build says it expired) |
| Photos | Cloudflare R2 `album` bucket (`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`) |

**Photos:** upload resized photos through the Cloudflare dashboard, named `<anything>_City_Country.jpg` (hyphens for spaces, e.g. `New-York_United-States`). The date comes from the photo's EXIF data. Strip GPS before uploading, since the files are public.

**New widget:** add a collection to `content.ts`, register it in `src/content.config.ts`, and add a `<Widget>` to `src/pages/secret/index.astro`. Set `opens` to a modal's id to open it on click.
