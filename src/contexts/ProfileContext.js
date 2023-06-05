import { createContext, useContext } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import useFetch from "../hooks/useFetch";
import { getProfile } from "../services/api";

const ProfileContext = createContext(null);

// export context as a custom hook
export const useProfile = () => useContext(ProfileContext);

// provider
export const ProfileProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [profile, isLoading] = useFetch(getProfile);

  const value = { user, isAuthenticated, isLoading, profile };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
};
