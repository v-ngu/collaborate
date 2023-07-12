// import basics
import { Link, useNavigate } from "react-router-dom";

// import custom hooks and contexts
import { useProfileContext } from "../contexts/ProfileContext";
import { useUserProjectsContext } from "../contexts/UserProjectsContext";
import useHeaders from "../hooks/useHeaders";

// import utils
import makeFetchRequest from "../utils/make-fetch-request";

// import APIs
import { createProject } from "../services/projects-api";

// import components
import LoadingCircle from "../components/LoadingCircle";
import TransitionWrapper from "../components/TransitionWrapper";

// Dashboard component
const Dashboard = () => {
  const [headers, isLoadingHeaders] = useHeaders();

  const { profile } = useProfileContext();
  const { _id: userId, email } = profile;

  const {
    projects,
    isLoadingProjects,
    sharedProjects,
    isLoadingSharedProjects
  } = useUserProjectsContext();

  const navigate = useNavigate();

  // utils
  const createNewProject = async (e) => {
    e.preventDefault();
    if (!isLoadingHeaders) {
      const newProjectId = await makeFetchRequest(() => createProject(headers, { userId }));
      console.log(`New project ${newProjectId} has been created`);
      navigate(`/project/${newProjectId}`);
    }
  }

  return (
    <TransitionWrapper>
      <p>{email}</p>
      <button onClick={createNewProject}>Crate a new project</button>
      <p>List of projects</p>
      {
        isLoadingProjects
          ? <LoadingCircle />
          : projects.map(project => (
            <p key={project["_id"]}><Link to={`/project/${project["_id"]}`}>{project["_id"]}</Link></p>
          ))
      }
      <p>Projects Shared with me</p>
      {
        isLoadingSharedProjects
          ? <LoadingCircle />
          : sharedProjects.map(project => (
            <p key={project["_id"]}><Link to={`/project/${project["_id"]}`}>{project["_id"]}</Link></p>
          ))
      }
    </TransitionWrapper>
  );
};

export default Dashboard;