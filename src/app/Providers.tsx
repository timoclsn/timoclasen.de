"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "../components/ThemeProvider/ThemeProvider";
import { ToastProvider } from "../components/ToastProvider/ToastProvider";

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider>
      {children}
      <ToastProvider />
    </ThemeProvider>
  );
};
