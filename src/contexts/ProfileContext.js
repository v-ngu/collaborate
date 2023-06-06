import { createContext, useContext } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import useFetch from "../hooks/useFetch";
import { login } from "../services/api";

const ProfileContext = createContext(null);

// export context as a custom hook
export const useProfile = () => useContext(ProfileContext);

// provider
export const ProfileProvider = ({ children }) => {
  const { user: userAuth0, isAuthenticated } = useAuth0();
  const [profile, isLoading] = useFetch(login, userAuth0);

  const value = { userAuth0, isAuthenticated, isLoading, profile };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
};
