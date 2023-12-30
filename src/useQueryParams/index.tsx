import { useContext } from "react";
import { replace, merge, castValue } from "./utils";
import {
  GetQueryParamsFn,
  QueryParamsInput,
  SetOptions,
  SetQueryParamsFn,
} from "./types";
import { QueryParamsContext } from "./context";

/**
 * A React hook for accessing query parameters and setting them in the URL.
 *
 * @template T - The type of the query parameters object.
 * @returns {{ get: (...keys: (keyof T)[]) => Partial<T> }} An object with a `get` function for retrieving query parameters.
 */
const useQueryParams = <T extends QueryParamsInput>(): {
  get: GetQueryParamsFn<T>;
  set: SetQueryParamsFn<T>;
} => {
  const context = useContext(QueryParamsContext);
  console.log(context);
  if (!context) {
    throw new Error("useQueryParams must be used within a QueryParamsProvider");
  }

  const { update } = context;

  /**
   * Retrieves specified query parameters from the URL.
   *
   * @param {...(keyof T)[]} keys - The keys of the query parameters to retrieve.
   * @returns {Partial<T>} An object containing the retrieved query parameters.
   */
  function get(...keys: (keyof T)[]): Partial<T> {
    const location = window.location;

    const params: Partial<T> = {};

    const searchParams = new URLSearchParams(location.search);

    keys.forEach((key) => {
      const value = searchParams.get(key.toString());

      if (value) {
        params[key as keyof T] = castValue<T[keyof T]>(value);
      }
    });

    return params;
  }

  /**
   * Sets specified query parameters in the URL.
   *
   * @param {Partial<T>} params - The query parameters to set.
   * @param {SetOptions} [options] - Options for setting the query parameters.
   */
  function set(params: Partial<T>, options?: SetOptions) {
    const newUrl = options?.replace
      ? replace(params, options?.url)
      : merge(params, options?.url);

    window.history.pushState({}, "", newUrl);
    update(newUrl);
  }

  return { get, set };
};

export default useQueryParams;
