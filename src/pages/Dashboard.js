import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import LogoutButton from "../components/buttons/LogoutButton";

const Dashboard = () => {
  // get current user profile information
  const { isLoading, profile } = useProfile();
  const { email } = profile || {};

  const navigate = useNavigate();

  // utils
  const createNewProject = (e) => {
    e.preventDefault();
    navigate(`/new/project`)
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton />
      <div>
        <p>{email}</p>
        <button onClick={createNewProject}>Crate a new project</button>
      </div>
    </div>
  );
};

export default Dashboard;