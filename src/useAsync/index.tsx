import { useCallback, useEffect, useRef, useState } from "react";
import { defaultOptions, getRunner, handleError } from "./utils";
import { AsyncStatus, UseAsyncOptions } from "./types";

/**
 *  The useAsync hook is a custom hook that allows you to run an async function and get the status of the promise.
 * @param fn - The async function to run.
 * @param options - The options for the hook.
 * @returns An object with the run function and the status of the promise.
 * @example
 * const asyncFunction = (arg: string) => Promise.resolve(arg);
 * const { run, state } = useAsync((arg: string) => asyncFunction(arg), {manual: true});
 *
 * const handleClick = () => run('test');
 *
 */
const useAsync = <
  F extends (...args: any[]) => Promise<any>,
  T = Awaited<ReturnType<F>>
>(
  fn: F,
  options: UseAsyncOptions<T> = defaultOptions<T>()
) => {
  const [state, setState] = useState<AsyncStatus>(AsyncStatus.Idle);
  const isMounted = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);

  const runner = useCallback(
    async (...args: any[]) => {
      setState(AsyncStatus.Pending);
      try {
        const result = await fn(...args, {
          signal: controllerRef?.current!.signal,
        });

        if (!isMounted) return;

        setState(AsyncStatus.Fulfilled);
        options.onSuccess?.(result);
      } catch (error) {
        setState(AsyncStatus.Rejected);
        options.onError?.(error);
      }
    },
    [fn, isMounted, options]
  );

  const autoRunner = (..._args: any[]) => {
    throw new Error("You must set manual to true to use the run function");
  };

  useEffect(() => {
    if (controllerRef.current == null)
      controllerRef.current = new AbortController();
    const controller = controllerRef.current;

    isMounted.current = true;

    if (options.manual) return;

    runner();

    return () => {
      isMounted.current = false;
      // Pospone la cancelacion de la request hasta el proximo render
      // es para evitar que el Strict Mode cancele todo en las 2 ejecuciones del efecto
      requestAnimationFrame(() => {
        try {
          if (options.cancelable && !isMounted.current) {
            controller.abort();
          }
        } catch (e: unknown) {
          handleError(e);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    run: options.manual ? getRunner(runner)(fn) : autoRunner,
    state,
  };
};

export default useAsync;
