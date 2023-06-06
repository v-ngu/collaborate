import { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import makeFetchRequest from "../utils/make-fetch-request";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const useFetch = (api, extra) => {
  // states
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  
  // effect: the access token is retreived from Auth0 for 
  // authentification before making a fetch request to the server
  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: { audience: audience, }
        });
        const headers = {
          "authorization": `Bearer ${accessToken}`,
          "content-type": "application/json",
        };

        const data = await makeFetchRequest(() => api(headers, extra));

        setState(data);
        setIsLoading(false);
      }
    })();
  }, [isAuthenticated, api, getAccessTokenSilently]);

  return ([state, isLoading, setState]);
};

export default useFetch;