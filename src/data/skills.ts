export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['C#', 'TypeScript', 'Python', 'Golang', 'Bash'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['.NET Core', 'Node.js', 'NestJS', 'Angular', 'Next.js', 'TanStack Start'],
  },
  {
    category: 'Databases',
    items: ['Azure SQL', 'Azure Cosmos DB', 'PostgreSQL', 'Neo4j'],
  },
  {
    category: 'Cloud',
    items: ['Microsoft Azure', 'Supabase'],
  },
  {
    category: 'DevOps & IaC',
    items: ['Docker', 'Terraform', 'Terragrunt', 'Pulumi', 'GitHub Actions', 'Azure Pipelines', 'Azure CLI', 'Nx'],
  },
  {
    category: 'Architecture',
    items: ['Event-Driven Architecture', 'CQRS', 'Domain-Driven Design', 'Vertical Slice Architecture', 'Event Sourcing'],
  },
];
