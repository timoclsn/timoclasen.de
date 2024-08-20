import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { eq, sql } from "drizzle-orm";
import { Context, Data, Effect, Layer, Schedule } from "effect";
import { balconyControl } from "../../db/schema";
import { db } from "./db";

const { HOMEE_ID, HOMEE_ACCESS_TOKEN } = process.env;

export class IncrementBalconyCounterError extends Data.TaggedError(
  "IncrementBalconyCounterError",
)<{ color: string; cause?: unknown }> {}

const makeDatabaseService = Effect.gen(function* () {
  const incrementBalconyCounter = (color: "red" | "blue" | "green") =>
    Effect.tryPromise({
      try: () =>
        db
          .update(balconyControl)
          .set({
            count: sql`${balconyControl.count} + 1`,
          })
          .where(eq(balconyControl.color, color)),
      catch: (error) =>
        new IncrementBalconyCounterError({
          color,
          cause: error,
        }),
    });

  return {
    db,
    incrementBalconyCounter,
  } as const;
});

export class DatabaseService extends Context.Tag("Database")<
  DatabaseService,
  Effect.Effect.Success<typeof makeDatabaseService>
>() {
  static Live = Layer.effect(DatabaseService, makeDatabaseService);
}

export class PlayHomeegramError extends Data.TaggedError("PlayHomeegramError")<{
  cause?: unknown;
}> {}

const makeHomeeService = Effect.gen(function* () {
  const client = (yield* HttpClient.HttpClient).pipe(
    HttpClient.filterStatusOk,
    HttpClient.mapRequest(
      HttpClientRequest.prependUrl(`https://${HOMEE_ID}.hom.ee/api/v2`),
    ),
    HttpClient.mapRequest(
      HttpClientRequest.setHeaders({
        Cookie: HOMEE_ACCESS_TOKEN,
      }),
    ),
    HttpClient.transformResponse(Effect.timeout(3000)),
    HttpClient.transformResponse(
      Effect.retry({
        times: 3,
        schedule: Schedule.exponential(500),
      }),
    ),
  );

  const playHomeegram = (homeegramID: number) =>
    HttpClientRequest.put(`/homeegrams/${homeegramID}?play=1`).pipe(
      client,
      HttpClientResponse.text,
      Effect.mapError((error) => new PlayHomeegramError({ cause: error })),
    );

  return { playHomeegram } as const;
});

export class HomeeService extends Context.Tag("HomeeService")<
  HomeeService,
  Effect.Effect.Success<typeof makeHomeeService>
>() {
  static Live = Layer.effect(HomeeService, makeHomeeService).pipe(
    Layer.provide(HttpClient.layer),
  );
}
