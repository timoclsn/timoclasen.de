import { z } from "zod";
import {
  CreateClientOptions,
  FormActionResult,
  MaybePromise,
  ServerFormAction,
} from "../types";
import {
  getErrorMessage,
  isNextNotFoundError,
  isNextRedirectError,
} from "../utils";

export const createFormActionClient = <Context>(
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
      previousState: FormActionResult<TInputSchema, TResponse>;
    }) => MaybePromise<void> | MaybePromise<TResponse>;
  }) => {
    const action: ServerFormAction<TInputSchema, TResponse> = async (
      previousState,
      formData,
    ) => {
      try {
        // Validate input if schema is provided
        let parsedInput = formData;
        if (actionBuilderOpts.input) {
          const result = actionBuilderOpts.input.safeParse(formData);
          if (!result.success) {
            return {
              status: "validationError",
              isIdle: true,
              isSuccess: false,
              isError: true,
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
          previousState,
        });

        return {
          status: "success",
          isIdle: true,
          isSuccess: true,
          isError: false,
          data: response ?? null,
          validationErrors: null,
          error: null,
        };
      } catch (error) {
        const errorMessage = getErrorMessage(error);

        // The next/navigation functions (redirect() and notFound()) operate by deliberately triggering an error,
        // which will then be handled internally by Next.js. In this specific scenario,
        // we must intentionally propagate the error further.
        if (
          isNextRedirectError(errorMessage) ||
          isNextNotFoundError(errorMessage)
        ) {
          throw error;
        }

        return {
          status: "error",
          isIdle: true,
          isSuccess: false,
          isError: true,
          data: null,
          validationErrors: null,
          error: errorMessage,
        };
      }
    };

    return action;
  };

  return createAction;
};
