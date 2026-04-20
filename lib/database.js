import { PrismaClient } from '@prisma/client';

export const prisma = await (async () => {
  const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  // Use Dynamic Imports to hide LibSQL from the build-time bundler
  if (url && url.startsWith('libsql://')) {
    try {
      const { createClient } = await import('@libsql/client');
      const { PrismaLibSql } = await import('@prisma/adapter-libsql');

      const client = createClient({ url, authToken });
      const adapter = new PrismaLibSql(client);
      return new PrismaClient({ adapter });
    } catch (e) {
      console.warn("Dynamic DB load failed:", e);
    }
  }

  // Fallback for Build
  return new PrismaClient();
})();
