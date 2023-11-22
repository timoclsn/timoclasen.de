"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import { createFormAction } from "../clients";

export const recommend = createFormAction({
  input: zfd.formData({
    message: zfd.text(),
    url: zfd.text(z.string().url().optional()),
    name: zfd.text(z.string().optional()),
    email: zfd.text(z.string().email().optional()),
  }),
  action: async ({ input }) => {
    const response = await fetch("https://formspree.io/f/xleoyqpj", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        "Etwas ist schief gelaufen. Bitte versuche es später noch einmal.",
      );
    }
  },
});
