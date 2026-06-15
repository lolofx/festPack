import { useState } from "react";
import { Plus } from "lucide-react";
import { MetalHeader } from "../layout/MetalHeader";
import { FestivalCard } from "./FestivalCard";
import { CreateFestivalModal } from "./CreateFestivalModal";
import { useFestivals } from "../../hooks/useFestivals";
import metalhandImg from "../../assets/metalhand.svg";

const MetalHandIcon = ({ size = 28, className = "" }: { size?: number; className?: string }) => (
  <img
    src={metalhandImg}
    alt=""
    width={size}
    height={size}
    className={className}
    style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(60deg)', display: 'inline-block' }}
  />
);

export function FestivalList() {
  const { festivals, createFestival, deleteFestival } = useFestivals();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen">
      <MetalHeader
        title={<>FestPack <MetalHandIcon size={22} className="align-middle" /></>}
        action={
          <button
            onClick={() => setShowModal(true)}
            className="btn-metal flex items-center gap-1.5 text-xs py-1.5"
          >
            <Plus size={14} />
            Nouveau
          </button>
        }
      />

      <main className="max-w-2xl mx-auto px-4 py-6">
        {festivals.length === 0 ? (
          <div className="text-center py-20">
            <MetalHandIcon size={80} className="mb-4 mx-auto opacity-40" />
            <p className="text-metal-silver font-body text-sm uppercase tracking-widest mb-6">
              Aucun festival prévu
            </p>
            <button onClick={() => setShowModal(true)} className="btn-metal">
              Créer mon premier festival
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {festivals.map((festival) => (
              <FestivalCard
                key={festival.id}
                festival={festival}
                onDelete={deleteFestival}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <CreateFestivalModal
          onClose={() => setShowModal(false)}
          onCreate={(input) => {
            createFestival(input);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
