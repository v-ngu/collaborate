import { useParams } from "react-router-dom";
import { ActiveFormProvider } from "../../contexts/ActiveFormContext";
import { ProjectProvider } from "../../contexts/ProjectContext";
import { SocketProvider } from "../../contexts/SocketContext";
import Project from "./Project";

const ProjectPage = () => {
  const { projectId } = useParams();

  return (
    <SocketProvider roomId={projectId}>
      <ProjectProvider projectId={projectId}>
        <ActiveFormProvider>
          <Project />
        </ActiveFormProvider>
      </ProjectProvider>
    </SocketProvider>
  )

};

export default ProjectPage;