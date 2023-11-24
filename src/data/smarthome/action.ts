"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { playHomeegram } from "../../lib/homee";
import { wait } from "../../lib/utils";
import { createFormAction } from "../clients";

const colorHomeegramIds = {
  red: 239,
  green: 240,
  blue: 241,
} as const;

const colorSchema = z.enum(["red", "green", "blue"]);

export const turnOnBalcony = createFormAction({
  input: zfd.formData({
    color: zfd.text(colorSchema),
  }),
  action: async ({ input, ctx }) => {
    const { color } = input;
    const { db } = ctx;

    const homeegramId = colorHomeegramIds[color];
    await playHomeegram(homeegramId);

    await wait(2000); // Delay needed because HG also has a delay of 1 sec.

    await db.balcony_control.update({
      where: {
        color,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });

    revalidateTag("control-count");

    return { color };
  },
});
