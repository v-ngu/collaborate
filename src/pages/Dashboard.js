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
    setReloadProjects,
    sharedProjects,
    isLoadingSharedProjects,
    setReloadSharedProjects
  } = useUserProjectsContext();

  const navigate = useNavigate();

  // utils
  const createNewProject = async (e) => {
    e.preventDefault();
    if (!isLoadingHeaders) {
      const newProjectId = await makeFetchRequest(() => createProject(headers, { userId }));
      console.log(`New project ${newProjectId} has been created`);
      setReloadProjects(prevState => !prevState);
      setReloadSharedProjects(prevState => !prevState);
      navigate(`/project/${newProjectId}`);
    }
  };

  return (
    <TransitionWrapper>
      <p>{email}</p>
      <button onClick={createNewProject}>Crate a new project</button>
      <p>List of projects</p>
      {
        isLoadingProjects
          ? <LoadingCircle />
          : projects.map(project => (
            <div key={project["_id"]}>
              <p><Link to={`/project/${project["_id"]}`}>{project["_id"]}</Link></p>
              <img src={project.screenshot} alt=""/>
            </div>
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