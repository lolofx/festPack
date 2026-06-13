import { useState, useCallback } from "react";
import type { FestivalProgress } from "../types";
import { STORAGE_KEYS } from "../types";
import { localStorageAdapter } from "../utils/storage";

export function useChecklist(festivalId: string) {
  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    const stored = localStorageAdapter.get<FestivalProgress>(STORAGE_KEYS.progress(festivalId));
    return stored?.checkedItems ?? [];
  });

  const toggleItem = useCallback(
    (itemId: string) => {
      setCheckedItems((prev) => {
        const next = prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId];
        localStorageAdapter.set(STORAGE_KEYS.progress(festivalId), {
          festivalId,
          checkedItems: next,
          lastUpdated: new Date().toISOString(),
        } satisfies FestivalProgress);
        return next;
      });
    },
    [festivalId]
  );

  const resetChecklist = useCallback(() => {
    localStorageAdapter.set(STORAGE_KEYS.progress(festivalId), {
      festivalId,
      checkedItems: [],
      lastUpdated: new Date().toISOString(),
    } satisfies FestivalProgress);
    setCheckedItems([]);
  }, [festivalId]);

  const getProgressPercent = useCallback(
    (totalItems: number): number => {
      if (totalItems === 0) return 0;
      return Math.round((checkedItems.length / totalItems) * 100);
    },
    [checkedItems.length]
  );

  const isChecked = useCallback(
    (itemId: string) => checkedItems.includes(itemId),
    [checkedItems]
  );

  return { checkedItems, toggleItem, resetChecklist, getProgressPercent, isChecked };
}
