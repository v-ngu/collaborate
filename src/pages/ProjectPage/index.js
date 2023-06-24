import { useParams } from "react-router-dom";
import { ActiveFormProvider } from "../../contexts/ActiveFormContext";
import { ProjectProvider } from "../../contexts/ProjectContext";
import { SocketProvider } from "../../contexts/SocketContext";
import Project from "./Project";

const ProjectPage = () => {
  const { projectId } = useParams();

  return (
    <ProjectProvider projectId={projectId}>
      <SocketProvider roomId={projectId}>
        <ActiveFormProvider>
          <Project />
        </ActiveFormProvider>
      </SocketProvider>
    </ProjectProvider>
  )

};

export default ProjectPage;