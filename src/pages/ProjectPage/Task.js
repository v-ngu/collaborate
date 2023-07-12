import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useTaskDrawercontext } from "../../contexts/TaskDrawerContext";

const Task = ({ taskObject, index }) => {
  const { 
    taskId, 
    task,
    assignee,
    dueDate
  } = taskObject;
  
  const { setIsDrawerOpen, setDrawerContent } = useTaskDrawercontext();

  const handleClick = () => {
    setIsDrawerOpen(true);
    setDrawerContent(taskObject);
  };

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
          onClick={handleClick}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{task}</p>
          <p>{assignee}</p>
          <p>{dueDate}</p>
        </Wrapper>
      )}
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