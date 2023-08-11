import { styled } from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useActiveFormContext } from "../../contexts/ActiveFormContext";
import { useProjectContext } from "../../contexts/ProjectContext";
import NewTaskForm from "./NewTaskForm";
import Task from "./Task";

const TasksColumn = ({ columnId, column, columnIndex }) => {
  const { activeNewForm, setActiveNewForm } = useActiveFormContext();
  const { project } = useProjectContext();
  const tasks = project.projectLists[columnIndex].tasks;

  // utils
  const showNewTaskForm = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setActiveNewForm(column);
  };

  return (
    <Wrapper>
      <h3>{column}</h3>
      <button onClick={showNewTaskForm}>Add issue</button>
      {
        activeNewForm === column &&
        <NewTaskForm column={column} columnIndex={columnIndex} />
      }
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            $isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {tasks.map((taskObject, index) => (
              <Task
                key={taskObject.taskId}
                taskObject={taskObject}
                taskIndex={index}
                columnIndex={columnIndex}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default TasksColumn;
const Wrapper = styled.div`
  padding: var(--standard-space);
  width: 200px;
  min-height: 200px;
  border: solid 1px #DBDADB;
  margin: var(--small-space);
  display: flex;
  flex-direction: column;
`;

const TaskList = styled.div`
  background-color: ${({ $isDraggingOver }) => $isDraggingOver ? "grey" : "transparent"};
  flex-grow: 1;
`;