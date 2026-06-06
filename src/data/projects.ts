export interface Project {
  slug: string;
  featured?: boolean;
  name: string;
  tagline: string;
  summary: string;
  description: string[];
  stack: string[];
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: 'slibe',
    featured: true,
    name: 'Panini Sticker Swap Platform',
    tagline: 'slibe.online',
    summary: 'Platform for FIFA World Cup 2026 Panini collectors to track sticker albums and find swap partners. Scaled to 2K+ users and 170K+ stickers tracked within weeks of launch.',
    description: [
      'Built a web platform for FIFA World Cup 2026 Panini collectors to track their sticker albums and find other users to swap duplicates with.',
      'Scaled to 2K+ users and 170K+ stickers tracked within weeks of launch, sustaining ~1M requests to Vercel and ~400K database requests in the first two weeks.',
      'Engineered the full frontend using TanStack Start and collaborated with 2 developers to design and expose efficient data access via PostgREST.',
      'Handled traffic spikes and resource depletions by leveraging TanStack Route Caching and optimising SQL queries.',
    ],
    stack: ['TanStack Start', 'Supabase', 'PostgreSQL', 'Cloudflare R2', 'Vercel'],
    liveUrl: 'https://slibe.online',
    liveLabel: 'slibe.online',
  },
  {
    slug: 'igre',
    featured: true,
    name: 'Igre',
    tagline: 'igre-five.vercel.app',
    summary: 'Platform for Bosnian language word puzzle games. Currently features Konekcije — a connections-style category puzzle.',
    description: [
      'Built a platform for Bosnian language word puzzle games, starting with Konekcije — a connections-style category puzzle.',
      'Developed as an open-source project under OpenSourceSarajevo, targeting the Bosnian language community.',
    ],
    stack: ['React', 'TypeScript', 'Vite'],
    liveUrl: 'https://igre-five.vercel.app/',
    liveLabel: 'igre-five.vercel.app',
    githubUrl: 'https://github.com/OpenSourceSarajevo/igre',
  },
  {
    slug: 'dictionary',
    name: 'Bosnian Dictionary Application',
    tagline: 'rjecnik-liard.vercel.app',
    summary: 'OCR pipeline that converts a scanned PDF dictionary into a searchable web app — ~45K words and ~46K definitions — with a Next.js frontend and an admin dashboard for managing entries.',
    description: [
      'Engineered a custom OCR extraction pipeline to convert a scanned PDF dictionary into a structured digital format, processing ~45K words, ~46K definitions, and ~22K word forms.',
      'Designed and deployed a relational schema in Supabase (PostgreSQL) to store and query dictionary entries efficiently.',
      'Developed a high-performance web interface using Next.js, focusing on fast search capabilities and a clean user experience.',
      'Built an admin dashboard for editing and loading dictionary data into the platform.',
    ],
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Python', 'GitHub Actions', 'Vercel', 'Netlify'],
    liveUrl: 'https://rjecnik-liard.vercel.app/',
    liveLabel: 'Demo',
  },
];
