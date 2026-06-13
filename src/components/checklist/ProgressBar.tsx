import { getProgressColor, PROGRESS_HEX } from "./progressColor";

interface ProgressBarProps {
  checked: number;
  total: number;
  className?: string;
}

export function ProgressBar({ checked, total, className = "" }: ProgressBarProps) {
  const percent = total === 0 ? 0 : Math.round((checked / total) * 100);
  const color = getProgressColor(percent);
  const hex = PROGRESS_HEX[color];

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-body text-metal-silver uppercase tracking-wider">
          Progression
        </span>
        <span className="text-sm font-body font-semibold tabular-nums" style={{ color: hex }}>
          {checked}/{total} — {percent}%
        </span>
      </div>
      <div className="w-full h-2 bg-metal-border overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            backgroundColor: hex,
            boxShadow: `0 0 8px ${hex}80`,
          }}
        />
      </div>
    </div>
  );
}
