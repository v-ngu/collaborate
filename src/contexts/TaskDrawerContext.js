import { createContext, useContext, useState } from "react";

const TaskDrawerContext = createContext(null);

// export context as a custom hook
export const useTaskDrawercontext = () => useContext(TaskDrawerContext);

// provider
export const TaskDrawerProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({});

  const value = { 
    isDrawerOpen, 
    setIsDrawerOpen,
    drawerContent,
    setDrawerContent 
  };

  return (
    <TaskDrawerContext.Provider value={value}>
      {children}
    </TaskDrawerContext.Provider>
  );
};