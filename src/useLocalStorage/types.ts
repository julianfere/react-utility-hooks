import { PrettifyType } from "../TypeUtils";

export interface UseLocalStorageType {}

type IsEmpty<T> = keyof T extends never ? true : false;

export type UseLocalStorageKeys = PrettifyType<
  IsEmpty<UseLocalStorageType> extends true ? any : keyof UseLocalStorageType
>;

export type UseLocalStorageReturnType<Key extends UseLocalStorageKeys> =
  IsEmpty<UseLocalStorageType> extends true
    ? string
    : Key extends keyof UseLocalStorageType
    ? UseLocalStorageType[Key]
    : undefined;
