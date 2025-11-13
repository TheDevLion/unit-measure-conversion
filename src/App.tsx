import { HashRouter, Route, Routes } from "react-router-dom";
import { UnitMeasureConversor } from "./pages/UnitMeasureConversor";
import { Layout } from "./pages/Layout";
import { useIsDevMode } from "./store/hooks";
import { useEffect } from "react";
import { TechnicalDatasheetPage } from "./pages/TechnicalDatasheetPage";



function App() {
  const devMode = useIsDevMode()
  
  useEffect(() => {
    if (window.location.href.includes("localhost"))
      devMode.setIsDevMode(true)
  }, [])
  return (
    <HashRouter basename="/">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<UnitMeasureConversor />} />
          <Route path="technical-datasheet" element={<TechnicalDatasheetPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App
