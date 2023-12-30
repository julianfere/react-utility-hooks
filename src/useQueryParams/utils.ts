export const castValue = <T>(value: string) => {
  let castedValue;

  if (value === "true") castedValue = true;
  if (value === "false") castedValue = false;
  if (value === "null") castedValue = null;
  if (value === "undefined") castedValue = undefined;
  if (value === "") castedValue = undefined;

  try {
    if (JSON.parse(value)) castedValue = JSON.parse(value);
  } catch (e) {}

  if (!isNaN(Number(value))) castedValue = Number(value);

  return (castedValue ?? value) as T;
};

export const build = <T extends Record<string, any>>(params: Partial<T>) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, value.toString());
  });

  return searchParams.toString();
};

export const replace = <T>(params: Partial<T>, url?: string) => {
  const searchParams = build(params);
  const redirectUrl = url || window.location.href;

  return `${redirectUrl.split("?")[0]}?${searchParams.toString()}`;
};

export const merge = <T>(inputParams: Partial<T>, url?: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  let params: Record<string, string> = {};

  urlParams.forEach((value, key) => {
    params[key] = value;
  });

  const searchParams = build({ ...params, ...inputParams });
  const redirectUrl = url || window.location.href;

  return `${redirectUrl.split("?")[0]}?${searchParams.toString()}`;
};
