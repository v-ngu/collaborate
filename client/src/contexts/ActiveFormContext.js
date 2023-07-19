import { 
  createContext, 
  useContext, 
  useState, 
  useEffect 
} from "react";

const ActiveFormContext = createContext(null);

// export context as a custom hook
export const useActiveFormContext = () => useContext(ActiveFormContext);

// provider
export const ActiveFormProvider = ({ children }) => {
  const [activeNewForm, setActiveNewForm] = useState("none");
  
  useEffect(() => {
    const onBackDropClick = () => {
      setActiveNewForm("none");
    };

    window.addEventListener("click", onBackDropClick)
    return () => window.removeEventListener("click", onBackDropClick);
  }, []);

  return (
    <ActiveFormContext.Provider value={{
      activeNewForm,
      setActiveNewForm
    }}>
      {children}
    </ActiveFormContext.Provider>
  )
};