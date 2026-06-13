import { describe, it, expect } from "vitest";
import { getProgressColor } from "./progressColor";

describe("getProgressColor", () => {
  it("returns blood for 0%", () => expect(getProgressColor(0)).toBe("blood"));
  it("returns blood for 33%", () => expect(getProgressColor(33)).toBe("blood"));
  it("returns fire for 34%", () => expect(getProgressColor(34)).toBe("fire"));
  it("returns fire for 66%", () => expect(getProgressColor(66)).toBe("fire"));
  it("returns neon for 67%", () => expect(getProgressColor(67)).toBe("neon"));
  it("returns neon for 100%", () => expect(getProgressColor(100)).toBe("neon"));
});
