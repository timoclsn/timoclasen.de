"use server";

import { Effect } from "effect";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { ActionError } from "../../lib/data/errors";
import {
  DatabaseService,
  DevToolsLive,
  HomeeService,
  NodeSdkLive,
  incrementBalconyCounter,
} from "../../lib/effect";
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
  action: async ({ input }) =>
    Effect.gen(function* () {
      const { color } = input;
      yield* Effect.logInfo(`Trying to turn on balcony light ${color}`);

      const { playHomeegram } = yield* HomeeService;
      const homeegramId = colorHomeegramIds[color];

      yield* playHomeegram(homeegramId);
      yield* Effect.sleep("2 seconds");
      yield* incrementBalconyCounter(color);

      revalidateTag("control-count");

      yield* Effect.logInfo(`Balcony light turned on ${color}`);
    }).pipe(
      Effect.provide(DevToolsLive),
      Effect.provide(NodeSdkLive),
      Effect.provide(HomeeService.Live),
      Effect.provide(DatabaseService.Live),
      Effect.mapError(
        ({ message, cause }) => new ActionError({ message, cause }),
      ),
      Effect.orDie,
      Effect.runPromise,
    ),
});
