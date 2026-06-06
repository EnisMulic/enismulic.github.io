export interface ExperienceItem {
  slug: string;
  featured?: boolean;
  title: string;
  role: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
  caseStudyLabel?: string;
  caseStudyUrl?: string;
}

export const experience: ExperienceItem[] = [
  {
    slug: 'data-analytics-platform',
    featured: true,
    title: 'Data & Analytics Platform',
    role: 'Lead Backend/DevOps Engineering',
    period: 'Jan 2023 – Present',
    summary: 'Enterprise portal for portfolio management, cross-system integrations, and self-service workspace provisioning — built on event-driven architecture with full ownership across backend, DevOps, and infrastructure.',
    bullets: [
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
    caseStudyLabel: 'All-in-One Enterprise Data and Analytics Portal',
    caseStudyUrl: 'https://www.rubicon-world.com/cases/all-in-one-enterprise-data-and-analytics-portal',
  },
  {
    slug: 'supply-chain-digital-twin',
    title: 'Supply Chain Digital Twin Platform',
    role: 'Software / DevOps / Data Engineer',
    period: 'Jan 2022 – Dec 2022',
    summary: 'Digital twin modelling supply chain dependencies with graph data via Neo4j, with re-engineered modular IaC using Terragrunt and multi-environment CI/CD.',
    bullets: [
      'Implemented CI/CD workflows to build and deploy 3 components across 2 environments.',
      'Re-engineered the Infrastructure as Code layer using Terragrunt, enabling modular and reusable cloud deployments.',
      'Integrated complex graph data using Neo4j to model supply chain dependencies.',
    ],
    stack: ['.NET', 'Azure Functions', 'Azure Data Factory', 'Azure SQL', 'Neo4j', 'Terraform', 'Terragrunt'],
    caseStudyLabel: 'Supply Chain Insights Through Digital Twin Analytics',
    caseStudyUrl: 'https://www.rubicon-world.com/cases/supply-chain-insights-through-digital-twin-analytics',
  },
  {
    slug: 'supply-chain-analytics',
    title: 'Real-Time Supply Chain Operation Analytics',
    role: 'Software / DevOps / Data Engineer',
    period: 'Jan 2022 – Dec 2022',
    summary: 'ETL pipelines and high-concurrency web APIs processing 20M+ supply chain records, with refactored query logic and optimised delivery workflows across environments.',
    bullets: [
      'Maintained and refactored ETL pipelines built on Azure Data Factory, processing 20+ million records.',
      'Refactored dynamic SQL stored procedure-based CRUD operations to use the SqlKata query builder.',
      'Optimised the continuous delivery pipeline for ETL workflows across environments.',
      'Maintained and scaled Web APIs handling high-concurrency operational data.',
    ],
    stack: ['.NET', 'Azure Functions', 'Azure Data Factory', 'Azure SQL', 'Terraform', 'Terragrunt'],
    caseStudyLabel: 'Optimising Supply Chain Processes with Real-Time Analytics',
    caseStudyUrl: 'https://www.rubicon-world.com/cases/optimizing-supply-chain-processes-with-real-time-analytics-platform',
  },
  {
    slug: 'insurance-admin-system',
    title: 'Insurance Administration System',
    role: 'Fullstack / Data Engineer',
    period: 'May 2021 – Dec 2021',
    summary: 'Full-stack administration system for guaranteed income wrap insurance products, including a refactored legacy cost calculation engine and automated end-to-end pipeline execution.',
    bullets: [
      'Developed full-stack backend and frontend features for administration of guaranteed income wrap insurance products.',
      'Built the data pipeline and refactored a legacy insurance cost calculation engine written in Azure SQL.',
      'Scripted end-to-end pipeline execution covering every day in a fiscal quarter, eliminating 8 hours of manual intervention per full-quarter validation run.',
    ],
    stack: ['C#', 'ASP.NET Core', 'Azure SQL', 'Azure Data Factory'],
  },
];
