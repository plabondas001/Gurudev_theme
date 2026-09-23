import { useState, useEffect } from "react";

/**
 * Returns a debounced version of `value` that only updates after
 * `delay` milliseconds have elapsed with no new value arriving.
 *
 * @param {*}      value - The value to debounce.
 * @param {number} delay - Delay in milliseconds (default 300ms).
 * @returns The debounced value.
 */
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
