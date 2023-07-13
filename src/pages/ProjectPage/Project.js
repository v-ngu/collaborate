// import basics
import { useEffect } from "react";
import { styled } from "styled-components";
import html2canvas from "html2canvas";

// import hooks and contexts
import useHeaders from "../../hooks/useHeaders";
import { useProjectContext } from "../../contexts/ProjectContext";
import { DragDropContext } from "react-beautiful-dnd";
import { useSocketContext } from "../../contexts/SocketContext";
import { TaskDrawerProvider } from "../../contexts/TaskDrawerContext";

// import components
import LoadingCircle from "../../components/LoadingCircle";
import TransitionWrapper from "../../components/TransitionWrapper";
import TasksColumn from "./TasksColumn";
import TaskDrawer from "./TaskDrawer";
import TeamMembers from "./TeamMembers";

// import APIs and utils
import makeFetchRequest from "../../utils/make-fetch-request";
import { updateProject } from "../../services/projects-api";

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
  const { _id: projectId, projectLists } = project;

  const [headers] = useHeaders();

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
    const sourceColumnIndex = newState.projectLists.findIndex(column => column.columnId === source.droppableId);
    const sourceTasks = newState.projectLists[sourceColumnIndex].tasks;
    const task = sourceTasks.find((_task, index) => index === source.index);
    sourceTasks.splice(source.index, 1);

    // move task to new location
    const destinationColumnIndex = newState.projectLists.findIndex(column => column.columnId === destination.droppableId);
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
    const element = document.getElementById("screenshot")
    if (!element) return;

    html2canvas(element)
      .then((canvas) => {
        const base64image = canvas.toDataURL("image/png");
        const body = {
          field: "screenshot",
          data: base64image
        };

        makeFetchRequest(() => updateProject(headers, projectId, body));
      });
  }, [project])

  // rendering
  if (isLoadingProject) return <LoadingCircle />

  return (
    <TransitionWrapper>
      <TaskDrawerProvider>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Container id="screenshot">
            {projectLists.map((list, index) => (
              <TasksColumn
                key={list.columnId}
                columnId={list.columnId}
                column={list.column}
                columnIndex={index}
              />
            ))}
          </Container>
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

const Container = styled.div`
  display: flex;
`;