import { useState, useCallback } from "react";
import type { Festival } from "../types";
import { STORAGE_KEYS } from "../types";
import { localStorageAdapter } from "../utils/storage";

type CreateFestivalInput = Pick<Festival, "name"> &
  Partial<Pick<Festival, "location" | "dateStart" | "dateEnd" | "emoji">>;

export function useFestivals() {
  const [festivals, setFestivals] = useState<Festival[]>(() => {
    return localStorageAdapter.get<Festival[]>(STORAGE_KEYS.festivals) ?? [];
  });

  const save = useCallback((updated: Festival[]) => {
    localStorageAdapter.set(STORAGE_KEYS.festivals, updated);
    setFestivals(updated);
  }, []);

  const createFestival = useCallback(
    (input: CreateFestivalInput) => {
      const festival: Festival = {
        id: crypto.randomUUID(),
        name: input.name,
        location: input.location,
        dateStart: input.dateStart,
        dateEnd: input.dateEnd,
        emoji: input.emoji ?? "🤘",
        createdAt: new Date().toISOString(),
      };
      save([...festivals, festival]);
    },
    [festivals, save]
  );

  const deleteFestival = useCallback(
    (id: string) => {
      save(festivals.filter((f) => f.id !== id));
      localStorageAdapter.remove(STORAGE_KEYS.progress(id));
      localStorageAdapter.remove(STORAGE_KEYS.collapsed(id));
    },
    [festivals, save]
  );

  return { festivals, createFestival, deleteFestival };
}
