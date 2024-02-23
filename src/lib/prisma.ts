import { PrismaClient } from "@prisma/client";

const { NODE_ENV } = process.env;

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient = prismaGlobal.prisma || new PrismaClient();

if (NODE_ENV !== "production") {
  prismaGlobal.prisma = prisma;
}
