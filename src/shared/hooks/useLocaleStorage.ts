import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: string) => {
  // Retrieve stored value from localStorage, or use the initial value if not present
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  // Save the value to localStorage whenever it changes
  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  return [storedValue, setValue] as const;
};

