import { Outlet } from "react-router-dom";
import { MetalBackground } from "./MetalBackground";

export function AppShell() {
  return (
    <div className="min-h-screen bg-metal-bg relative">
      <MetalBackground />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
