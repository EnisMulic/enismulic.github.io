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
  extUrl?: string;
  extLabel?: string;
  githubUrl?: string;
}

export const items: Item[] = [
  {
    slug: 'slibe',
    featured: true,
    type: 'project',
    name: 'Panini Sticker Swap Platform',
    period: 'May 2026 – Present',
    tagline: 'slibe.online',
    summary: 'Platform for FIFA World Cup 2026 Panini collectors to track sticker albums and find swap partners. Scaled to 2K+ users and 170K+ stickers tracked within weeks of launch.',
    description: [
      'Built a web platform for FIFA World Cup 2026 Panini collectors to track their sticker albums and find other users to swap duplicates with.',
      'Scaled to 8K+ users and 2.5M+ stickers tracked within weeks of launch, sustaining ~1M requests to Vercel and ~400K database requests in the first two weeks.',
      'Engineered the full frontend using TanStack Start and collaborated with 2 developers to design and expose efficient data access via PostgREST.',
      'Handled traffic spikes and resource depletions by leveraging TanStack Route Caching and optimising SQL queries.',
    ],
    stack: ['TanStack Start', 'Supabase', 'PostgreSQL', 'Cloudflare R2', 'Vercel'],
    extUrl: 'https://slibe.online',
    extLabel: 'slibe.online',
  },
  {
    slug: 'igre',
    type: 'project',
    name: 'Igre',
    period: 'Feb 2026 – Present',
    tagline: 'igre-five.vercel.app',
    summary: 'Platform for Bosnian language word puzzle games. Currently features Konekcije — a connections-style category puzzle.',
    description: [
      'Built a platform for Bosnian language word puzzle games, starting with Konekcije — a connections-style category puzzle.',
      'Developed as an open-source project under OpenSourceSarajevo, targeting the Bosnian language community.',
    ],
    stack: ['React', 'TypeScript', 'Vite'],
    extUrl: 'https://igre-five.vercel.app/',
    extLabel: 'igre-five.vercel.app',
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
      'Engineered a custom OCR extraction pipeline to convert a scanned PDF dictionary into a structured digital format, processing ~45K words, ~46K definitions, and ~22K word forms.',
      'Designed and deployed a relational schema in Supabase (PostgreSQL) to store and query dictionary entries efficiently.',
      'Developed a high-performance web interface using Next.js, focusing on fast search capabilities and a clean user experience.',
      'Built an admin dashboard for editing and loading dictionary data into the platform.',
    ],
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Python', 'GitHub Actions', 'Vercel', 'Netlify'],
    extUrl: 'https://rjecnik-liard.vercel.app/',
    extLabel: 'Demo',
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
      'Architected a scalable backend applying Event-Driven Architecture, Event Sourcing, Vertical Slice Architecture, Domain-Driven Design, and CQRS.',
      'Engineered persistence layers across Azure SQL and Azure Cosmos DB for relational and document-based data needs.',
      'Built a serverless integration synchronising ~200 portfolio items across Cosmos DB, SAP LeanIX, and Microsoft Dataverse.',
      'Developed Durable Functions orchestrating self-service workspace provisioning across 3 environments, supporting 7+ configurable templates.',
      'Implemented CI/CD pipelines for 7 components across 3 repositories and 3 environments.',
      'Automated release management with workflows that create release candidate branches and auto-generate release notes, supporting monthly release cycles.',
      'Provisioned cloud infrastructure using Terraform, including secure Azure networking with public access disabled.',
      'Orchestrated a CMS database migration from SQLite to PostgreSQL with under 1 hour of planned downtime.',
      'Overhauled the Event Sourcing system to eliminate accumulated technical debt and improve long-term maintainability.',
    ],
    stack: ['.NET', 'Azure Functions', 'Azure SQL', 'Cosmos DB', 'Azure Storage Queue', 'Terraform', 'Angular', 'Strapi CMS', 'Docker', 'Static Web Apps'],
    extUrl: 'https://www.rubicon-world.com/cases/all-in-one-enterprise-data-and-analytics-portal',
    extLabel: 'All-in-One Enterprise Data and Analytics Portal',
  },
  {
    slug: 'supply-chain-digital-twin',
    type: 'work',
    name: 'Supply Chain Digital Twin Platform',
    role: 'Software / DevOps / Data Engineer',
    period: 'Jan 2022 – Dec 2022',
    summary: 'Digital twin modelling supply chain dependencies with graph data via Neo4j, with re-engineered modular IaC using Terragrunt and multi-environment CI/CD.',
    description: [
      'Implemented CI/CD workflows to build and deploy 3 components across 2 environments.',
      'Re-engineered the Infrastructure as Code layer using Terragrunt, enabling modular and reusable cloud deployments.',
      'Integrated complex graph data using Neo4j to model supply chain dependencies.',
    ],
    stack: ['.NET', 'Azure Functions', 'Azure Data Factory', 'Azure SQL', 'Neo4j', 'Terraform', 'Terragrunt'],
    extUrl: 'https://www.rubicon-world.com/cases/supply-chain-insights-through-digital-twin-analytics',
    extLabel: 'Supply Chain Insights Through Digital Twin Analytics',
  },
  {
    slug: 'supply-chain-analytics',
    type: 'work',
    name: 'Real-Time Supply Chain Operation Analytics',
    role: 'Software / DevOps / Data Engineer',
    period: 'Jan 2022 – Dec 2022',
    summary: 'ETL pipelines and high-concurrency web APIs processing 20M+ supply chain records, with refactored query logic and optimised delivery workflows across environments.',
    description: [
      'Maintained and refactored ETL pipelines built on Azure Data Factory, processing 20+ million records.',
      'Refactored dynamic SQL stored procedure-based CRUD operations to use the SqlKata query builder.',
      'Optimised the continuous delivery pipeline for ETL workflows across environments.',
      'Maintained and scaled Web APIs handling high-concurrency operational data.',
    ],
    stack: ['.NET', 'Azure Functions', 'Azure Data Factory', 'Azure SQL', 'Terraform', 'Terragrunt'],
    extUrl: 'https://www.rubicon-world.com/cases/optimizing-supply-chain-processes-with-real-time-analytics-platform',
    extLabel: 'Optimising Supply Chain Processes with Real-Time Analytics',
  },
  {
    slug: 'insurance-admin-system',
    type: 'work',
    name: 'Insurance Administration System',
    role: 'Fullstack / Data Engineer',
    period: 'May 2021 – Dec 2021',
    summary: 'Full-stack administration system for guaranteed income wrap insurance products, including a refactored legacy cost calculation engine and automated end-to-end pipeline execution.',
    description: [
      'Developed full-stack backend and frontend features for administration of guaranteed income wrap insurance products.',
      'Built the data pipeline and refactored a legacy insurance cost calculation engine written in Azure SQL.',
      'Scripted end-to-end pipeline execution covering every day in a fiscal quarter, eliminating 8 hours of manual intervention per full-quarter validation run.',
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
      'Built a Discord bot to automate student management for a university faculty community: member registration, role-based academic year progression, and enforcement of enrollment windows via date-gated commands.',
      'Engineered an async scraper that reverse-engines a stateful ASP.NET university LMS login — parsing __VIEWSTATE and __EVENTVALIDATION hidden fields — to poll and push new content to Discord channels.',
      'Designed a cog-based modular architecture with 12 auto-loaded command modules and a JSON-driven rankup config to keep academic progression rules out of code.',
      'Used PostgreSQL with SQLAlchemy and Alembic for data persistence and deduplication of scraped content via MD5-hashed URLs.',
    ],
    stack: ['Python', 'discord.py', 'PostgreSQL', 'SQLAlchemy', 'aiohttp', 'BeautifulSoup4', 'Heroku'],
    githubUrl: 'https://github.com/EnisMulic/MSG-Z',
  },
];
