import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

interface AwaitProps<T> {
  promise: Promise<T>;
  loading?: ReactNode;
  error?: ReactNode;
  children: (value: T) => JSX.Element | null;
}

export const Await = <T extends unknown>({
  promise,
  children,
  loading,
  error,
}: AwaitProps<T>) => {
  const content = (
    <Suspense fallback={loading}>
      <InnerAwait promise={promise}>{children}</InnerAwait>
    </Suspense>
  );

  if (error) {
    return <ErrorBoundary fallback={error}>{content}</ErrorBoundary>;
  }

  return content;
};

interface InnerAwaitProps<T> {
  promise: AwaitProps<T>["promise"];
  children: AwaitProps<T>["children"];
}

const InnerAwait = async <T extends unknown>({
  promise,
  children,
}: InnerAwaitProps<T>) => {
  const data = await promise;
  return children(data);
};
