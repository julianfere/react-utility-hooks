import { useCallback, useEffect, useState } from "react";

type UseAsyncOptions<T, E = any> = Partial<{
  manual: boolean;
  onSuccess: (data: T) => void;
  onError: (error: E) => void;
}>;

enum AsyncStatus {
  Idle = "idle",
  Pending = "pending",
  Fulfilled = "fulfilled",
  Rejected = "rejected",
}

const defaultOptions = <T, E>(): UseAsyncOptions<T, E> => ({
  manual: false,
  onSuccess: (_data: T) => {},
  onError: (_error: E) => {},
});

const useAsync = <T, F extends (...args: any[]) => Promise<any>, E = any>(
  fn: F,
  options: UseAsyncOptions<T, E> = defaultOptions<T, E>()
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

      return fn(...args)
        .then((data) => {
          if (isMounted) {
            setState(AsyncStatus.Fulfilled);
            successHandler(data);
            return data;
          }
        })
        .catch((error) => {
          if (isMounted) {
            setState(AsyncStatus.Rejected);
            errorHandler(error as E);
            return error;
          }
        });
    },
    [fn, isMounted, options]
  );

  const getRunner =
    <Fn extends F>(_fn: Fn) =>
    (...args: Parameters<Fn>) => {
      runner(...args);
    };

  const autoRunner = (..._args: any[]) => {
    throw new Error("You must set manual to false to use the run function");
  };

  return {
    run: options.manual ? getRunner(fn) : autoRunner,
    state,
  };
};

export default useAsync;

const aFn = async (a: string) => Promise.resolve(a);

function TestComponent() {
  const { run } = useAsync((id: string) => aFn(id), {
    manual: true,
    onSuccess: (data) => data,
  });

  run("1");
}
