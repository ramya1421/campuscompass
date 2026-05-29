"use client";

import { useCallback, useEffect, useState } from "react";
import { COMPARE_STORAGE_KEY } from "@/lib/constants";

export function useCompare() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (stored) {
      setIds(JSON.parse(stored) as string[]);
    }
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(next));
  }, []);

  const toggle = useCallback(
    (id: string) => {
      if (ids.includes(id)) {
        persist(ids.filter((item) => item !== id));
        return;
      }
      if (ids.length >= 3) {
        persist([...ids.slice(1), id]);
        return;
      }
      persist([...ids, id]);
    },
    [ids, persist],
  );

  const clear = useCallback(() => persist([]), [persist]);

  return { ids, toggle, clear };
}
