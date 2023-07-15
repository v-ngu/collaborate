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
import TeamMembers from "./TeamMembers";
import Toolbar from "../../components/Toolbar";
import InputField from "./InputField";
import ProjectIcon from "../../components/ProjectIcon";

// ProjectPage component
const ProjectPage = () => {
  // states and contexts
  const {
    project,
    isLoadingProject,
    setProject,
    teamMembers,
    setTeamMembers
  } = useProjectContext();
  // states
  const {
    _id: projectId,
    projectName,
    projectColor,
    projectLists
  } = project;

  const [headers] = useHeaders();
  const { setReloadProjects } = useUserProjectsContext();

  const socket = useSocketContext();

  // utils
  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const noChange = (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    );

    if (noChange) return;

    const newState = { ...project };

    // remove task from initial list
    const sourceColumnIndex = (
      newState.projectLists.findIndex(column => (
        column.columnId === source.droppableId
      ))
    );

    const sourceTasks = newState.projectLists[sourceColumnIndex].tasks;
    const task = sourceTasks.find((_task, index) => index === source.index);
    sourceTasks.splice(source.index, 1);

    // move task to new location
    const destinationColumnIndex = (
      newState.projectLists.findIndex(column => (
        column.columnId === destination.droppableId
      ))
    );

    const destinationTasks = newState.projectLists[destinationColumnIndex].tasks;
    destinationTasks.splice(destination.index, 0, task)
    setProject(newState);

    // emit event to server to update db
    socket.emit("projects:task-dragged", {
      projectId,
      projectLists: newState.projectLists
    })
  };

  // take a screenshot of the project and save it to the db
  useEffect(() => {
    (async () => {
      await takeScreenshot(headers, projectId);
      setReloadProjects(prevState => !prevState);
    })();
  }, [project, setReloadProjects, headers, projectId])

  // rendering
  if (isLoadingProject) return <LoadingCircle />

  return (
    <TransitionWrapper>
      <TaskDrawerProvider>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div id="screenshot">
            <ProjectToolbar>
              <Container>
                <ProjectIcon color={projectColor} size="large" />
                <InputField
                  type="text"
                  projectId={projectId}
                  data={{projectName: projectName}}
                />
              </Container>
            </ProjectToolbar>
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
          </div>
        </DragDropContext>
        <div>
          <p>Team Members</p>
          <TeamMembers
            projectId={projectId}
            teamMembers={teamMembers}
            setTeamMembers={setTeamMembers}
          />
        </div>
        <TaskDrawer />
      </TaskDrawerProvider>
    </TransitionWrapper>
  );
};

export default ProjectPage;

const ProjectToolbar = styled(Toolbar)`
  padding: var(--tiny-padding) var(--standard-padding);
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;