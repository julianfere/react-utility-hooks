export type PrettifyType<T> = {
  [K in keyof T]: T[K];
} & {};
