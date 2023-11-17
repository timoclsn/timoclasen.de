"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { playHomeegram } from "../../../lib/homee";
import { prisma } from "../../../lib/prisma";
import { createAction } from "../../../lib/serverActions/create";
import { wait } from "../../../lib/utils";

const colorHomeegramIds = {
  red: 239,
  green: 240,
  blue: 241,
} as const;

const colorSchema = z.enum(["red", "green", "blue"]);

export const turnOnBalcony = createAction({
  input: z.object({
    color: colorSchema,
  }),
  action: async ({ input }) => {
    const { color } = input;

    const homeegramId = colorHomeegramIds[color];
    await playHomeegram(homeegramId);

    await wait(2000); // Delay needed because HG also has a delay of 1 sec.

    await prisma.balcony_control.update({
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
  },
});
