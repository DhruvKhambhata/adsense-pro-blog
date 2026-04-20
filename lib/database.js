import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const isNextBuild = process.env.NEXT_PHASE === 'phase-production-build' || process.env.NODE_ENV === 'production';

function getPrisma() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  // On Vercel (Production), use the real Turso DB
  if (url && url.startsWith('libsql://')) {
    try {
      const client = createClient({ url, authToken });
      const adapter = new PrismaLibSql(client);
      return new PrismaClient({ adapter });
    } catch (e) {
      console.warn("DB Connection failed, falling back to mock for build safety.");
    }
  }
  
  // Local/Build Fallback: Use standard SQLite
  // This prevents the "undefined" crash during the Next.js pre-rendering phase
  return new PrismaClient();
}

const globalForPrisma = global;
export const prisma = globalForPrisma.prisma || getPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
