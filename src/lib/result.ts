export type Ok<TValue> = {
  val: TValue;
  err?: never;
};

type ErrorContext = Record<string, unknown>;
type BaseError<TType extends string> = { type: TType } & ErrorContext;

export type Err<TType extends string, TError extends BaseError<TType>> = {
  val?: never;
  err: TError;
};

export type Result<
  TValue,
  TType extends string,
  TError extends BaseError<TType>,
> = Ok<TValue> | Err<TType, TError>;

export function Ok(): Ok<never>;
export function Ok<TValue>(val: TValue): Ok<TValue>;
export function Ok<TValue>(val?: TValue): Ok<TValue> {
  return { val } as Ok<TValue>;
}

export function Err<TType extends string, TError extends BaseError<TType>>(
  error: TError,
): Err<TType, TError> {
  return { err: error };
}

export const tryCatch = async <TValue, TErrorType extends string>(
  promise: Promise<TValue>,
  errorType: TErrorType,
) => {
  try {
    return Ok(await promise);
  } catch (error) {
    return Err({
      type: errorType,
      error,
    });
  }
};

const divide = (a: number, b: number) => {
  if (b === 0) {
    return Err({
      type: "DividedByZeroError",
    });
  }
  if (b === 10) {
    return Err({
      type: "DividedBy10Error",
    });
  }
  return Ok(a / b);
};

const doStuff = () => {
  const { val, err } = divide(10, 0);

  if (err) {
    if (err.type === "DividedByZeroError") {
      throw new Error("Divided by zero");
    }

    return err;
  }

  return val;
};

const main = () => {
  const result = divide(100, 0);

  if (result instanceof DivideByZeroError) {
    return;
  }

  result;
};
