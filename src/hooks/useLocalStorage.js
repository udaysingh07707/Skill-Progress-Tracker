import { useCallback, useEffect, useState } from "react";

const readStoredValue = (key, initialValue) => {
  if (!key) return initialValue;

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
      if (!key) return;

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
    if (!key || storedState.key !== key) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedState.value));
    } catch {
      // LocalStorage can fail in private or restricted browser contexts.
    }
  }, [key, storedState]);

  return [
    key
      ? storedState.key === key
        ? storedState.value
        : readStoredValue(key, initialValue)
      : initialValue,
    setValue,
  ];
}
