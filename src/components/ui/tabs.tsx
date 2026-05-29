"use client";

import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export function Tabs({
  defaultValue,
  children,
  className,
}: {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const context = useContext(TabsContext);
  if (!context) return null;

  const active = context.value === value;

  return (
    <button
      type="button"
      onClick={() => context.setValue(value)}
      className={cn(
        "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-white text-blue-700 shadow-sm dark:bg-slate-800 dark:text-blue-300"
          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context || context.value !== value) return null;
  return <div className={cn("mt-6", className)}>{children}</div>;
}
