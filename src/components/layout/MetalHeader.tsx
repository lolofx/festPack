import { Link } from "react-router-dom";

interface MetalHeaderProps {
  title?: string;
  backHref?: string;
  action?: React.ReactNode;
}

export function MetalHeader({ title = "FestPack", backHref, action }: MetalHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-metal-bg border-b border-metal-border">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {backHref && (
            <Link
              to={backHref}
              className="text-metal-silver hover:text-metal-neon transition-colors flex-shrink-0"
              aria-label="Retour"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </Link>
          )}
          <h1 className="font-metal text-metal-neon text-xl truncate tracking-wide">
            {title}
          </h1>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </header>
  );
}
