import { describe, it, expect, beforeEach } from "vitest";
import { localStorageAdapter } from "./storage";

describe("localStorageAdapter", () => {
  beforeEach(() => localStorage.clear());

  it("returns null for missing key", () => {
    expect(localStorageAdapter.get("missing")).toBeNull();
  });

  it("stores and retrieves an object", () => {
    const obj = { id: "1", name: "Hellfest" };
    localStorageAdapter.set("test", obj);
    expect(localStorageAdapter.get("test")).toEqual(obj);
  });

  it("removes a key", () => {
    localStorageAdapter.set("test", { x: 1 });
    localStorageAdapter.remove("test");
    expect(localStorageAdapter.get("test")).toBeNull();
  });

  it("returns null on invalid JSON without throwing", () => {
    localStorage.setItem("bad", "not-json{{{");
    expect(localStorageAdapter.get("bad")).toBeNull();
  });
});
