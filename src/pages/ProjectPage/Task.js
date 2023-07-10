import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useDrawercontext } from "../../contexts/DrawerContext";

const Task = ({ taskObject, index }) => {
  const { 
    taskId, 
    task,
    assignee,
    dueDate
  } = taskObject;
  
  const { setIsDrawerOpen, setDrawerContent } = useDrawercontext();

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
  border: ${({ $isDragging }) => $isDragging ? 'solid 1px grey' : 'solid 1px #DBDADB'};
  background-color: white;
  margin: 10px 0px;
  padding: 5px;

  &:hover {
    cursor: pointer;
    border: solid 1px grey;
  }
`;