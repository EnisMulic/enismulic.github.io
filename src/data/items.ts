export interface Item {
  slug: string;
  featured?: boolean;
  type: 'work' | 'project';
  name: string;
  role?: string;
  period?: string;
  tagline?: string;
  summary: string;
  description: string[];
  stack: string[];
  websiteUrl?: string;
  caseStudyUrl?: string;
  githubUrl?: string;
  blogSlug?: string;
}

export const items: Item[] = [
  {
    slug: 'slibe',
    featured: true,
    type: 'project',
    name: 'Panini Sticker Swap Platform',
    period: 'May 2026 – Present',
    tagline: 'slibe.online',
    summary: 'Platform for FIFA World Cup 2026 Panini collectors to track sticker albums and find swap partners. Scaled to 8K+ users and 2.5M+ stickers tracked within weeks of launch.',
    description: [
      'Collectors can mark which stickers they have, which they need, and instantly see other users in their area who have what they\'re missing — turning a traditionally manual swap process into a matchmaking platform.',
      'Scaled to 8K+ users and 2.5M+ stickers tracked within two weeks of launch, sustaining ~1M requests to Vercel and ~400K database requests in that period.',
      'Built the full frontend with TanStack Start, collaborating with two other developers on the backend and API layer exposed via PostgREST.',
      'Handled traffic spikes by leaning on TanStack Router\'s caching layer and optimising the most expensive PostgreSQL queries as load grew.',
    ],
    stack: ['TanStack Start', 'Supabase', 'PostgreSQL', 'Cloudflare R2', 'Vercel'],
    websiteUrl: 'https://slibe.online',
  },
  {
    slug: 'igre',
    type: 'project',
    name: 'Igre',
    period: 'Feb 2026 – Present',
    tagline: 'igre-five.vercel.app',
    summary: 'Platform for Bosnian language word puzzle games. Currently features Konekcije — a connections-style category puzzle.',
    description: [
      'A platform for word puzzle games in Bosnian, starting with Konekcije — a daily connections-style game where players group 16 words into four hidden categories.',
      'Built under OpenSourceSarajevo as a community project, open to contributions from the local developer community.',
    ],
    stack: ['React', 'TypeScript', 'Vite'],
    websiteUrl: 'https://igre-five.vercel.app/',
    githubUrl: 'https://github.com/OpenSourceSarajevo/igre',
  },
  {
    slug: 'dictionary',
    featured: true,
    type: 'project',
    name: 'Bosnian Dictionary Application',
    period: 'May 2025 – Present',
    tagline: 'rjecnik-liard.vercel.app',
    summary: 'OCR pipeline that converts a scanned PDF dictionary into a searchable web app — ~45K words and ~46K definitions — with a Next.js frontend and an admin dashboard for managing entries.',
    description: [
      'The source material was a scanned PDF with no machine-readable text. I built a custom OCR pipeline in Python to extract and structure ~45K words, ~46K definitions, and ~22K word forms into a relational schema.',
      'The pipeline runs on GitHub Actions, feeding data into a Supabase (PostgreSQL) database designed for fast full-text search.',
      'The frontend is built with Next.js, focused on search speed and clean presentation — the experience should feel like a real dictionary, not a data dump.',
      'An admin dashboard handles manual corrections and loading pipeline output into the database, since OCR output always needs some human review.',
    ],
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Python', 'GitHub Actions', 'Vercel', 'Netlify'],
    websiteUrl: 'https://rjecnik-liard.vercel.app/',
    githubUrl: 'https://github.com/OpenSourceSarajevo/rjecnik',
  },
  {
    slug: 'data-analytics-platform',
    featured: true,
    type: 'work',
    name: 'Data & Analytics Platform',
    role: 'Lead Backend/DevOps Engineering',
    period: 'Jan 2023 – Present',
    summary: 'Enterprise portal for portfolio management, cross-system integrations, and self-service workspace provisioning — built on event-driven architecture with full ownership across backend, DevOps, and infrastructure.',
    description: [
      'The platform centralises portfolio management for a large enterprise, integrating data across SAP LeanIX, Microsoft Dataverse, and internal systems — ~200 portfolio items kept in sync via a serverless event-driven pipeline.',
      'I architected the backend applying Event-Driven Architecture, Event Sourcing, Vertical Slice Architecture, CQRS, and DDD, with persistence split across Azure SQL and Cosmos DB based on access patterns.',
      'Self-service workspace provisioning is handled by Durable Functions orchestrations that spin up environments across 3 tiers from 7+ configurable templates, replacing a manual process.',
      'Owns CI/CD for 7 components across 3 repositories and 3 environments, including automated release workflows that branch, tag, and generate release notes to support monthly release cycles.',
      'Infrastructure is fully provisioned with Terraform — secure Azure networking, public access disabled. Also led a CMS database migration from SQLite to PostgreSQL with under 1 hour of planned downtime.',
    ],
    stack: ['.NET', 'Azure Functions', 'Azure SQL', 'Cosmos DB', 'Azure Storage Queue', 'Terraform', 'Angular', 'Strapi CMS', 'Docker', 'Static Web Apps'],
    caseStudyUrl: 'https://www.rubicon-world.com/cases/all-in-one-enterprise-data-and-analytics-portal',
  },
  {
    slug: 'supply-chain-digital-twin',
    type: 'work',
    name: 'Supply Chain Digital Twin Platform',
    role: 'Software / DevOps / Data Engineer',
    period: 'Jan 2022 – Dec 2022',
    summary: 'Digital twin modelling supply chain dependencies with graph data via Neo4j, with re-engineered modular IaC using Terragrunt and multi-environment CI/CD.',
    description: [
      'The platform models a client\'s supply chain as a digital twin — a live graph of dependencies between suppliers, components, and products — so disruptions at any node can be traced and simulated before they materialise.',
      'Graph relationships are stored and queried in Neo4j, which maps naturally to the connected structure of supply chain data.',
      'Re-engineered the Infrastructure as Code layer from monolithic Terraform to a modular Terragrunt setup, making multi-environment deployments reusable and easier to maintain.',
      'Implemented CI/CD workflows covering 3 components across 2 environments.',
    ],
    stack: ['.NET', 'Azure Functions', 'Azure Data Factory', 'Azure SQL', 'Neo4j', 'Terraform', 'Terragrunt'],
    caseStudyUrl: 'https://www.rubicon-world.com/cases/supply-chain-insights-through-digital-twin-analytics',
  },
  {
    slug: 'supply-chain-analytics',
    type: 'work',
    name: 'Real-Time Supply Chain Operation Analytics',
    role: 'Software / DevOps / Data Engineer',
    period: 'Jan 2022 – Dec 2022',
    summary: 'ETL pipelines and high-concurrency web APIs processing 20M+ supply chain records, with refactored query logic and optimised delivery workflows across environments.',
    description: [
      'Maintained and scaled the ETL layer built on Azure Data Factory, which processes 20M+ supply chain records to feed operational dashboards used by the client\'s planning teams.',
      'Refactored dynamic SQL stored procedure-based CRUD operations to use the SqlKata query builder, making the data access layer significantly easier to test and modify.',
      'Optimised the continuous delivery pipeline for ETL workflows across environments, reducing deployment friction for frequent data model changes.',
      'Maintained Web APIs handling high-concurrency reads from the processed dataset — performance and reliability were critical given real-time operational use.',
    ],
    stack: ['.NET', 'Azure Functions', 'Azure Data Factory', 'Azure SQL', 'Terraform', 'Terragrunt'],
    caseStudyUrl: 'https://www.rubicon-world.com/cases/optimizing-supply-chain-processes-with-real-time-analytics-platform',
  },
  {
    slug: 'insurance-admin-system',
    type: 'work',
    name: 'Insurance Administration System',
    role: 'Fullstack / Data Engineer',
    period: 'May 2021 – Dec 2021',
    summary: 'Full-stack administration system for guaranteed income wrap insurance products, including a refactored legacy cost calculation engine and automated end-to-end pipeline execution.',
    description: [
      'Built full-stack features for an administration system managing guaranteed income wrap insurance products — both the backend business logic and the frontend UI for operations staff.',
      'Refactored a legacy insurance cost calculation engine written in Azure SQL stored procedures, improving correctness and making it maintainable for future product changes.',
      'Scripted end-to-end pipeline execution that simulated every day in a fiscal quarter, cutting 8 hours of manual validation work per full-quarter test run.',
    ],
    stack: ['C#', 'ASP.NET Core', 'Azure SQL', 'Azure Data Factory'],
  },
  {
    slug: 'msg-z',
    type: 'project',
    name: 'MSG-Z',
    period: 'Aug 2019 – Oct 2021',
    tagline: 'Discord community bot',
    summary: 'Discord bot for a Bosnian university faculty server automating student lifecycle management — registration, academic year progression, and news scraping from university platforms.',
    description: [
      'Built to manage a Discord server used by students at my university faculty — handling registration, role assignments for academic year progression, and moderation utilities that were too tedious to do manually.',
      'The most interesting part was the async scraper: it reverse-engineered the stateful ASP.NET login flow of the university\'s LMS to poll for new content and push it to Discord channels, so students got notifications without checking the platform manually.',
      'Used PostgreSQL with SQLAlchemy and Alembic for persistence, deduplicating scraped content via MD5-hashed URLs so the same post never got pushed twice.',
    ],
    stack: ['Python', 'discord.py', 'PostgreSQL', 'SQLAlchemy', 'aiohttp', 'BeautifulSoup4', 'Heroku'],
    githubUrl: 'https://github.com/EnisMulic/MSG-Z',
  },
];
