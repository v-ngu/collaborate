// import basics
import { useParams } from "react-router-dom";

// import custom hooks and contexts
import useFetch from "../hooks/useFetch";

// import APIs
import { getProject } from "../services/projects-api";

const Project = () => {
  const { projectId } = useParams();
  const [project, isLoadingProject] = useFetch(getProject, projectId, false);
  const { _id } = project || {};

  return (
    <div>{_id} taken from db</div>
  );
};

export default Project;