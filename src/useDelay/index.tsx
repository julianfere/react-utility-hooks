import { useEffect, useRef } from "react";

/**
 * Hook to delay the execution of a callback function
 * @param callback
 * @param delay
 * @param manual
 * @returns
 */
const useDelay = (
  callback: () => void,
  options: { delay?: number; manual?: boolean } = { delay: 250, manual: false }
) => {
  const { delay = 250, manual = false } = options;
  const mountedRef = useRef(false);

  const runner = () => {
    if (mountedRef.current) setTimeout(callback, delay);
  };

  useEffect(() => {
    mountedRef.current = true;

    if (manual) return;

    const timer = setTimeout(callback, delay);

    return () => {
      clearTimeout(timer);
      mountedRef.current = false;
    };
  }, [callback, delay, manual]);

  return manual ? runner : () => {};
};

export default useDelay;
