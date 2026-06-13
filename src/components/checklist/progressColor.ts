export type ProgressColor = "blood" | "fire" | "neon";

export function getProgressColor(percent: number): ProgressColor {
  if (percent <= 33) return "blood";
  if (percent <= 66) return "fire";
  return "neon";
}

export const PROGRESS_HEX: Record<ProgressColor, string> = {
  blood: "#cc0000",
  fire:  "#ff6600",
  neon:  "#39ff14",
};
