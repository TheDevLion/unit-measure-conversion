import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { importLocalStorageFromURL } from "./helpers/url_export_import_data";


/**
 * Robust restore:
 * - looks for ?data=... on both location.search and location.hash
 * - logs debug info
 * - restores, navigates to /technical-datasheet and removes the querystring
 */
export const RestoreFromURL = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log("[RestoreFromURL] location:", location);

      // 1) check location.search (react-router may parse hash into search)
      let encodedData = new URLSearchParams(location.search).get("data");

      // 2) fallback: check raw hash (window.location.hash), e.g. "#/technical-datasheet?data=..."
      if (!encodedData) {
        const rawHash = window.location.hash || "";
        const hashQueryIndex = rawHash.indexOf("?");
        if (hashQueryIndex >= 0) {
          const queryString = rawHash.slice(hashQueryIndex + 1);
          encodedData = new URLSearchParams(queryString).get("data");
        }
      }

      if (!encodedData) {
        console.log("[RestoreFromURL] no data param present");
        return;
      }

      console.log("[RestoreFromURL] found encoded data (length):", encodedData.length);

      // Try to import
      const ok = importLocalStorageFromURL(encodedData);
      if (!ok) {
        console.error("[RestoreFromURL] importLocalStorageFromURL returned false");
        return;
      }

      console.log("[RestoreFromURL] ✅ LocalStorage restored from URL payload");

      // Navigate to the datasheet page (if not there already)
      const currentPath = location.pathname || window.location.pathname || "";
      const onHashPath = window.location.hash.split("?")[0] || ""; // e.g. "#/technical-datasheet"
      const isOnDatasheet = currentPath.includes("/technical-datasheet") || onHashPath.includes("technical-datasheet");

      if (!isOnDatasheet) {
        // push user to datasheet (replace so back doesn't go to data link)
        navigate("/technical-datasheet", { replace: true });
      }

      // Clean URL: remove the ?data=... portion while keeping the route
      // For HashRouter we want to keep the "#/path"
      const newHash = "#/technical-datasheet";
      const newUrl = window.location.pathname + newHash;
      window.history.replaceState(null, "", newUrl);
      console.log("[RestoreFromURL] URL cleaned to:", newUrl);
    } catch (err) {
      console.error("[RestoreFromURL] unexpected error:", err);
    }
  }, [location, navigate]);

  return null;
};
