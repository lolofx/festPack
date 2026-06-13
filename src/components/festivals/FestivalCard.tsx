import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import type { Festival, FestivalProgress } from "../../types";
import { STORAGE_KEYS } from "../../types";
import { ProgressBar } from "../checklist/ProgressBar";
import { DEFAULT_CHECKLIST } from "../../data/defaultChecklist";
import { localStorageAdapter } from "../../utils/storage";

const TOTAL_ITEMS = DEFAULT_CHECKLIST.reduce((sum, cat) => sum + cat.items.length, 0);

interface FestivalCardProps {
  festival: Festival;
  onDelete: (id: string) => void;
}

export function FestivalCard({ festival, onDelete }: FestivalCardProps) {
  const progress = localStorageAdapter.get<FestivalProgress>(STORAGE_KEYS.progress(festival.id));
  const checkedCount = progress?.checkedItems.length ?? 0;

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm(`THIS IS METAL 🤘\nVraiment supprimer "${festival.name}" ?`)) {
      onDelete(festival.id);
    }
  };

  const fmt = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
      : null;

  const dateLabel =
    festival.dateStart
      ? `${fmt(festival.dateStart)}${festival.dateEnd ? ` → ${fmt(festival.dateEnd)}` : ""}`
      : null;

  return (
    <Link to={`/festival/${festival.id}`} className="block card-metal p-4 group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">{festival.emoji}</span>
            <span className="font-metal text-lg text-white truncate group-hover:text-metal-neon transition-colors">
              {festival.name}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            {festival.location && (
              <span className="text-xs text-metal-silver font-body">{festival.location}</span>
            )}
            {dateLabel && (
              <span className="text-xs text-metal-bone font-body">{dateLabel}</span>
            )}
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="text-metal-silver hover:text-metal-blood transition-colors p-1 flex-shrink-0"
          aria-label={`Supprimer ${festival.name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
      <ProgressBar checked={checkedCount} total={TOTAL_ITEMS} />
    </Link>
  );
}
