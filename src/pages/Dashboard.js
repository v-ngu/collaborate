import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import LogoutButton from "../components/buttons/LogoutButton";
import makeFetchRequest from "../services/make-fetch-request";
import { getPrivate } from "../services/api";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  useEffect(() => {
    (async() => {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: audience,
        },
      })
      const privateData = await makeFetchRequest(getPrivate, accessToken);
      console.log(privateData)
    })();
  }, [audience, getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton />
      {
        isAuthenticated &&
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
      }
    </div>
  );
};

export default Dashboard;