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

  const proxiedFormAction = new Proxy(formAction, {
    apply: (target, thisArg, argumentsList) => {
      options.onRunAction?.();
      const [payload] = argumentsList;
      return target.apply(thisArg, [payload]);
    },
  });

  useEffect(() => {
    if (state.status === "initial") return;

    if (state.status === "success") {
      options.onSuccess?.(state.data);
    }

    if (state.status === "error" || state.status === "validationError") {
      options.onError?.({
        error: state.error,
        validationErrors: state.validationErrors,
      });
    }

    options.onSettled?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  return {
    runAction: proxiedFormAction,
    ...state,
  };
};
