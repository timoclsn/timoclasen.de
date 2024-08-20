"use server";

import { Effect } from "effect";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { ActionError } from "../../lib/data/errors";
import { DatabaseService, HomeeService } from "../../lib/effect";
import { createAction } from "../clients";

const colorHomeegramIds = {
  red: 239,
  green: 240,
  blue: 241,
} as const;

const colorSchema = z.enum(["red", "green", "blue"]);

export const turnOnBalcony = createAction({
  input: zfd.formData({
    color: zfd.text(colorSchema),
  }),
  action: async ({ input }) => {
    const action = Effect.gen(function* () {
      const { color } = input;
      const { incrementBalconyCounter } = yield* DatabaseService;
      const { playHomeegram } = yield* HomeeService;
      const homeegramId = colorHomeegramIds[color];

      yield* playHomeegram(homeegramId);
      yield* Effect.sleep("2 seconds");
      yield* incrementBalconyCounter(color);

      revalidateTag("control-count");
    });

    await Effect.runPromise(
      action.pipe(
        Effect.provide(HomeeService.Live),
        Effect.provide(DatabaseService.Live),
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
      ),
    );
  },
});
