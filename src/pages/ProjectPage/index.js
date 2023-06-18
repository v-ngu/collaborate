// import basics
import { useParams } from "react-router-dom";

// import custom hooks and contexts
import useFetch from "../../hooks/useFetch";

// import APIs
import { getProject } from "../../services/projects-api";

// import components
import LoadingCircle from "../../components/LoadingCircle";

const Project = () => {
  const { projectId } = useParams();
  const [project, isLoadingProject] = useFetch(getProject, projectId, false);
  const { _id } = project || {};

  return (
    <div>
      {
        isLoadingProject
        ? <LoadingCircle />
        : <p>{_id}</p>
      }
    </div>
  );
};

export default Project;