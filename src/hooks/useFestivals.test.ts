import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFestivals } from "./useFestivals";

describe("useFestivals", () => {
  beforeEach(() => localStorage.clear());

  it("starts with empty list", () => {
    const { result } = renderHook(() => useFestivals());
    expect(result.current.festivals).toEqual([]);
  });

  it("creates a festival with all required fields", () => {
    const { result } = renderHook(() => useFestivals());
    act(() => { result.current.createFestival({ name: "Hellfest 2025", emoji: "🤘" }); });
    expect(result.current.festivals).toHaveLength(1);
    expect(result.current.festivals[0].name).toBe("Hellfest 2025");
    expect(result.current.festivals[0].id).toBeTruthy();
    expect(result.current.festivals[0].createdAt).toBeTruthy();
  });

  it("persists festivals to localStorage", () => {
    const { result } = renderHook(() => useFestivals());
    act(() => { result.current.createFestival({ name: "Download" }); });
    const stored = JSON.parse(localStorage.getItem("festpack:festivals") ?? "[]");
    expect(stored).toHaveLength(1);
  });

  it("deletes a festival and clears its progress", () => {
    const { result } = renderHook(() => useFestivals());
    act(() => { result.current.createFestival({ name: "Hellfest" }); });
    const id = result.current.festivals[0].id;
    localStorage.setItem(`festpack:progress:${id}`, JSON.stringify({ checkedItems: ["x"] }));
    act(() => { result.current.deleteFestival(id); });
    expect(result.current.festivals).toHaveLength(0);
    expect(localStorage.getItem(`festpack:progress:${id}`)).toBeNull();
  });

  it("loads festivals from localStorage on mount", () => {
    const fest = { id: "abc", name: "Wacken", emoji: "🤘", createdAt: new Date().toISOString() };
    localStorage.setItem("festpack:festivals", JSON.stringify([fest]));
    const { result } = renderHook(() => useFestivals());
    expect(result.current.festivals[0].name).toBe("Wacken");
  });
});
