import { useState } from "react";
import { X } from "lucide-react";
import metalhandImg from "../../assets/metalhand.svg";

const EMOJI_OPTIONS = ["🤘", "🎸", "🔥", "💀", "⚡", "🎶", "🏕️", "🎵"];

interface CreateFestivalInput {
  name: string;
  location?: string;
  dateStart?: string;
  dateEnd?: string;
  emoji?: string;
}

interface CreateFestivalModalProps {
  onClose: () => void;
  onCreate: (input: CreateFestivalInput) => void;
}

export function CreateFestivalModal({ onClose, onCreate }: CreateFestivalModalProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [emoji, setEmoji] = useState("🤘");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Le nom du festival est requis 🤘");
      return;
    }
    onCreate({
      name: name.trim(),
      location: location.trim() || undefined,
      dateStart: dateStart || undefined,
      dateEnd: dateEnd || undefined,
      emoji,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-metal-surface border border-metal-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-metal text-metal-neon text-lg tracking-wide">Nouveau Festival</h2>
          <button onClick={onClose} className="text-metal-silver hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs text-metal-silver uppercase tracking-wider mb-2 font-body">
              Emoji
            </label>
            <div className="flex gap-2 flex-wrap">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`text-xl p-2 border transition-all ${
                    emoji === e
                      ? "border-metal-neon bg-metal-neon/10"
                      : "border-metal-border hover:border-metal-silver"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-metal-silver uppercase tracking-wider mb-1 font-body">
              Nom du festival *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              placeholder="Hellfest 2025"
              autoFocus
              className="w-full bg-metal-bg border border-metal-border px-3 py-2 text-white font-body
                         focus:outline-none focus:border-metal-neon transition-colors
                         placeholder:text-metal-border"
            />
            {error && <p className="text-metal-blood text-xs mt-1 font-body">{error}</p>}
          </div>

          <div>
            <label className="block text-xs text-metal-silver uppercase tracking-wider mb-1 font-body">
              Lieu
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Clisson"
              className="w-full bg-metal-bg border border-metal-border px-3 py-2 text-white font-body
                         focus:outline-none focus:border-metal-neon transition-colors
                         placeholder:text-metal-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-metal-silver uppercase tracking-wider mb-1 font-body">Du</label>
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                className="w-full bg-metal-bg border border-metal-border px-3 py-2 text-white font-body
                           focus:outline-none focus:border-metal-neon transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-xs text-metal-silver uppercase tracking-wider mb-1 font-body">Au</label>
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                className="w-full bg-metal-bg border border-metal-border px-3 py-2 text-white font-body
                           focus:outline-none focus:border-metal-neon transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">
              Annuler
            </button>
            <button type="submit" className="btn-metal flex-1 flex items-center justify-center gap-2">
              Créer
              <img
                src={metalhandImg}
                alt=""
                width={24}
                height={24}
                style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(60deg)', display: 'inline-block' }}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
