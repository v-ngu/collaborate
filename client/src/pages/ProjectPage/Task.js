import dayjs from "dayjs";
import { styled } from "styled-components";
import { createPortal } from "react-dom";
import { Draggable } from "react-beautiful-dnd";
import { useTaskDrawercontext } from "../../contexts/TaskDrawerContext";
import Assignee from "./Assignee";

const Task = ({ taskObject, taskIndex, columnIndex }) => {
  const { taskId, task, dueDate } = taskObject;

  const { setIsDrawerOpen, setDrawerContent } = useTaskDrawercontext();

  const handleClick = () => {
    setIsDrawerOpen(true);
    setDrawerContent({
      taskObject: { ...taskObject },
      taskIndex: taskIndex,
      columnIndex: columnIndex,
    });
  };

  const renderComponent = (provided, snapshot) => {
    const isDragging = snapshot.isDragging;

    const child = (
      <Wrapper
        onClick={handleClick}
        ref={provided.innerRef}
        $isDragging={isDragging}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <p>{task}</p>
        <Container>
          <Assignee taskObject={taskObject} />
          <DueDate>{dueDate && dayjs(dueDate).format("MMM D, YYYY")}</DueDate>
        </Container>
      </Wrapper>
    );

    // a portal is needed to offset the transformation
    // effect during the dragging stage
    return isDragging ? createPortal(child, document.body) : child;
  };

  return (
    <Draggable draggableId={taskId} index={taskIndex}>
      {(provided, snapshot) => renderComponent(provided, snapshot)}
    </Draggable>
  );
};

export default Task;

const Wrapper = styled.div`
  border: ${({ $isDragging }) =>
    $isDragging ? "var(--dark-border)" : "var(--standard-border)"};
  border-radius: var(--large-radius);
  background-color: white;
  height: var(--task-height);
  margin: var(--small-space) 0px;
  padding: var(--small-space);

  &:hover {
    cursor: pointer;
    border: var(--dark-border);
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const DueDate = styled.p`
  margin-top: 18px;
  margin-left: var(--small-space);
  color: var(--medium-gray);
  font-size: 0.8rem;
`;
