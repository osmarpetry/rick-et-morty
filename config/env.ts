/**
 * Environment Configuration
 * Centralized configuration for environment variables
 */

export const env = {
  // GraphQL API Configuration
  GRAPHQL_API_URL:
    process.env.NEXT_PUBLIC_GRAPHQL_API_URL ||
    'https://rickandmortyapi.com/graphql',

  // Development Configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',

  // GraphQL Schema URL for code generation
  GRAPHQL_SCHEMA_URL:
    process.env.GRAPHQL_SCHEMA_URL || 'https://rickandmortyapi.com/graphql',
} as const;

// Type-safe environment validation
export type Environment = typeof env;

// Validate required environment variables
export function validateEnvironment(): void {
  const requiredVars = ['GRAPHQL_API_URL'] as const;

  for (const varName of requiredVars) {
    if (!env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
}
