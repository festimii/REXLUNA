"use client";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    {children}
  </ThemeProvider>
);
