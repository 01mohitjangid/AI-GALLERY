import type { Config } from 'drizzle-kit';

export default {
  dialect: 'postgresql',
  schema: './src/lib/db/schema.ts',
  dbCredentials: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  },
  out: './drizzle'
} satisfies Config;
