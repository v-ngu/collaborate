// import basics
import { styled } from "styled-components";

// import hooks and contexts
import useFetch from "../../hooks/useFetch";
import { useProjectContext } from "../../contexts/ProjectContext";
import { DragDropContext } from "react-beautiful-dnd";
import { useSocketContext } from "../../contexts/SocketContext";
import { DrawerProvider } from "../../contexts/DrawerContext";

// import components
import LoadingCircle from "../../components/LoadingCircle";
import TasksColumn from "./TasksColumn";
import TaskDrawer from "./TaskDrawer";
import TeamMembers from "./TeamMembers";

// import API
import { getTeamMembersForProject } from "../../services/users-api";

// ProjectPage component
const ProjectPage = () => {
  // states and contexts
  const { project, isLoadingProject, setProject } = useProjectContext();
  const { _id: projectId, projectLists } = project;

  const [teamMembers, _isLoadingTeamMembers, setTeamMembers] = useFetch(
    getTeamMembersForProject, projectId, isLoadingProject, []
  );

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

  // rendering
  if (isLoadingProject) return <LoadingCircle />

  return (
    <Wrapper>
      <DrawerProvider>
        <DragDropContext onDragEnd={handleDragEnd}>
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
      </DrawerProvider>
    </Wrapper>
  );
};

export default ProjectPage;

const Wrapper = styled.div`
`;
const Container = styled.div`
  display: flex;
`;