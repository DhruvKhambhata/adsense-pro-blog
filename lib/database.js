import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

function getPrisma() {
  // Check both names, just in case
  const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  // Extremely strict check for a valid cloud URL
  const isCloud = typeof url === 'string' && 
                  url.length > 10 && 
                  url.startsWith('libsql://');

  if (isCloud) {
    console.log("Initializing Cloud DB Connection...");
    const client = createClient({ 
      url: url, 
      authToken: authToken 
    });
    const adapter = new PrismaLibSql(client);
    return new PrismaClient({ adapter });
  }
  
  // Fallback to local SQLite for build/dev
  // We use the file path directly to ensure it never says "undefined"
  const localPath = 'file:./prisma/dev.db';
  console.log("Initializing Local DB Connection...");
  return new PrismaClient({
    datasourceUrl: localPath
  });
}

const globalForPrisma = global;
export const prisma = globalForPrisma.prisma || getPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
