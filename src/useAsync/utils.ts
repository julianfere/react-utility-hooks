import { UseAsyncOptions } from "./types";

export const getRunner =
  <F extends (...args: any[]) => any>(runner: (...args: any[]) => void) =>
  <Fn extends F>(_fn: Fn) =>
  (...args: Parameters<Fn>) => {
    runner(...args);
  };

export const defaultOptions = <T>(): UseAsyncOptions<T> => ({
  manual: false,
  onSuccess: (_data: T) => {},
  onError: (_error: any) => {},
  cancelable: true,
});

export const handleError = (error: unknown) => {
  if (!(error instanceof Error)) {
    throw error;
  }

  if (error.name === "AbortError") {
    return;
  }

  throw error;
};
