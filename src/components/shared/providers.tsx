"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              "text-sm bg-white text-slate-900 border border-slate-200 dark:bg-slate-900 dark:text-white dark:border-slate-700",
          }}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}
