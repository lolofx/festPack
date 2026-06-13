import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { FestivalList } from "./components/festivals/FestivalList";
import { ChecklistPage } from "./components/checklist/ChecklistPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<FestivalList />} />
          <Route path="/festival/:id" element={<ChecklistPage />} />
          <Route path="*" element={<FestivalList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
