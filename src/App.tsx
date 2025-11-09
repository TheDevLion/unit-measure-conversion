import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UnitMeasureConversor } from "./pages/UnitMeasureConversor";
import { ReceiptSpecs } from "./pages/ReceiptSpecs";
import { Layout } from "./pages/Layout";
import { useIsDevMode } from "./store/hooks";
import { useEffect } from "react";


function App() {
  const devMode = useIsDevMode()
  
  useEffect(() => {
    if (window.location.href.includes("localhost"))
      devMode.setIsDevMode(true)
  }, [])
  return (
    <BrowserRouter basename="/unit-measure-conversion/">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<UnitMeasureConversor />} />
          <Route path="receipt-specs" element={<ReceiptSpecs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
