import { useParams } from "react-router-dom";

const Project = () => {
  const { projectId } = useParams();

  return (
    <div>{projectId}</div>
  );
};

export default Project;