import { useEffect } from "react";

export const useTitle = (name: string) => {
  useEffect(() => {
    document.title = name;
  }, [name]);
};
