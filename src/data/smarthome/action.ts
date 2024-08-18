"use server";

import { eq, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { balconyControl } from "../../../db/schema";
import { playHomeegram } from "../../lib/homee";
import { createAction } from "../clients";
import { Data, Effect } from "effect";
import { ActionError } from "../../lib/data/errors";

const colorHomeegramIds = {
  red: 239,
  green: 240,
  blue: 241,
} as const;

const colorSchema = z.enum(["red", "green", "blue"]);

class IncrementBalconyCounterError extends Data.TaggedError(
  "IncrementBalconyCounterError",
)<{ color: string }> {}

export const turnOnBalcony = createAction({
  input: zfd.formData({
    color: zfd.text(colorSchema),
  }),
  action: async ({ input, ctx }) => {
    const action = Effect.gen(function* () {
      const { color } = input;
      const { db } = ctx;

      const homeegramId = colorHomeegramIds[color];

      yield* playHomeegram(homeegramId);

      yield* Effect.sleep("2 seconds");

      yield* Effect.tryPromise({
        try: () =>
          db
            .update(balconyControl)
            .set({
              count: sql`${balconyControl.count} + 1`,
            })
            .where(eq(balconyControl.color, color)),
        catch: () => new IncrementBalconyCounterError({ color }),
      });

      revalidateTag("control-count");
    }).pipe(
      Effect.mapError((error) => {
        let message = "";

        switch (error._tag) {
          case "PlayHomeegramError":
            message = "Balkonlampe konnte nicht eingeschaltet werden.";
            break;
          case "IncrementBalconyCounterError":
            message = `Der ${error.color} Zähler konnte nicht erhöht werden.`;
            break;
          default:
            message = "Unbekannter Fehler";
            break;
        }

        return new ActionError({ message });
      }),
      Effect.orDie,
    );

    await Effect.runPromise(action);
  },
});
