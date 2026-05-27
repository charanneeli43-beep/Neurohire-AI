// ──────────────────────────────────────────────
//  NeuroHire AI  ·  Persistent Storage Hook
//  Uses window.storage (Claude artifact API) with
//  localStorage fallback for standalone usage.
// ──────────────────────────────────────────────

import { useState, useEffect } from "react";

function readLS(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function writeLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export function useStorage(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [loaded, setLoaded] = useState(false);

  // Load on mount
  useEffect(() => {
    (async () => {
      try {
        if (window.storage) {
          const result = await window.storage.get(key);
          if (result) { setValue(JSON.parse(result.value)); }
        } else {
          const local = readLS(key);
          if (local !== null) setValue(local);
        }
      } catch {}
      setLoaded(true);
    })();
  }, [key]);

  // Persist on change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        if (window.storage) {
          await window.storage.set(key, JSON.stringify(value));
        } else {
          writeLS(key, value);
        }
      } catch {}
    })();
  }, [key, value, loaded]);

  return [value, setValue];
}
