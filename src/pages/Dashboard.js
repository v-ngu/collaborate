// import basics
import { Link, useNavigate } from "react-router-dom";

// import custom hooks and contexts
import { useProfile } from "../contexts/ProfileContext";
import useHeaders from "../hooks/useHeaders";
import useFetch from "../hooks/useFetch";

// import utils
import makeFetchRequest from "../utils/make-fetch-request";

// import APIs
import { createProject, getAllProjectsFromUser } from "../services/projects-api";

// import components
import LogoutButton from "../components/buttons/LogoutButton";
import LoadingCircle from "../components/LoadingCircle";

// Dashboard component
const Dashboard = () => {
  const [headers, isLoadingHeaders] = useHeaders();

  const { profile, isLoadingProfile } = useProfile();
  const { _id: userId, email } = profile || {};

  const [projects, isLoadingProjects] = useFetch(getAllProjectsFromUser, userId, isLoadingProfile)

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
        <p>List of projects</p>
        {
          isLoadingProjects 
          ? <LoadingCircle />
          : projects.map(project =>
              (<p><Link key={project["_id"]} to={`/project/${project["_id"]}`}>{project["_id"]}</Link></p>)
            )
        }
      </div>
    </div>
  );
};

export default Dashboard;