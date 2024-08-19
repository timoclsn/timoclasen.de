export const DEFAULT_ERROR_MESSAGE = "Something went wrong.";
const ERROR_NAME = "ActionError";

export class ActionError extends Error {
  public override readonly cause?: Error;
  public readonly log?;
  public readonly name = ERROR_NAME;

  constructor(opts: { message: string; log?: string; cause?: Error }) {
    super(opts.message);
    this.message = opts.message;
    this.log = opts.log;
    this.cause = opts.cause;
  }
}

export const isActionError = (error: unknown): error is ActionError =>
  error instanceof Error && error.name.includes(ERROR_NAME);
