export const DEFAULT_ERROR_MESSAGE = "Something went wrong.";

export class ActionError extends Error {
  public override readonly cause?: Error;
  public readonly log?;

  constructor(opts: { message: string; log?: string; cause?: Error }) {
    super(opts.message);
    this.name = "ActionError";
    this.message = opts.message;
    this.log = opts.log;
    this.cause = opts.cause;
  }
}

export type ErrorContext = Record<string, unknown>;

export abstract class BaseError<
  TContext extends ErrorContext = ErrorContext,
> extends Error {
  public readonly context?: TContext;

  constructor(
    opts: {
      message?: string;
      cause?: Error;
      context?: TContext;
    } = {},
  ) {
    super(opts.message, {
      cause: opts.cause,
    });
    this.context = opts.context;
  }

  public toString() {
    return `${this.name}: ${this.message} - ${JSON.stringify(
      this.context,
    )} - caused by ${this.cause?.toString()}`;
  }
}

const isError = (val: unknown): val is Error => val instanceof Error;

class DividedByZeroError extends Error {}
class DividedBy10Error extends Error {}

const divide = (a: number, b: number) => {
  if (b === 0) {
    return new DividedByZeroError();
  }

  if (b === 10) {
    return new DividedBy10Error();
  }

  return a / b;
};

const addTwo = () => {
  const result = divide(10, 0);

  // Forward error
  if (isError(result)) {
    return result;
  }

  return result + 2;
};

const main = () => {
  const result = addTwo();

  // Handle errors
  if (result instanceof DividedByZeroError) {
    console.error(result.name);
    return;
  } else if (result instanceof DividedBy10Error) {
    console.error(result.name);
    return;
  }

  console.log(result);
};

main();
