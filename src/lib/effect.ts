import { Context, Data, Layer } from "effect";
import { db } from "./db";

export class PlayHomeegramError extends Data.TaggedError("PlayHomeegramError")<{
  cause?: unknown;
}> {}

export class IncrementBalconyCounterError extends Data.TaggedError(
  "IncrementBalconyCounterError",
)<{ color: string; cause?: unknown }> {}

export class DatabaseContext extends Context.Tag("Database")<
  DatabaseContext,
  { readonly db: typeof db }
>() {}

export const DatabaseProvider = Layer.succeed(DatabaseContext, { db });
