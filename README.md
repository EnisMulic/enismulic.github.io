# enismulic.github.io

My personal site: work history, projects, a blog and a secret page. It's a static [Astro](https://astro.build) site with no client-side framework, deployed to GitHub Pages.

## Running it

Node 24 is required (see `.nvmrc`).

```bash
npm install
npm start        # dev server (also: npm run dev)
npm run build    # production build into dist/
npm run preview  # serve the built site
```

The secret page pulls data from outside services at build time. Without credentials those widgets are just empty, so the rest of the site works without any setup. To fill them locally, copy `.env.example` to `.env` and fill in the values (see [Environment](#environment)).

## Structure

```
src/
  pages/            routes; each page is a thin entry point
  modules/<page>/   components, data and content collections for one page
    home/           hero and featured projects
    projects/       project card and items.ts, the list of work and projects
    blog/           blog collection definition
    secret/         secret page widgets and their data loaders (see its README)
    shared/         Layout and Nav, used by every page
  content/blog/     blog posts as Markdown
  content.config.ts imports each module's collections and registers them with Astro
```

Astro only builds routes from `src/pages/`, so everything a page uses lives in its module and the page file just puts it together.

### Adding a project

Add an entry to `src/modules/projects/items.ts`. The list is sorted by start date, newest first.

- `type` is `'work'` for client work or `'project'` for personal projects.
- `featured: true` also shows it on the homepage.
- `summary` is the one-line description on the card; `description` holds the longer paragraphs.

### Adding a blog post

Add a Markdown file to `src/content/blog/` with `title`, `description` and `pubDate` frontmatter. Set `draft: true` to keep it unpublished.

## Environment

| Variable | Used for |
|---|---|
| `NOTION_API_TOKEN` | Books, records and Letterboxd widgets (read-only Notion integration token) |
| `NYT_COOKIE` | NYT Connections widget (the `NYT-S` session cookie) |
| `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` | Photo album widget (read-only Cloudflare R2 API token) |

Locally these go in `.env`; in CI they're repository secrets.

## Deployment

`.github/workflows/ci.yml` builds and deploys to GitHub Pages on every push to `master`, and again every night so the secret page's data stays current. A deploy fails if any of the variables above is missing, so the live site never goes out with empty widgets. Pull requests build but don't deploy; ones from Dependabot or forks get no secrets and build with empty widgets.
