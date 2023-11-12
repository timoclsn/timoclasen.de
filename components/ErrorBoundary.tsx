"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { getErrorMessage } from "../lib/utils";
import { track } from "../lib/tracking";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorMEssage = getErrorMessage(error);
    console.error("Uncaught error:", error, errorInfo);
    track("Uncaught error", { message: errorMEssage });
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
