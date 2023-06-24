// import basics
import { styled } from "styled-components";

// import custom hooks and contexts
import { useProjectContext } from "../../contexts/ProjectContext";
import { useSocketContext } from "../../contexts/SocketContext";

// import components
import LoadingCircle from "../../components/LoadingCircle";
import TasksColumn from "./TasksColumn";
import { useEffect } from "react";

// ProjectPage component
const ProjectPage = () => {
  const { project, isLoadingProject } = useProjectContext();
  const { projectLists } = project;
  const socket = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    const onJoined = (roomId) => console.log("It works");
    const onConnectError = (error) => console.log(error.message);

    socket.on("joined", onJoined);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("joined", onJoined)
      socket.off("connect_error", onConnectError)
    };
  }, [socket])
  
  
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