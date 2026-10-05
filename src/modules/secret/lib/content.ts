import { z } from 'astro/zod';

// Reads a setting from .env locally, or from the environment in CI.
// Pull requests from Dependabot and forks get no secrets, so a missing value only fails the build
// when DATA_REQUIRED is 'true' (set by CI for deploys); otherwise the collections it feeds are left empty.
export function setting(name: string, feeds: string): string | undefined {
  try { process.loadEnvFile(); } catch {}
  const value = process.env[name];

  if (value) {
    return value;
  }

  if (process.env.DATA_REQUIRED === 'true') {
    throw new Error(`${name} is not set, and this build deploys. Add it to the CI environment.`);
  }
  
  console.warn(`${name} is not set; ${feeds} will be empty.`);
  return undefined;
}

// Position in the source, oldest first; the content store doesn't keep the loader's order.
export const order = z.number().int();
