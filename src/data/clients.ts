import { prisma } from "../lib/prisma";
import { createQueryClient } from "../lib/rpc/server";
import { createActionClient } from "../lib/rpc/server/createActionClient";

export const createAction = createActionClient({
  middleware: () => {
    return { db: prisma };
  },
});

export const createQuery = createQueryClient({
  middleware: () => {
    return { db: prisma };
  },
});
