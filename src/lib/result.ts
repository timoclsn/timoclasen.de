export type OkResult<TValue> = {
  val: TValue;
  err?: never;
};

export type ErrResult<TError extends { type: string }> = {
  val?: never;
  err: TError;
};

export type Result<TValue, TError extends { type: string }> =
  | OkResult<TValue>
  | ErrResult<TError>;

export function Ok(): OkResult<never>;
export function Ok<TValue>(val: TValue): OkResult<TValue>;
export function Ok<TValue>(val?: TValue): OkResult<TValue> {
  return { val } as OkResult<TValue>;
}

export function Err<
  TType extends string,
  TContext extends Record<string, unknown>,
>(error: { type: TType } & TContext): ErrResult<{ type: TType } & TContext> {
  return { err: error };
}
