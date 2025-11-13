import LZString from "lz-string";

const APP_KEYS = ["receipts", "products", "ingredients"]; // adjust to your actual keys
// If you store everything under a single object key (e.g. "unit-app"), change accordingly.

/**
 * Build a compressed URL-safe string that contains only app keys.
 */
export function exportLocalStorageToURL(): string {
  try {
    const data: Record<string, unknown> = {};

    APP_KEYS.forEach((k) => {
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
    console.error("exportLocalStorageToURL error", err);
    return "";
  }
}

/**
 * Restore localStorage from an encoded string.
 * Returns true on success; false on failure.
 */
export function importLocalStorageFromURL(encoded: string): boolean {
  try {
    if (!encoded) {
      console.warn("importLocalStorageFromURL called with empty string");
      return false;
    }

    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) {
      console.error("importLocalStorageFromURL: decompression returned falsy");
      return false;
    }

    let payload;
    try {
      payload = JSON.parse(json);
    } catch (err) {
      console.error("importLocalStorageFromURL: JSON parse error", err);
      return false;
    }

    // payload should be { v, t, data }
    if (!payload || typeof payload !== "object" || !payload.data) {
      console.error("importLocalStorageFromURL: payload missing data", payload);
      return false;
    }

    const incoming = payload.data;
    // Persist keys to localStorage (override)
    Object.keys(incoming).forEach((key) => {
      try {
        localStorage.setItem(key, JSON.stringify(incoming[key]));
        console.log(`importLocalStorageFromURL: stored key=${key}`);
      } catch (err) {
        console.error("importLocalStorageFromURL: failed to set key", key, err);
      }
    });

    return true;
  } catch (err) {
    console.error("importLocalStorageFromURL: unexpected error", err);
    return false;
  }
}
