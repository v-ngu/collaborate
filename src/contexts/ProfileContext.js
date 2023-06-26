import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import useFetch from "../hooks/useFetch";
import { login } from "../services/users-api";

const ProfileContext = createContext(null);

// export context as a custom hook
export const useProfileContext = () => useContext(ProfileContext);

// provider
export const ProfileProvider = ({ children }) => {
  // Local storage is used to determine the sign up stage
  const userAcessInitialValue = () => {
    const value = window.localStorage.getItem("userAccessState");
    
    if (value == null) {
      window.localStorage.setItem("userAccessState", "Logged Out");
      return "Logged Out"
    }

    return value;
  };

  const [userAccess, setUserAccess] = useState(userAcessInitialValue());
  const { user: userFromAuth0, isAuthenticated } = useAuth0();
  const [profile, isLoadingProfile] = useFetch(login, userFromAuth0);

  // If the user abandon the signing process, access to
  // private pages will be restriced.
  useEffect(() => {
    if (userAccess === "In Progress") {
      const removeProgress = setTimeout(() => {
        setUserAccess("Logged Out");
        window.localStorage.setItem("userAccessState", "Logged Out")
      }, 3000);

      return () => clearTimeout(removeProgress);
    }
  }, [userAccess]);

  return (
    <ProfileContext.Provider
      value={{ userAccess, profile, isLoadingProfile, isAuthenticated }}
    >
      {children}
    </ProfileContext.Provider>
  )
};
