import { useEffect } from "react";

import { useProfile } from "../contexts/ProfileContext";

import LogoutButton from "../components/buttons/LogoutButton";
import makeFetchRequest from "../services/make-fetch-request";
import { getPrivate } from "../services/api";

const Dashboard = () => {
  const { user, isLoading, accessToken } = useProfile();
  
  useEffect(() => {
    (async () => {
      if (accessToken) {
        const privateData = await makeFetchRequest(getPrivate, accessToken);
        console.log(privateData)
      }
    })();
  }, [accessToken]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton />
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;