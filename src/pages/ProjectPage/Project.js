// import basics
import { styled } from "styled-components";

// import custom hooks and contexts
import { useProjectContext } from "../../contexts/ProjectContext";
import useSocketListeners from "../../hooks/useSocketListeners";

// import components
import LoadingCircle from "../../components/LoadingCircle";
import TasksColumn from "./TasksColumn";

// ProjectPage component
const ProjectPage = () => {
  const { project, isLoadingProject } = useProjectContext();
  const { projectLists } = project;
  
  useSocketListeners();
  
  if (isLoadingProject) return <LoadingCircle />

  return (
    <Wrapper>
      <Container>
        {projectLists.map((list, index) => (
          <TasksColumn key={list.column} column={list.column} columnIndex={index} />
        ))}
      </Container>
    </Wrapper>
  );
};

export default ProjectPage;

const Wrapper = styled.div`
`;
const Container = styled.div`
  display: flex;
`;