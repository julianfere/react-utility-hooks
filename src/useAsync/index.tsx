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

  useEffect(() => {
    if (!options.manual) {
      runner();
    }
  });

  const runner = useCallback(
    async (...args: any[]) => {
      const successHandler = options.onSuccess ?? (() => {});
      const errorHandler = options.onError ?? (() => {});

      fn(...args)
        .then((data) => {
          if (isMounted) {
            setState(AsyncStatus.Fulfilled);
            successHandler(data);
          }
        })
        .catch((error) => {
          if (isMounted) {
            setState(AsyncStatus.Rejected);
            errorHandler(error);
          }
        });
    },
    [fn, isMounted, options]
  );

  const autoRunner = (..._args: any[]) => {
    throw new Error("You must set manual to false to use the run function");
  };

  return {
    run: options.manual ? getRunner(runner)(fn) : autoRunner,
    state,
  };
};

export default useAsync;

// function Test() {
//   const { run } = useAsync((id: number) => Promise.resolve(id));
// }