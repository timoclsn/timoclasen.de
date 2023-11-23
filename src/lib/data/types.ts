import { z } from "zod";

export type MaybePromise<T> = Promise<T> | T;

// If TInputSchema is a more specific type than z.ZodTypeAny (e.g. z.ZodString),
// then we can infer the input type. Otherwise, no input is needed.
export type InferInputArgs<TInputSchema extends z.ZodTypeAny> =
  z.ZodTypeAny extends TInputSchema ? [] : [input: z.input<TInputSchema>];

export type InferValidationErrors<TInputSchema extends z.ZodTypeAny> =
  z.inferFlattenedErrors<TInputSchema>["fieldErrors"];

export interface CreateClientOptions<Context> {
  middleware?: () => MaybePromise<Context>;
}

// Client Action

export type Result<TInputSchema extends z.ZodTypeAny, TResponse extends any> =
  | {
      status: "initial";
      isIdle: true;
      isSuccess: false;
      isError: false;
      data: null;
      validationErrors: null;
      error: null;
    }
  | {
      status: "running";
      isIdle: false;
      isSuccess: false;
      isError: false;
      data: null;
      validationErrors: null;
      error: null;
    }
  | {
      status: "success";
      isIdle: true;
      isSuccess: true;
      isError: false;
      data: TResponse | null;
      validationErrors: null;
      error: null;
    }
  | {
      status: "validationError";
      isIdle: true;
      isSuccess: false;
      isError: true;
      data: null;
      validationErrors: InferValidationErrors<TInputSchema>;
      error: null;
    }
  | {
      status: "error";
      isIdle: true;
      isSuccess: false;
      isError: true;
      data: null;
      validationErrors: null;
      error: string;
    };

export type ServerAction<
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
> = (
  ...inputArgs: InferInputArgs<TInputSchema>
) => Promise<Result<TInputSchema, TResponse>>;

// Form Action

// FormActionResult is the same as Result, but the object with status of "running" is removed.
export type FormActionResult<
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
> = Result<TInputSchema, TResponse> extends infer R
  ? R extends { status: "running" }
    ? never
    : R
  : never;

export type ServerFormAction<
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
> = (
  previousState: FormActionResult<TInputSchema, TResponse>,
  formData: FormData,
) => Promise<FormActionResult<TInputSchema, TResponse>>;

// Query

export type ServerQuery<
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
> = (...inputArgs: InferInputArgs<TInputSchema>) => Promise<TResponse>;

export interface CacheOptions {
  noStore?: boolean;
  keyParts?: Array<string>;
  options?: {
    revalidate?: number | false;
    tags?: Array<string>;
  };
}
