// import basics
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import custom hooks and contexts
import useFetch from "../../hooks/useFetch";

// import APIs
import { getProject } from "../../services/projects-api";

// import components
import LoadingCircle from "../../components/LoadingCircle";
import NewTaskForm from "./NewTaskForm";

// ProjectPage component
const ProjectPage = () => {
  const { projectId } = useParams();
  const [project, isLoadingProject, setProject] = useFetch(getProject, projectId, false);
  const { _id } = project || {};

  const [taskFormIsActive, setTaskFormIsActive] = useState(false);

  // utils
  const showNewTaskForm = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setTaskFormIsActive(true);
  };

  // effects
  useEffect(() => {
    const onBackDropClick = () => {
      setTaskFormIsActive(false);
    };

    window.addEventListener("click", onBackDropClick)
    return () => window.removeEventListener("click", onBackDropClick);
  }, []);

  // conditional rendering
  if (isLoadingProject) return <LoadingCircle />

  return (
    <div>
      <p>{_id}</p>
      <div>
        <p>Task Column</p>
        <button onClick={showNewTaskForm}>Add issue</button>
        {
          taskFormIsActive &&
          <NewTaskForm
            setProject={setProject}
            taskFormIsActive={taskFormIsActive}
          />
        }
      </div>
    </div>
  );
};

export default ProjectPage;