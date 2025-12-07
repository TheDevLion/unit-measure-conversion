import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { TechnicalDatasheetPage } from "./pages/TechnicalDatasheetPage";
import { RestoreFromURL } from "./design_system/RestoreFromUrl";
import { UnitMeasureConversorManager } from "./pages/UnitMeasureConversorManager";

export default function App() {

  return (
    <HashRouter basename="/">
      <RestoreFromURL />

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<UnitMeasureConversorManager />} />

          <Route path="technical-datasheet" element={<TechnicalDatasheetPage />} />
        </Route>
      </Routes>

    </HashRouter>
  );
}
