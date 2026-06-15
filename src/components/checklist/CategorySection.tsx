import { useState, useEffect } from "react";
import {
  ChevronDown, ChevronRight, Shirt, Footprints, Sparkles, Zap,
  HeartPulse, Tent, Droplets, Utensils, Backpack, PlusCircle,
  Wallet, Car, User, Package,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ChecklistCategory } from "../../types";
import { STORAGE_KEYS } from "../../types";
import { localStorageAdapter } from "../../utils/storage";
import { CheckItem } from "./CheckItem";

type IconComponent = React.ComponentType<LucideProps>;

const ICON_MAP: Record<string, IconComponent> = {
  shirt: Shirt,
  footprints: Footprints,
  sparkles: Sparkles,
  zap: Zap,
  "heart-pulse": HeartPulse,
  tent: Tent,
  droplets: Droplets,
  utensils: Utensils,
  backpack: Backpack,
  "plus-circle": PlusCircle,
  wallet: Wallet,
  car: Car,
  user: User,
  package: Package,
};

interface CategorySectionProps {
  category: ChecklistCategory;
  checkedItems: string[];
  onToggle: (id: string) => void;
  festivalId: string;
  filter: "all" | "todo" | "done";
  collapseSignal?: { v: number; collapsed: boolean } | null;
}

export function CategorySection({ category, checkedItems, onToggle, festivalId, filter, collapseSignal }: CategorySectionProps) {
  const storageKey = STORAGE_KEYS.collapsed(festivalId);

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const stored = localStorageAdapter.get<string[]>(storageKey) ?? [];
    return stored.includes(category.id);
  });

  useEffect(() => {
    if (collapseSignal != null) setCollapsed(collapseSignal.collapsed);
  }, [collapseSignal]);

  useEffect(() => {
    const stored = localStorageAdapter.get<string[]>(storageKey) ?? [];
    const updated = collapsed
      ? [...new Set([...stored, category.id])]
      : stored.filter((id) => id !== category.id);
    localStorageAdapter.set(storageKey, updated);
  }, [collapsed, category.id, storageKey]);

  const checkedCount = category.items.filter((i) => checkedItems.includes(i.id)).length;
  const total = category.items.length;

  const filteredItems = category.items.filter((item) => {
    if (filter === "todo") return !checkedItems.includes(item.id);
    if (filter === "done") return checkedItems.includes(item.id);
    return true;
  });

  if (filteredItems.length === 0) return null;

  const Icon = ICON_MAP[category.icon];

  return (
    <div className="border border-metal-border mb-2">
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-metal-surface hover:bg-metal-border/30 transition-colors"
        onClick={() => setCollapsed((v) => !v)}
      >
        <div className="flex items-center gap-2.5">
          {Icon ? (
            <Icon size={15} className="text-metal-neon flex-shrink-0" />
          ) : (
            <span className="text-base">📦</span>
          )}
          <span className="font-body font-semibold text-sm text-white uppercase tracking-wide">
            {category.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-body tabular-nums ${checkedCount === total ? "text-metal-neon" : "text-metal-silver"}`}>
            {checkedCount}/{total}
          </span>
          {collapsed
            ? <ChevronRight size={15} className="text-metal-silver" />
            : <ChevronDown size={15} className="text-metal-silver" />
          }
        </div>
      </button>

      {!collapsed && (
        <div className="px-2">
          {filteredItems.map((item) => (
            <CheckItem
              key={item.id}
              item={item}
              checked={checkedItems.includes(item.id)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
