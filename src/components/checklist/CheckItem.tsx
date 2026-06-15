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
      onKeyDown={(e) => (e.key === " " || e.key === "Enter") && handleClick()}
    >
      <div className={`checkbox-metal ${checked ? "checked" : ""} ${bouncing ? "checkbox-bounce" : ""}`}>
        {checked && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* os 1 : diagonale haut-gauche → bas-droit */}
            <line x1="2" y1="2" x2="12" y2="12" stroke="#39ff14" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="1.8" cy="1.8" r="2" stroke="#39ff14" strokeWidth="1.3" />
            <circle cx="12.2" cy="12.2" r="2" stroke="#39ff14" strokeWidth="1.3" />
            {/* os 2 : diagonale haut-droit → bas-gauche */}
            <line x1="12" y1="2" x2="2" y2="12" stroke="#39ff14" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12.2" cy="1.8" r="2" stroke="#39ff14" strokeWidth="1.3" />
            <circle cx="1.8" cy="12.2" r="2" stroke="#39ff14" strokeWidth="1.3" />
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
