export type QueryParamsInput = Record<string, any>;

export type SetOptions = {
  replace?: boolean;
  url?: string;
};

export type GetQueryParamsFn<T extends QueryParamsInput> = (
  ...keys: (keyof T)[]
) => Partial<T>;

export type SetQueryParamsFn<T extends QueryParamsInput> = (
  params: Partial<T>,
  options?: SetOptions
) => void;
