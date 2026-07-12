import { useCallback, useEffect, useState } from "react";

const readStoredValue = (key, initialValue) => {
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  } catch {
    return initialValue;
  }
};

export default function useLocalStorage(key, initialValue) {
  const [storedState, setStoredState] = useState(() => ({
    key,
    value: readStoredValue(key, initialValue),
  }));

  useEffect(() => {
    setStoredState({
      key,
      value: readStoredValue(key, initialValue),
    });
  }, [key, initialValue]);

  const setValue = useCallback(
    (nextValue) => {
      setStoredState((currentState) => {
        const currentValue =
          currentState.key === key
            ? currentState.value
            : readStoredValue(key, initialValue);
        const value =
          typeof nextValue === "function" ? nextValue(currentValue) : nextValue;

        return { key, value };
      });
    },
    [key, initialValue]
  );

  useEffect(() => {
    if (storedState.key !== key) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedState.value));
    } catch {
      // LocalStorage can fail in private or restricted browser contexts.
    }
  }, [key, storedState]);

  return [
    storedState.key === key
      ? storedState.value
      : readStoredValue(key, initialValue),
    setValue,
  ];
}
