import { createContext, useContext, useState, useCallback, useRef } from "react";

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);

  // duration: how long to show the loader (ms)
  const triggerLoader = useCallback((duration = 900) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLoading(true);
    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, duration);
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, triggerLoader }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
