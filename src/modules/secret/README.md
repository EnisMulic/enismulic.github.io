# Secret page

A grid of widgets. Each one lives in `widgets/<name>/`: `content.ts` loads its data at build time, and `<Name>Widget.astro` renders it with `components/Widget.astro` plus its modal, if it has one. `widgets/shelf/` is the cover shelf shared by Books and Records; `lib/` has the loader helpers (`setting()`, Notion).

| Widget | Data |
|---|---|
| Books, Records, Letterboxd | Notion databases (`NOTION_API_TOKEN`) |
| NYT Connections | NYT Games (`NYT_COOKIE`; replace it when the build says it expired) |
| Photos | Cloudflare R2 `album` bucket (`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`) |

**Photos:** upload resized photos through the Cloudflare dashboard, named `<anything>_City_Country.jpg` (hyphens for spaces, e.g. `New-York_United-States`). The date comes from the photo's EXIF data. Strip GPS before uploading, since the files are public.

**New widget:** add a `widgets/<name>/` folder with a `content.ts` collection (register it in `src/content.config.ts`) and a `<Name>Widget.astro`, then add it to `src/pages/secret/index.astro` in place of the "Coming soon" placeholder. Set the widget's `opens` to a modal's id to open it on click.
