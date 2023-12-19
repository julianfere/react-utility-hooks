import { castValue } from "./utils";

/**
 * A React hook for accessing query parameters and setting them in the URL.
 *
 * @template T - The type of the query parameters object.
 * @returns {{ get: (...keys: (keyof T)[]) => Partial<T> }} An object with a `get` function for retrieving query parameters.
 */
const useQueryParams = <T extends Record<string, any>>(): {
  get: (...keys: (keyof T)[]) => Partial<T>;
} => {
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

  return { get };
};

export default useQueryParams;
