import React, { createContext, useContext } from "react";
import { ModalState } from "./types/modal";

const ModalContext =
  createContext<
    | {
        setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
      }
    | undefined
  >(undefined);

interface Props {
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
}

export const ModalProvider: React.FC<Props> = ({ children, setModalState }) => {
  return (
    <ModalContext.Provider value={{ setModalState }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("Context must be used within its provider");

  return context;
};
