import { useEffect, useRef } from "react";

const useDocumentTitle = (title: string, persistOnUnmount: boolean = false) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;

    return () => {
      if (!persistOnUnmount) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        document.title = defaultTitle.current;
      }
    };
  }, [persistOnUnmount, title]);
};

export default useDocumentTitle;
