"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { isQueryError } from "../../lib/data/errors";
import { track } from "../../lib/tracking";

type FallbackComponent = (props: { message?: string }) => ReactNode;
export type Fallback = ReactNode | FallbackComponent;

interface Props {
  children?: ReactNode;
  fallback?: Fallback;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Caught error:", error, errorInfo);
    track("Caught error", {
      componentStack: errorInfo.componentStack ?? "",
      digest: errorInfo.digest ?? "",
    });
  }

  public render() {
    if (this.state.error) {
      if (typeof this.props.fallback === "function") {
        const Fallback = this.props.fallback;
        const queryErrorMessage = this.state.error.message.split(":")[1];
        const message = isQueryError(this.state.error)
          ? queryErrorMessage
          : undefined;

        return <Fallback message={message} />;
      }

      return this.props.fallback;
    }

    return this.props.children;
  }
}
