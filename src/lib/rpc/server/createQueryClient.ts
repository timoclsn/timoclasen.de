import {
  unstable_cache as nextCache,
  unstable_noStore as noStore,
} from "next/cache";
import { cache as reactCache } from "react";
import { z } from "zod";
import {
  CacheOptions,
  CreateClientOptions,
  MaybePromise,
  ServerQuery,
} from "../types";

export const createQueryClient = <Context>(
  createClientOpts?: CreateClientOptions<Context>,
) => {
  const createQuery = <
    TInputSchema extends z.ZodTypeAny,
    TResponse extends any,
  >(querynBuilderOpts: {
    input?: TInputSchema;
    query: (queryArgs: {
      input: z.output<TInputSchema>;
      ctx: Context;
    }) => MaybePromise<TResponse>;
    cache?: CacheOptions;
  }) => {
    const query: ServerQuery<TInputSchema, TResponse> = async (
      ...inputArgs
    ) => {
      if (querynBuilderOpts.cache?.noStore) {
        noStore();
      }

      const [input] = inputArgs;

      // Validate input if schema is provided
      let parsedInput = input;
      if (querynBuilderOpts.input) {
        parsedInput = querynBuilderOpts.input.parse(input);
      }

      // Run middleware if provided and get context
      const ctx = (await createClientOpts?.middleware?.()) ?? ({} as Context);

      // Call query
      return await querynBuilderOpts.query({
        input: parsedInput,
        ctx,
      });
    };

    // Wrap query in next cache if provided
    if (querynBuilderOpts.cache) {
      return reactCache(
        nextCache(
          // @ts-expect-error
          (...args: any[]) => query(...args),
          querynBuilderOpts.cache.keyParts,
          querynBuilderOpts.cache.options,
        ),
      );
    }

    return reactCache(query);
  };

  return createQuery;
};
