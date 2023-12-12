import { UseAsyncOptions } from "./types";

export const getRunner =
  <F extends (...args: any[]) => any>(
    runner: (...args: any[]) => Promise<void>
  ) =>
  <Fn extends F>(_fn: Fn) =>
  (...args: Parameters<Fn>) => {
    runner(...args);
  };

export const defaultOptions = <T>(): UseAsyncOptions<T> => ({
  manual: false,
  onSuccess: (_data: T) => {},
  onError: (_error: any) => {},
});
