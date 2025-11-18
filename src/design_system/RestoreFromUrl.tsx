import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LZString from "lz-string";
import { STORE_APP_KEYS } from "../constants";

// Update constants as needed in project
export const QUERY_PARAM_KEY = "data" 
export const PAGE_TO_REDIRECT = "/technical-datasheet"

export function exportLocalStorageToURL(): string {
  try {
    const data: Record<string, unknown> = {};

    STORE_APP_KEYS.forEach((k) => {
      const v = localStorage.getItem(k);
      if (v != null) data[k] = JSON.parse(v);
    });

    // Optionally include metadata
    const payload = {
      v: 1,
      t: Date.now(),
      data,
    };

    const json = JSON.stringify(payload);
    return LZString.compressToEncodedURIComponent(json);
  } catch (err) {
    return "";
  }
}

export function importLocalStorageFromURL(encoded: string): boolean {
  try {
    if (!encoded) return false;

    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return false;

    let payload;
    try {
      payload = JSON.parse(json);
    } catch (err) {
      return false;
    }

    if (!payload || typeof payload !== "object" || !payload.data) return false;

    const incoming = payload.data;
    
    Object.keys(incoming).forEach((key) => {
      try {
        localStorage.setItem(key, JSON.stringify(incoming[key]));
      } catch (err) {}
    });
    
    return true;
  } catch (err) {
    return false;
  }
}

// Just render componente in App.tsx root (inside the router)
export const RestoreFromURL = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      let encodedData = new URLSearchParams(location.search).get(QUERY_PARAM_KEY);

      if (!encodedData) {
        const rawHash = window.location.hash || "";
        const hashQueryIndex = rawHash.indexOf("?");
        if (hashQueryIndex >= 0) {
          const queryString = rawHash.slice(hashQueryIndex + 1);
          encodedData = new URLSearchParams(queryString).get(QUERY_PARAM_KEY);
        }
      }

      if (!encodedData) return;

      const importedData = importLocalStorageFromURL(encodedData);
      if (!importedData) return;

      // Redirect to page
      if (PAGE_TO_REDIRECT) {
        const currentPath = location.pathname || window.location.pathname || "";
        const onHashPath = window.location.hash.split("?")[0] || "";
        const isOnProperPage = currentPath.includes(PAGE_TO_REDIRECT) || onHashPath.includes(PAGE_TO_REDIRECT.replace("/",""));
  
        if (!isOnProperPage) {
          navigate(PAGE_TO_REDIRECT, { replace: true });
        }
      }

      // Clear URL
      const newHash = "#" + PAGE_TO_REDIRECT;
      const newUrl = window.location.pathname + newHash;
      window.history.replaceState(null, "", newUrl);
    } catch (err) {
      console.error("[RestoreFromURL] unexpected error:", err);
    }
  }, [location, navigate]);

  return null;
};
