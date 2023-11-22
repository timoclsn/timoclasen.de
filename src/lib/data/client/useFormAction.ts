import { useEffect } from "react";
import { useFormState } from "react-dom";
import { z } from "zod";
import { InferValidationErrors, ServerFormAction } from "../types";
import { initalState } from "./initialState";

export const useFormAction = <
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
>(
  action: ServerFormAction<TInputSchema, TResponse>,
  options: {
    onSuccess?: (data: TResponse | null) => void;
    onError?: (errors: {
      error: string | null;
      validationErrors: InferValidationErrors<TInputSchema> | null;
    }) => void;
  } = {},
) => {
  const [state, formAction] = useFormState(action, initalState);

  useEffect(() => {
    if (state.status === "success") {
      options.onSuccess?.(state.data);
    } else if (state.status === "error") {
      options.onError?.({
        error: state.error,
        validationErrors: state.validationErrors,
      });
    }
  }, [options, state.data, state.error, state.status, state.validationErrors]);

  return {
    runAction: formAction,
    ...state,
  };
};
