import { useCallback, useReducer, useTransition } from "react";
import { z } from "zod";
import {
  InferInputArgs,
  InferValidationErrors,
  Result,
  ServerAction,
} from "../types";

export const initalState: Result<any, any> = {
  status: "idle",
  isIdle: true,
  isSuccess: false,
  isError: false,
  data: null,
  error: null,
  validationErrors: null,
};

type Action<TResponse extends any, TInputSchema extends z.ZodTypeAny> =
  | { type: "RUN_ACTION" }
  | { type: "IS_SUCCESS"; data: TResponse | null }
  | {
      type: "IS_VALIDATION_ERROR";
      validationErrors: InferValidationErrors<TInputSchema>;
    }
  | {
      type: "IS_ERROR";
      error: string;
    }
  | { type: "RESET" };

const createReducer =
  <TResponse extends any, TInputSchema extends z.ZodTypeAny>() =>
  (
    state: Result<TInputSchema, TResponse>,
    action: Action<TResponse, TInputSchema>,
  ): Result<TInputSchema, TResponse> => {
    switch (action.type) {
      case "RUN_ACTION":
        return {
          ...state,
          status: "running",
          isIdle: false,
          isSuccess: false,
          isError: false,
          data: null,
          validationErrors: null,
          error: null,
        };
      case "IS_SUCCESS":
        return {
          ...state,
          status: "success",
          isIdle: true,
          isSuccess: true,
          isError: false,
          data: action.data,
          validationErrors: null,
          error: null,
        };
      case "IS_VALIDATION_ERROR":
        return {
          ...state,
          status: "validationError",
          isIdle: true,
          isSuccess: false,
          isError: true,
          data: null,
          validationErrors: action.validationErrors,
          error: null,
        };
      case "IS_ERROR":
        return {
          ...state,
          status: "error",
          isIdle: true,
          isSuccess: false,
          isError: true,
          data: null,
          validationErrors: null,
          error: action.error,
        };
      case "RESET":
        return {
          ...initalState,
        };
      default:
        throw new Error("Unknown action type");
    }
  };

export const useAction = <
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
>(
  inputAction: ServerAction<TInputSchema, TResponse>,
  options: {
    onRunAction?: (...inputArgs: InferInputArgs<TInputSchema>) => void;
    onSuccess?: (
      data: TResponse | null,
      ...inputArgs: InferInputArgs<TInputSchema>
    ) => void;
    onError?: (
      errors: {
        error: string | null;
        validationErrors: InferValidationErrors<TInputSchema> | null;
      },
      ...inputArgs: InferInputArgs<TInputSchema>
    ) => void;
    onSettled?: (...inputArgs: InferInputArgs<TInputSchema>) => void;
    onReset?: () => void;
  } = {},
) => {
  const reducer = createReducer<TResponse, TInputSchema>();
  const [state, dispatch] = useReducer(reducer, initalState);
  const { status, isIdle, isSuccess, isError, data, error, validationErrors } =
    state;
  const [isRunning, startTransition] = useTransition();

  const runAction = useCallback(
    async (...inputArgs: InferInputArgs<TInputSchema>) => {
      options.onRunAction?.(...inputArgs);

      startTransition(async () => {
        dispatch({
          type: "RUN_ACTION",
        });

        try {
          const result = await inputAction(...inputArgs);

          // If /next/navigation function (redirect() and notFound()) is called in the action, the result will be undefined
          // Skip processing because the page will be redirected
          if (!result) {
            return;
          }

          if (result.status === "validationError") {
            dispatch({
              type: "IS_VALIDATION_ERROR",
              validationErrors: result.validationErrors,
            });
            options.onError?.(
              {
                error: null,
                validationErrors: result.validationErrors,
              },
              ...inputArgs,
            );
          }

          if (result.status === "error") {
            dispatch({
              type: "IS_ERROR",
              error: result.error,
            });
            options.onError?.(
              {
                error: result.error,
                validationErrors: null,
              },
              ...inputArgs,
            );
          }

          if (result.status === "success") {
            dispatch({
              type: "IS_SUCCESS",
              data: result.data,
            });
            options.onSuccess?.(result.data, ...inputArgs);
          }
        } catch (error) {
          const userErrorMessage = "Something went wrong. Please try again.";
          dispatch({
            type: "IS_ERROR",
            error: userErrorMessage,
          });
          options.onError?.(
            {
              error: userErrorMessage,
              validationErrors: null,
            },
            ...inputArgs,
          );
          console.error(error);
        }
      });

      options.onSettled?.(...inputArgs);
    },
    [inputAction, options],
  );

  const reset = useCallback(() => {
    dispatch({
      type: "RESET",
    });
    options.onReset?.();
  }, [options]);

  return {
    runAction,
    status,
    isIdle,
    isRunning,
    isSuccess,
    isError,
    data,
    error,
    validationErrors,
    reset,
  };
};
