import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import makeFetchRequest from "../utils/make-fetch-request";
import useHeaders from "../hooks/useHeaders";
import LogoutButton from "../components/buttons/LogoutButton";
import { createProject } from "../services/projects-api";

const Dashboard = () => {
  const [headers, isLoadingHeaders] = useHeaders();
  const { profile } = useProfile();
  const { _id: userId, email } = profile || {};

  const navigate = useNavigate();

  // utils
  const createNewProject = async (e) => {
    e.preventDefault();
    if (!isLoadingHeaders) {
      const newProjectId = await makeFetchRequest(() => createProject(headers, { userId }))
      navigate(`/project/${newProjectId}`)
    }
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