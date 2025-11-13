import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import { UnitMeasureConversor } from "./pages/UnitMeasureConversor";
import { Layout } from "./pages/Layout";
import { useIsDevMode } from "./store/hooks";
import { useEffect } from "react";
import { TechnicalDatasheetPage } from "./pages/TechnicalDatasheetPage";
import { importLocalStorageFromURL } from "./helpers/url_export_import_data";
import { RestoreFromURL } from "./RestoreFromUrl";

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const [path, queryString] = hash.split("?");
    const params = new URLSearchParams(queryString);
    const encodedData = params.get("data");

    if (encodedData) {
      const ok = importLocalStorageFromURL(encodedData);

      if (ok) {
        console.log("✅ LocalStorage restored from URL");

        // Ensure we go to the right route
        if (!path.includes("technical-datasheet")) {
          navigate("/technical-datasheet", { replace: true });
        }

        // Clean URL (removes ?data=)
        const cleanHash = "#/technical-datasheet";
        window.history.replaceState(null, "", window.location.pathname + cleanHash);
      }
    }
  }, [navigate]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<UnitMeasureConversor />} />
        <Route path="technical-datasheet" element={<TechnicalDatasheetPage />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  const devMode = useIsDevMode();

  useEffect(() => {
    if (window.location.href.includes("localhost"))
      devMode.setIsDevMode(true);
  }, []);

  return (
    <HashRouter basename="/">
      <RestoreFromURL />
      <AppRoutes />
    </HashRouter>
  );
}
