import { isHTTPAccessFallbackError } from "next/dist/client/components/http-access-fallback/http-access-fallback.js";
import { isRedirectError } from "next/dist/client/components/redirect-error.js";
import { z } from "zod";
import { DEFAULT_ACTION_ERROR_MESSAGE, isActionError } from "../errors";
import { CreateClientOptions, MaybePromise, ServerAction } from "../types";
import { id } from "../utils";

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
      // Depending of how the action is called, the input can be the first or second argument
      // If the action is put through useFormState the first argument will be previous state and the second the input
      const [firstArg, secondArg] = inputArgs;
      const input = secondArg instanceof FormData ? secondArg : firstArg;

      try {
        // Validate input if schema is provided
        let parsedInput = input;
        if (actionBuilderOpts.input) {
          const result = await actionBuilderOpts.input.safeParseAsync(input);
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
        if (isRedirectError(error) || isHTTPAccessFallbackError(error)) {
          throw error;
        }

        createClientOpts?.onError?.(error);

        const message = isActionError(error)
          ? error.message
          : DEFAULT_ACTION_ERROR_MESSAGE;

        return {
          status: "error",
          id: id(),
          data: null,
          validationErrors: null,
          error: message,
        };
      }
    };

    return action;
  };

  return createAction;
};
