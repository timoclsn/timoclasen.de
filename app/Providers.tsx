"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "../components/ThemeContext";
import { ToastProvider } from "../components/ToastProvider";

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
