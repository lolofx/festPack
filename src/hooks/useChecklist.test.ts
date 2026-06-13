import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useChecklist } from "./useChecklist";

const FID = "test-festival-id";

describe("useChecklist", () => {
  beforeEach(() => localStorage.clear());

  it("starts with no checked items", () => {
    const { result } = renderHook(() => useChecklist(FID));
    expect(result.current.checkedItems).toEqual([]);
  });

  it("toggles an item on", () => {
    const { result } = renderHook(() => useChecklist(FID));
    act(() => { result.current.toggleItem("vet-tshirts"); });
    expect(result.current.checkedItems).toContain("vet-tshirts");
  });

  it("toggles an item off", () => {
    const { result } = renderHook(() => useChecklist(FID));
    act(() => { result.current.toggleItem("vet-tshirts"); });
    act(() => { result.current.toggleItem("vet-tshirts"); });
    expect(result.current.checkedItems).not.toContain("vet-tshirts");
  });

  it("persists progress to localStorage", () => {
    const { result } = renderHook(() => useChecklist(FID));
    act(() => { result.current.toggleItem("vet-tshirts"); });
    const stored = JSON.parse(localStorage.getItem(`festpack:progress:${FID}`) ?? "null");
    expect(stored.checkedItems).toContain("vet-tshirts");
    expect(stored.festivalId).toBe(FID);
  });

  it("resets all checked items", () => {
    const { result } = renderHook(() => useChecklist(FID));
    act(() => {
      result.current.toggleItem("vet-tshirts");
      result.current.toggleItem("vet-sweat");
    });
    act(() => { result.current.resetChecklist(); });
    expect(result.current.checkedItems).toEqual([]);
  });

  it("computes progress percentage correctly", () => {
    const { result } = renderHook(() => useChecklist(FID));
    expect(result.current.getProgressPercent(10)).toBe(0);
    act(() => { result.current.toggleItem("item-1"); });
    expect(result.current.getProgressPercent(10)).toBe(10);
    act(() => { result.current.toggleItem("item-2"); });
    expect(result.current.getProgressPercent(10)).toBe(20);
  });

  it("isChecked returns correct boolean", () => {
    const { result } = renderHook(() => useChecklist(FID));
    expect(result.current.isChecked("vet-tshirts")).toBe(false);
    act(() => { result.current.toggleItem("vet-tshirts"); });
    expect(result.current.isChecked("vet-tshirts")).toBe(true);
  });
});
