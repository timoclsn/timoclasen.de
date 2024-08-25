//
// Action Error
// Use this error in actions on the server to pass the error message directly to the ui.
//

export const DEFAULT_ACTION_ERROR_MESSAGE = "Etwas ist schiefgelaufen…";
const ACTION_ERROR_NAME = "ActionError";

export class ActionError extends Error {
  public readonly log?;
  public readonly name = ACTION_ERROR_NAME;

  constructor(opts: { message: string; log?: string; cause?: unknown }) {
    super(opts.message);
    this.log = opts.log;
    this.cause = opts.cause;
  }
}

export const isActionError = (error: unknown): error is ActionError =>
  error instanceof Error && error.name.includes(ACTION_ERROR_NAME);

//
// Query Error
// Use this error in queries on the server to pass the error message directly to the ui.
//

export const DEFAULT_QUERY_ERROR_MESSAGE = "Fehler beim Laden…";
const QUERY_ERROR_NAME = "QueryError";

// When a query error is thrown, the message is the only value that is passed to the error boundary.
// To provide more context to the error boundary (detecting a QueryError), we prefix the message with the error name.
const QUERY_ERROR_PREFIX = `${QUERY_ERROR_NAME}:`;

export class QueryError extends Error {
  public readonly name = QUERY_ERROR_NAME;

  constructor(opts: { message: string; cause?: unknown }) {
    super(`${QUERY_ERROR_PREFIX}${opts.message}`);
    this.cause = opts.cause;
  }
}

export const isQueryError = (error: unknown): error is QueryError =>
  error instanceof Error && error.message.startsWith(QUERY_ERROR_PREFIX);
