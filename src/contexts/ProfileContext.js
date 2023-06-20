import { createContext, useContext } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import useFetch from "../hooks/useFetch";
import { login } from "../services/users-api";

const ProfileContext = createContext(null);

// export context as a custom hook
export const useProfileContext = () => useContext(ProfileContext);

// provider
export const ProfileProvider = ({ children }) => {
  const { user: userFromAuth0, isAuthenticated } = useAuth0();
  const [profile, isLoadingProfile] = useFetch(login, userFromAuth0);

  return (
    <ProfileContext.Provider
      value={{ profile, isLoadingProfile, isAuthenticated }}
    >
      {children}
    </ProfileContext.Provider>
  )
};
