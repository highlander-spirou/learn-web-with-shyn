import React, { ReactNode, createContext, useContext, useState } from "react";

type ModalActions = {
  contentID: string;
  setId: (id: string) => void;
};

const ModalContext = createContext({} as ModalActions);

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [contentID, setContentID] = useState("");

  function setId(id: string) {
    setContentID(id);
  }
  return (
    <ModalContext.Provider
      value={{
        contentID,
        setId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
