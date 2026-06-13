import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import type { ChecklistItem } from "../../types";

interface CheckItemProps {
  item: ChecklistItem;
  checked: boolean;
  onToggle: (id: string) => void;
}

export function CheckItem({ item, checked, onToggle }: CheckItemProps) {
  const [bouncing, setBouncing] = useState(false);

  const handleClick = () => {
    setBouncing(true);
    onToggle(item.id);
    setTimeout(() => setBouncing(false), 200);
  };

  return (
    <div
      className="check-item"
      onClick={handleClick}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => e.key === " " && handleClick()}
    >
      <div className={`checkbox-metal ${checked ? "checked" : ""} ${bouncing ? "checkbox-bounce" : ""}`}>
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path
              d="M1 5L4.5 8.5L11 1"
              stroke="#39ff14"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <span className={`font-body text-sm transition-colors ${checked ? "text-metal-silver line-through" : "text-white"}`}>
          {item.label}
        </span>
        {item.isWarning && item.note && (
          <div className="flex items-center gap-1 mt-0.5">
            <AlertTriangle size={11} className="text-metal-fire flex-shrink-0" />
            <span className="text-xs text-metal-fire font-body">{item.note}</span>
          </div>
        )}
      </div>

      {item.optional && <span className="badge-optional">optionnel</span>}
    </div>
  );
}
