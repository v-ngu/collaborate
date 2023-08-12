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
      <Title>{column}</Title>
      <Form>
        <NewTaskButton onClick={showNewTaskForm}>+ Add task</NewTaskButton>
        {activeNewForm === column && (
          <NewTaskForm column={column} columnIndex={columnIndex} />
        )}
      </Form>
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
  /* padding: var(--standard-space); */
  width: 275px;
  height: 100%;
  margin: var(--small-space);
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius);
`;
const Title = styled.h4`
  padding-bottom: var(--small-space);
  font-weight: 600;
`;
const Form = styled.div`
  padding: 0px var(--small-space);
`;
const NewTaskButton = styled.button`
  padding: var(--tiny-space);
  margin-bottom: var(--tiny-space);
  background-color: transparent;
  color: var(--medium-gray);
  width: 100%;
  border: none;
  cursor: pointer;

  &:hover {
    border-radius: var(--border-radius);
    background-color: var(--ultra-light-gray);
    color: var(--main-yellow);
    border: none;
  }
`;
const TaskList = styled.div`
  background-color: ${({ $isDraggingOver }) =>
    $isDraggingOver ? "var(--ultra-light-gray)" : "transparent"};
  flex-grow: 1;
  border-radius: var(--large-radius);
  padding: var(--small-space);
  padding-top: 0px;
  overflow-y: scroll;
`;
