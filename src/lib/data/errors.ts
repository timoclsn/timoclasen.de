export const DEFAULT_ERROR_MESSAGE = 'Something went wrong.';

export class ActionError extends Error {
  public override readonly cause?: Error;
  public readonly log?;

  constructor(opts: { message: string; log?: string; cause?: Error }) {
    super(opts.message);
    this.name = 'ActionError';
    this.message = opts.message;
    this.log = opts.log;
    this.cause = opts.cause;
  }
}
