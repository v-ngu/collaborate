// import basics
import { useEffect } from "react";
import { styled } from "styled-components";

// import utils
import takeScreenshot from "../../utils/take-screenshot";

// import hooks and contexts
import useHeaders from "../../hooks/useHeaders";
import { useProjectContext } from "../../contexts/ProjectContext";
import { DragDropContext } from "react-beautiful-dnd";
import { useSocketContext } from "../../contexts/SocketContext";
import { TaskDrawerProvider } from "../../contexts/TaskDrawerContext";
import { useUserProjectsContext } from "../../contexts/UserProjectsContext";

// import components
import LoadingCircle from "../../components/LoadingCircle";
import TransitionWrapper from "../../components/TransitionWrapper";
import TasksColumn from "./TasksColumn";
import TaskDrawer from "./TaskDrawer";
import ProjectToolbar from "./ProjectToolbar";

// ProjectPage component
const ProjectPage = () => {
  // states and contexts
  const { project, isLoadingProject, setProject } = useProjectContext();
  const { _id: projectId, projectLists } = project;

  const [headers] = useHeaders();
  const { setReloadProjects } = useUserProjectsContext();

  const socket = useSocketContext();

  // utils
  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const noChange =
      destination.droppableId === source.droppableId &&
      destination.index === source.index;

    if (noChange) return;

    const newState = { ...project };

    // remove task from initial list
    const sourceColumnIndex = newState.projectLists.findIndex(
      (column) => column.columnId === source.droppableId
    );

    const sourceTasks = newState.projectLists[sourceColumnIndex].tasks;
    const task = sourceTasks.find((_task, index) => index === source.index);
    sourceTasks.splice(source.index, 1);

    // move task to new location
    const destinationColumnIndex = newState.projectLists.findIndex(
      (column) => column.columnId === destination.droppableId
    );

    const destinationTasks =
      newState.projectLists[destinationColumnIndex].tasks;
    destinationTasks.splice(destination.index, 0, task);
    setProject(newState);

    // emit event to server to update db
    socket.emit("projects:task-dragged", {
      projectId,
      projectLists: newState.projectLists,
    });
  };

  // take a screenshot of the project and save it to the db
  useEffect(() => {
    (async () => {
      await takeScreenshot(headers, projectId);
      setReloadProjects((prevState) => !prevState);
    })();
  }, [project, setReloadProjects, headers, projectId]);

  // rendering
  if (isLoadingProject) {
    return (
      <Container>
        <LoadingCircle />
      </Container>
    );
  }

  return (
    <TransitionWrapper>
      <TaskDrawerProvider>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Div id="screenshot">
            <ProjectToolbar />
            <Container>
              {projectLists.map((list, index) => (
                <TasksColumn
                  key={list.columnId}
                  columnId={list.columnId}
                  column={list.column}
                  columnIndex={index}
                />
              ))}
            </Container>
          </Div>
        </DragDropContext>
        <TaskDrawer />
      </TaskDrawerProvider>
    </TransitionWrapper>
  );
};

export default ProjectPage;
const Div = styled.div`
  height: 100%;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  height: calc(100% - 90px);
`;
