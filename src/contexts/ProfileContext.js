import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

const ProfileContext = createContext(null);

export const useProfile = () => {
  return useContext(ProfileContext)
};

export const ProfileProvider = ({ children }) => {

  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("")

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        setAccessToken(
          await getAccessTokenSilently({
            authorizationParams: { audience: audience, }
          })
        );
      }
    })();
  }, [isAuthenticated, audience, getAccessTokenSilently]);

  const value = { user, isAuthenticated, isLoading, accessToken };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
};
