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
