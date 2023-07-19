import { createContext, useContext, useState } from "react";

const MenuDrawerContext = createContext(null);

// export context as a custom hook
export const useMenuDrawerContext = () => useContext(MenuDrawerContext);

// provider
export const MenuDrawerProvider = ({ children }) => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  return (
    <MenuDrawerContext.Provider value={{ isMenuDrawerOpen, setIsMenuDrawerOpen }}>
      {children}
    </MenuDrawerContext.Provider>
  );
};