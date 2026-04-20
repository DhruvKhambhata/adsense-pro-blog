import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

let prismaInstance;

// We check if we are in the "Prerendering" phase of the build.
// If so, we use the Mock to prevent the LibSQL 'undefined' crash.
const isBuildWorker = process.env.NODE_ENV === 'production' && typeof window === 'undefined' && !process.env.VERCEL_URL;

if (isBuildWorker) {
  const mockModel = { findMany: async () => [], findUnique: async () => null, findFirst: async () => null, count: async () => 0 };
  prismaInstance = {
    post: mockModel,
    siteSettings: { findFirst: async () => ({ siteName: "FutureEdge Insights", description: "Launched and Live" }) },
    page: mockModel,
    category: mockModel,
    tag: mockModel,
    author: mockModel
  };
} else {
  // RUNTIME: Connect to real Turso
  const URL = "libsql://adsense-blog-dhruvkhambhata.aws-ap-south-1.turso.io";
  const TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzY2OTQ4ODIsImlkIjoiMDE5ZGFiM2YtNzkwMS03ZmJmLTgyY2ItN2Q4YmFkN2Y1YTkwIiwicmlkIjoiYzliYmI0ZGMtNzY0MC00NjVjLWE0OWUtZGE3NjRhY2I5NjY3In0.7uQuYkLTVTrHfs_bL8FUEdxS7YgNh9t5xy-LwQGBUrD0vevKn1HM6kfky0fOtnEKYyWhzhVDilnPSHT0Ec1WBA";
  
  const client = createClient({ url: URL, authToken: TOKEN });
  const adapter = new PrismaLibSql(client);
  prismaInstance = new PrismaClient({ adapter });
}

export const prisma = prismaInstance;
