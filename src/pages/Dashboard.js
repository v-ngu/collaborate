import { useProfile } from "../contexts/ProfileContext";
import LogoutButton from "../components/buttons/LogoutButton";

const Dashboard = () => {
  const { user, isLoading, profile } = useProfile();
  console.log(profile)

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