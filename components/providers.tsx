"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";

export function Providers({ children }: any) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
