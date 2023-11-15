"use client";

import { Toaster } from "react-hot-toast";
import { useTheme } from "./ThemeProvider";

const lightToast = {
  minWidth: "300px",
  borderRadius: "1rem",
  background: "#FFFFFF",
  color: "#000000",
};

const darkToast = {
  minWidth: "300px",
  borderRadius: "1rem",
  background: "#333333",
  color: "#FFFFFF",
};

export const ToastProvider = () => {
  const { darkMode } = useTheme();
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{ style: darkMode ? darkToast : lightToast }}
    />
  );
};
