// import basics
import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

// import custom hooks and contexts
import useFetch from "../../hooks/useFetch";
import { ActiveFormProvider } from "../../contexts/ActiveFormContext";

// import APIs
import { getProject } from "../../services/projects-api";

// import components
import LoadingCircle from "../../components/LoadingCircle";
import TasksColumn from "./TasksColumn";

// create ProjectContext and its custom hook
const ProjectContext = createContext(null);
export const useProject = () => useContext(ProjectContext);

// ProjectPage component
const ProjectPage = () => {
  const { projectId } = useParams();
  const [project, isLoadingProject, setProject] = useFetch(getProject, projectId, false);
  const { _id } = project || {};

  if (isLoadingProject) return <LoadingCircle />

  return (
    <Wrapper>
      <p>{_id}</p>
      <ProjectContext.Provider value={{ project, setProject }}>
        <ActiveFormProvider>
          <Container>
            <TasksColumn />
            <TasksColumn />
          </Container>
        </ActiveFormProvider>
      </ProjectContext.Provider>
    </Wrapper>
  );
};

export default ProjectPage;

const Wrapper = styled.div`
`;
const Container = styled.div`
  display: flex;
`;