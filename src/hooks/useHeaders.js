// create a request headers with appropriate
// access token for authentification

import { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const useHeaders = () => {
  const [headers, setHeaders] = useState({});
  const [isLoadingHeaders, setIsLoadingHeaders] = useState(true);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: { audience: audience, }
          });

          setHeaders({
            "authorization": `Bearer ${accessToken}`,
            "content-type": "application/json",
          })

          setIsLoadingHeaders(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return [headers, isLoadingHeaders];
};

export default useHeaders;