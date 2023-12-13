import { useCallback, useEffect, useState } from "react";
import { defaultOptions, getRunner } from "./utils";
import { AsyncStatus, UseAsyncOptions } from "./types";

const useAsync = <
  F extends (...args: any[]) => Promise<any>,
  T = Awaited<ReturnType<F>>
>(
  fn: F,
  options: UseAsyncOptions<T> = defaultOptions<T>()
) => {
  const [isMounted, setIsMounted] = useState(false);
  const [state, setState] = useState<AsyncStatus>(AsyncStatus.Idle);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const runner = useCallback(
    (...args: any[]) => {
      setState(AsyncStatus.Pending);
      fn(...args)
        .then((data) => {
          if (isMounted) {
            setState(AsyncStatus.Fulfilled);
            options.onSuccess?.(data);
          }
        })
        .catch((error) => {
          if (isMounted) {
            setState(AsyncStatus.Rejected);
            options.onError?.(error);
          }
        });
    },
    [fn, isMounted, options]
  );

  useEffect(() => {
    if (options.manual) return;

    runner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autoRunner = (..._args: any[]) => {
    throw new Error("You must set manual to true to use the run function");
  };

  return {
    run: options.manual ? getRunner(runner)(fn) : autoRunner,
    state,
  };
};

export default useAsync;