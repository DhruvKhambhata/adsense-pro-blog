import { PrismaClient } from '@prisma/client';

// Bare minimum Prisma initialization for build stability
const globalForPrisma = global;
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
