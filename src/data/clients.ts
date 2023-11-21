import { createActionClient, createQueryClient } from "../lib/data/server";
import { createFormActionClient } from "../lib/data/server/createFormActionClient";
import { prisma } from "../lib/prisma";

export const createAction = createActionClient({
  middleware: () => {
    return { db: prisma };
  },
});

export const createFormAction = createFormActionClient({
  middleware: () => {
    return { db: prisma };
  },
});

export const createQuery = createQueryClient({
  middleware: () => {
    return { db: prisma };
  },
});
