import { createContext, useContext, useState } from "react";

const DrawerContext = createContext(null);

// export context as a custom hook
export const useDrawercontext = () => useContext(DrawerContext);

// provider
export const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({});

  const value = { 
    isDrawerOpen, 
    setIsDrawerOpen,
    drawerContent,
    setDrawerContent 
  };

  return (
    <DrawerContext.Provider value={value}>
      {children}
    </DrawerContext.Provider>
  );
};