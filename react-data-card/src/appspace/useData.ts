import { useEffect, useRef, useState } from "react";
import { fetchJson, type FetchMode } from "./data";

export interface DataState<T> {
  data: T | null;
  error: string | null;
  updatedAt: number | null;
  stale: boolean;
}

const cacheKey = (url: string) => `appspace-card-data:${url}`;

// Poll a JSON URL. Keeps the last good result (also in localStorage, so a restarted
// offline device shows something) and marks it stale on later failures.
export function useData<T = unknown>(url: string, mode: FetchMode, refreshSeconds: number): DataState<T> {
  const [s, setS] = useState<DataState<T>>(() => {
    try {
      const c = localStorage.getItem(cacheKey(url));
      if (c) {
        const { data, updatedAt } = JSON.parse(c);
        return { data, error: null, updatedAt, stale: true };
      }
    } catch { /* storage unavailable */ }
    return { data: null, error: null, updatedAt: null, stale: false };
  });
  const seq = useRef(0);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    const run = async () => {
      const id = ++seq.current;
      try {
        const data = (await fetchJson(url, mode)) as T;
        if (cancelled || id !== seq.current) return;
        const updatedAt = Date.now();
        setS({ data, error: null, updatedAt, stale: false });
        try {
          localStorage.setItem(cacheKey(url), JSON.stringify({ data, updatedAt }));
        } catch { /* quota / unavailable */ }
      } catch (e) {
        if (cancelled || id !== seq.current) return;
        setS((p) => ({ ...p, error: (e as Error).message, stale: p.data !== null }));
      }
    };
    run();
    const timer = setInterval(run, Math.max(10, refreshSeconds) * 1000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [url, mode, refreshSeconds]);

  return s;
}
