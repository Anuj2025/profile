import React, { createContext, useContext, useState } from "react";

const PanelContext = createContext();

const PanelProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState({
    open: false,
    data: null,
  });

  return (
    <PanelContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </PanelContext.Provider>
  );
};

const usePanel = () => useContext(PanelContext);

export { PanelProvider, usePanel };
