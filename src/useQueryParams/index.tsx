import { useEffect, useState } from "react";
import { castValue } from "./utils";

function getCurrentLocation() {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
  };
}

const listeners: (() => void)[] = [];

const useQueryParams = <TQuery extends Record<string, any>>() => {
  const [{ pathname, search }, setLocation] = useState(getCurrentLocation());

  const notify = () => listeners.forEach((listener) => listener());
  const handleChange = () => setLocation(getCurrentLocation());

  useEffect(() => {
    listeners.push(handleChange);
    window.addEventListener("popstate", handleChange);

    return () => {
      listeners.splice(listeners.indexOf(handleChange), 1);
      window.removeEventListener("popstate", handleChange);
    };
  }, []);

  const replace = (url: string) => {
    window.history.replaceState(null, "", url);
    notify();
  };

  const get = (...keys: (keyof TQuery)[]) => {
    const location = window.location;

    const params: Partial<TQuery> = {};

    const searchParams = new URLSearchParams(location.search);

    keys.forEach((key) => {
      const value = searchParams.get(key.toString());

      if (value) {
        params[key as keyof TQuery] = castValue<TQuery[keyof TQuery]>(value);
      }
    });

    return params;
  };

  const build = (params: Partial<TQuery>) => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value.toString());
    });

    return searchParams.toString();
  };

  const set = (params: Partial<TQuery>, url?: string) => {
    const searchParams = build(params);
    const redirectUrl = url || window.location.href;

    if (searchParams === "") return;

    const newURL = `${redirectUrl.split("?")[0]}?${searchParams.toString()}`;

    replace(newURL);
  };

  const clear = () => {
    replace(pathname);
  };

  return { get, set, build, pathname, search, clear };
};

export default useQueryParams;
