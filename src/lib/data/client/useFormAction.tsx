import { useActionState, useEffect } from "react";
import { z } from "zod";
import { InferValidationErrors, Result, ServerAction } from "../types";
import { initalState } from "./initialState";

export const useFormAction = <
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
>(
  action: ServerAction<TInputSchema, TResponse>,
  options: {
    onRunAction?: () => void;
    onSuccess?: (data: TResponse | null) => void;
    onError?: (errors: {
      error: string | null;
      validationErrors: InferValidationErrors<TInputSchema> | null;
    }) => void;
    onSettled?: () => void;
  } = {},
) => {
  const [state, formAction, isRunning] = useActionState<
    Result<TInputSchema, TResponse>,
    FormData
  >(action, initalState);

  const isSuccess = state.status === "success";
  const isError =
    state.status === "error" || state.status === "validationError";

  useEffect(() => {
    if (isRunning) {
      options.onRunAction?.();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  useEffect(() => {
    if (!state.id) return; // Only run on server response

    if (isSuccess) {
      options.onSuccess?.(state.data);
    }

    if (isError) {
      options.onError?.({
        error: state.error,
        validationErrors: state.validationErrors,
      });
    }

    options.onSettled?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.id]);

  return {
    action: formAction,
    ...state,
    isSuccess,
    isError,
    isRunning,
  };
};
