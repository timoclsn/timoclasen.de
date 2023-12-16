import { isNotFoundError } from "next/dist/client/components/not-found";
import { isRedirectError } from "next/dist/client/components/redirect";
import { z } from "zod";
import { CreateClientOptions, MaybePromise, ServerAction } from "../types";
import { getErrorMessage, id } from "../utils";

export const createActionClient = <Context>(
  createClientOpts?: CreateClientOptions<Context>,
) => {
  const createAction = <
    TInputSchema extends z.ZodTypeAny,
    TResponse extends any,
  >(actionBuilderOpts: {
    input?: TInputSchema;
    action: (actionArgs: {
      input: z.output<TInputSchema>;
      ctx: Context;
    }) => MaybePromise<void> | MaybePromise<TResponse>;
  }) => {
    const action: ServerAction<TInputSchema, TResponse> = async (
      ...inputArgs
    ) => {
      const [input] = inputArgs;

      try {
        // Validate input if schema is provided
        let parsedInput = input;
        if (actionBuilderOpts.input) {
          const result = actionBuilderOpts.input.safeParse(input);
          if (!result.success) {
            return {
              status: "validationError",
              id: id(),
              data: null,
              validationErrors: result.error.flatten().fieldErrors,
              error: null,
            };
          }
          parsedInput = result.data;
        }

        // Run middleware if provided and get context
        const ctx = (await createClientOpts?.middleware?.()) ?? ({} as Context);

        // Call action
        const response = await actionBuilderOpts.action({
          input: parsedInput,
          ctx,
        });

        return {
          status: "success",
          id: id(),
          data: response ?? null,
          validationErrors: null,
          error: null,
        };
      } catch (error) {
        // The next/navigation functions (redirect() and notFound()) operate by deliberately triggering an error,
        // which will then be handled internally by Next.js. In this specific scenario,
        // we must intentionally propagate the error further.
        if (isRedirectError(error) || isNotFoundError(error)) {
          throw error;
        }

        return {
          status: "error",
          id: id(),
          data: null,
          validationErrors: null,
          error: getErrorMessage(error),
        };
      }
    };

    return action;
  };

  return createAction;
};
