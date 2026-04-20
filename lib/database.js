import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

// We inline the URL here to guarantee the Next.js build workers see it.
// This is currently the only way to bypass the Next.js 16 environment isolation.
const DB_URL = "libsql://adsense-blog-dhruvkhambhata.aws-ap-south-1.turso.io";
const DB_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzY2OTQ4ODIsImlkIjoiMDE5ZGFiM2YtNzkwMS03ZmJmLTgyY2ItN2Q4YmFkN2Y1YTkwIiwicmlkIjoiYzliYmI0ZGMtNzY0MC00NjVjLWE0OWUtZGE3NjRhY2I5NjY3In0.7uQuYkLTVTrHfs_bL8FUEdxS7YgNh9t5xy-LwQGBUrD0vevKn1HM6kfky0fOtnEKYyWhzhVDilnPSHT0Ec1WBA";

function getPrisma() {
  try {
    const client = createClient({ 
      url: DB_URL, 
      authToken: DB_TOKEN 
    });
    const adapter = new PrismaLibSql(client);
    return new PrismaClient({ adapter });
  } catch (e) {
    // If cloud fails, fallback to local file
    return new PrismaClient({
      datasourceUrl: 'file:./prisma/dev.db'
    });
  }
}

const globalForPrisma = global;
export const prisma = globalForPrisma.prisma || getPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
