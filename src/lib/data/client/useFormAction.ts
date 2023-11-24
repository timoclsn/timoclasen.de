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
    onRunAction?: () => void;
    onSuccess?: (data: TResponse | null) => void;
    onError?: (errors: {
      error: string | null;
      validationErrors: InferValidationErrors<TInputSchema> | null;
    }) => void;
    onSettled?: () => void;
  } = {},
) => {
  const [state, formAction] = useFormState(action, initalState);

  useEffect(() => {
    if (!state.id) return; // Only run on server response

    if (state.isSuccess) {
      options.onSuccess?.(state.data);
    }

    if (state.isError) {
      options.onError?.({
        error: state.error,
        validationErrors: state.validationErrors,
      });
    }

    options.onSettled?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.id]);

  // Attach to form submit button to make onRunAction work
  const onSubmitClick = () => {
    options.onRunAction?.();
  };

  return {
    runAction: formAction,
    onSubmitClick,
    ...state,
  };
};
