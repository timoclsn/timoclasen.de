import { z } from 'zod';

export type MaybePromise<T> = Promise<T> | T;

// If TInputSchema is a more specific type than z.ZodTypeAny (e.g. z.ZodString),
// then we can infer the input type. Otherwise, no input is needed.
export type InferInputArgs<TInputSchema extends z.ZodTypeAny> =
  z.ZodTypeAny extends TInputSchema ? [] : [input: z.infer<TInputSchema>];

export type InferValidationErrors<TInputSchema extends z.ZodTypeAny> =
  z.inferFlattenedErrors<TInputSchema>['fieldErrors'];

export type Result<TInputSchema extends z.ZodTypeAny, TResponse extends any> =
  | {
      state: 'success';
      data: TResponse | null;
    }
  | {
      state: 'validationError';
      validationErrors: InferValidationErrors<TInputSchema>;
    }
  | {
      state: 'error';
      error: string;
    };

export type ServerAction<
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
> = (
  ...inputArgs: InferInputArgs<TInputSchema>
) => Promise<Result<TInputSchema, TResponse>> | void;
