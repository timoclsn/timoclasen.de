import {
  ComponentPropsWithoutRef,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { z } from "zod";
import { InferValidationErrors, Result, ServerAction } from "../types";
import { initalState } from "./initialState";

interface FormStatusProps {
  onPendingChange: (pending: boolean) => void;
}

const FormStatus = ({ onPendingChange }: FormStatusProps) => {
  const { pending } = useFormStatus();

  useEffect(() => {
    onPendingChange(pending);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending]);

  return null;
};

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
  const [state, formAction] = useFormState<
    Result<TInputSchema, TResponse>,
    FormData
  >(action, initalState);
  const [isRunning, setIsRunning] = useState(false);

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

  type FormProps = Omit<ComponentPropsWithoutRef<"form">, "action"> & {
    refProp?: RefObject<HTMLFormElement>;
  };

  const Form = useCallback(({ children, refProp, ...rest }: FormProps) => {
    return (
      <form ref={refProp} action={formAction} {...rest}>
        <FormStatus onPendingChange={setIsRunning} />
        {children}
      </form>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    Form,
    ...state,
    isSuccess,
    isError,
    isRunning,
  };
};
