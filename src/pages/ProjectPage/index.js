import { useParams } from "react-router-dom";
import { ActiveFormProvider } from "../../contexts/ActiveFormContext";
import { ProjectProvider } from "../../contexts/ProjectContext";
import Project from "./Project";

const ProjectPage = () => {
  const { projectId } = useParams();

  return (
    <ProjectProvider projectId={projectId}>
      <ActiveFormProvider>
        <Project />
      </ActiveFormProvider>
    </ProjectProvider>
  )

};

export default ProjectPage;