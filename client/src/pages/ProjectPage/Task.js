import { styled } from "styled-components";
import { createPortal } from 'react-dom';
import { Draggable } from "react-beautiful-dnd";
import { useTaskDrawercontext } from "../../contexts/TaskDrawerContext";

const Task = ({ taskObject, taskIndex, columnIndex }) => {
  const {
    taskId,
    task,
    assignee,
    dueDate
  } = taskObject;

  const { setIsDrawerOpen, setDrawerContent } = useTaskDrawercontext();

  const handleClick = () => {
    setIsDrawerOpen(true);
    setDrawerContent({
      taskObject: { ...taskObject },
      taskIndex: taskIndex,
      columnIndex: columnIndex
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
        <p>{assignee}</p>
        <p>{dueDate}</p>
      </Wrapper>
    );

    // a portal is needed to offset the transformation
    // effect during the dragging stage
    return (
      isDragging
        ? createPortal(child, document.body)
        : child
    );
  };

  return (
    <Draggable draggableId={taskId} index={taskIndex}>
      {(provided, snapshot) => renderComponent(provided, snapshot)}
    </Draggable>
  );
};

export default Task;

const Wrapper = styled.div`
  border: ${({ $isDragging }) => $isDragging ? 'solid 1px grey' : 'solid 1px var(--light-gray)'};
  background-color: white;
  margin: 10px 0px;
  padding: 5px;

  &:hover {
    cursor: pointer;
    border: solid 1px grey;
  }
`;