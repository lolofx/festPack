import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import { MetalHeader } from "../layout/MetalHeader";
import { ProgressBar } from "./ProgressBar";
import { CategorySection } from "./CategorySection";
import { useFestivals } from "../../hooks/useFestivals";
import { useChecklist } from "../../hooks/useChecklist";
import { DEFAULT_CHECKLIST } from "../../data/defaultChecklist";

type Filter = "all" | "todo" | "done";
const FILTER_LABELS: Record<Filter, string> = { all: "Tout", todo: "À faire", done: "Faits" };
const FILTERS: Filter[] = ["all", "todo", "done"];
const TOTAL_ITEMS = DEFAULT_CHECKLIST.reduce((sum, cat) => sum + cat.items.length, 0);

export function ChecklistPage() {
  const { id } = useParams<{ id: string }>();
  const { festivals } = useFestivals();
  const festival = festivals.find((f) => f.id === id);

  const [filter, setFilter] = useState<Filter>(
    () => (sessionStorage.getItem("festpack:filter") as Filter) ?? "all"
  );

  const { checkedItems, toggleItem, resetChecklist } = useChecklist(id ?? "");

  if (!festival) return <Navigate to="/" replace />;

  const handleFilterChange = (f: Filter) => {
    setFilter(f);
    sessionStorage.setItem("festpack:filter", f);
  };

  const handleReset = () => {
    if (window.confirm("THIS IS METAL 🤘\nRemettre toute la checklist à zéro ?")) {
      resetChecklist();
    }
  };

  return (
    <div className="min-h-screen">
      <MetalHeader
        title={`${festival.emoji} ${festival.name}`}
        backHref="/"
        action={
          <button
            onClick={handleReset}
            className="btn-fire flex items-center gap-1.5 text-xs py-1.5"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        }
      />

      <div className="max-w-2xl mx-auto px-4 pt-4 pb-2 sticky top-14 bg-metal-bg z-40 border-b border-metal-border/50">
        <ProgressBar checked={checkedItems.length} total={TOTAL_ITEMS} className="mb-3" />
        <div className="flex border border-metal-border mb-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`flex-1 py-2 text-xs font-body uppercase tracking-widest transition-all ${
                filter === f
                  ? "bg-metal-neon text-metal-bg font-semibold"
                  : "text-metal-silver hover:text-white"
              }`}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 pb-8 pt-4">
        {DEFAULT_CHECKLIST.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            checkedItems={checkedItems}
            onToggle={toggleItem}
            festivalId={id!}
            filter={filter}
          />
        ))}
      </main>
    </div>
  );
}
