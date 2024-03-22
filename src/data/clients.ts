import { createActionClient, createQueryClient } from "../lib/data/server";
import { db } from "../lib/db";

export const createAction = createActionClient({
  middleware: () => {
    return { db };
  },
});

export const createQuery = createQueryClient({
  middleware: () => {
    return { db };
  },
});
