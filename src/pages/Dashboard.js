import { useProfile } from "../contexts/ProfileContext";
import LogoutButton from "../components/buttons/LogoutButton";

const Dashboard = () => {
  const { isLoading, profile } = useProfile();
  const { email } = profile || {};

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton />
      <div>
        <h2>{email}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Dashboard;