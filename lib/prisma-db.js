import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const globalForPrisma = global;

function createPrismaClient() {
  // Use environment variables or forced fallbacks for this specific environment 
  const url = process.env.TURSO_DATABASE_URL || "libsql://adsense-blog-dhruvkhambhata.aws-ap-south-1.turso.io";
  const authToken = process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzY2OTQ4ODIsImlkIjoiMDE5ZGFiM2YtNzkwMS03ZmJmLTgyY2ItN2Q4YmFkN2Y1YTkwIiwicmlkIjoiYzliYmI0ZGMtNzY0MC00NjVjLWE0OWUtZGE3NjRhY2I5NjY3In0.7uQuYkLTVTrHfs_bL8FUEdxS7YgNh9t5xy-LwQGBUrD0vevKn1HM6kfky0fOtnEKYyWhzhVDilnPSHT0Ec1WBA";

  const config = { url, authToken };

  console.log("PRISMA INITIALIZATION (TURSO):", { hasUrl: !!config.url, provider: "libsql" });

  try {
    // IMPORTANT: PrismaLibSql constructor takes the config object, 
    // which it uses to create the LibSQL client internally.
    const adapter = new PrismaLibSql(config);
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error("Prisma Client Initialization Error:", error);
    return new PrismaClient();
  }
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
