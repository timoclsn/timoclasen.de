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
      id: string;
      data: null;
      validationErrors: null;
      error: null;
    }
  | {
      status: "running";
      id: string;
      data: null;
      validationErrors: null;
      error: null;
    }
  | {
      status: "success";
      id: string;
      data: TResponse | null;
      validationErrors: null;
      error: null;
    }
  | {
      status: "validationError";
      id: string;
      data: null;
      validationErrors: InferValidationErrors<TInputSchema>;
      error: null;
    }
  | {
      status: "error";
      id: string;
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

export type ServerFormAction<
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
> = (
  previousState: Result<TInputSchema, TResponse>,
  formData: FormData,
) => Promise<Result<TInputSchema, TResponse>>;

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
