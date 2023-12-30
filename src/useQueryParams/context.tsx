import { PropsWithChildren, createContext, useState } from "react";

interface QueryParamsContextValue {
  update: (value: string) => void;
}

const QueryParamsContext = createContext<QueryParamsContextValue>({
  update: () => {},
});

const QueryParamsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [_, setHistory] = useState<string[]>([]); //for re-rendering

  const update = (value: string) =>
    setHistory((oldHistory) => [...oldHistory, value]);

  return (
    <QueryParamsContext.Provider value={{ update }}>
      {children}
    </QueryParamsContext.Provider>
  );
};

export { QueryParamsContext, QueryParamsProvider };
