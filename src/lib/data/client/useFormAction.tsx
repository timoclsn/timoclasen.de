import {
  ComponentPropsWithoutRef,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
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
  const wasPendingRef = useRef(false);
  const [state, formAction] = useFormState(action, initalState);

  const [isRunning, setIsRunning] = useState(false);
  const isSuccess = state.status === "success";
  const isError =
    state.status === "error" || state.status === "validationError";

  const FormStatus = () => {
    const { pending } = useFormStatus();

    // We have to keep track of the previous pending state outside of the component
    // to be able to compare it with the current pending state because the reference
    // of pending also changes on every render.
    const hasUpdated = wasPendingRef.current !== pending;

    useEffect(() => {
      if (hasUpdated) {
        setIsRunning(pending);

        if (pending) {
          options.onRunAction?.();
        }

        if (!pending) {
          options.onSettled?.();
        }

        wasPendingRef.current = pending;
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pending]);
    return null;
  };

  type FormProps = Omit<ComponentPropsWithoutRef<"form">, "action"> & {
    refProp?: RefObject<HTMLFormElement>;
  };

  const Form = useCallback(({ children, refProp, ...rest }: FormProps) => {
    return (
      <form ref={refProp} action={formAction} {...rest}>
        <FormStatus />
        {children}
      </form>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.id]);

  return {
    Form,
    ...state,
    isSuccess,
    isError,
    isRunning,
  };
};
