"use server";

import { z } from "zod";
import { createAction } from "../clients";

export const add = createAction({
  input: z.object({
    message: z.string(),
    url: z.string().url().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
  }),
  action: async ({ input }) => {
    await fetch("https://formspree.io/f/xleoyqpj", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        Accept: "application/json",
      },
    });
  },
});
