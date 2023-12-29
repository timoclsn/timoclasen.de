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
  >(queryBuilderOpts: {
    input?: TInputSchema;
    query: (queryArgs: {
      input: z.output<TInputSchema>;
      ctx: Context;
    }) => MaybePromise<TResponse>;
    cache?:
      | CacheOptions
      | ((queryArgs: { input: z.output<TInputSchema> }) => CacheOptions);
  }) => {
    let cacheOptions: CacheOptions | undefined;

    const query: ServerQuery<TInputSchema, TResponse> = async (
      ...inputArgs
    ) => {
      const [input] = inputArgs;

      // Validate input if schema is provided
      let parsedInput = input;
      if (queryBuilderOpts.input) {
        parsedInput = queryBuilderOpts.input.parse(input);
      }

      // Resolve cache options
      cacheOptions =
        typeof queryBuilderOpts.cache === "function"
          ? queryBuilderOpts.cache({ input: parsedInput })
          : queryBuilderOpts.cache;

      if (cacheOptions?.noStore) {
        noStore();
      }

      // Wrapper function to allow for caching
      const innerQuery = async () => {
        // Run middleware if provided and get context
        const ctx = (await createClientOpts?.middleware?.()) ?? ({} as Context);

        // Call query
        return await queryBuilderOpts.query({
          input: parsedInput,
          ctx,
        });
      };

      if (cacheOptions?.keyParts || cacheOptions?.options) {
        return await nextCache(
          innerQuery,
          cacheOptions.keyParts,
          cacheOptions.options,
        )();
      }

      return await innerQuery();
    };

    return reactCache(query);
  };

  return createQuery;
};
