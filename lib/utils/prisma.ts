import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();
console.log("in prisma initialization");

if (process.env.NODE_ENV != "production") {
  console.log("in prisma initialization");
  globalForPrisma.prisma = prisma;
}
