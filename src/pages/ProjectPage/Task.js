import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useDrawercontext } from "../../contexts/DrawerContext";

const Task = ({ task, index }) => {
  const { taskId, content } = task;
  const { setIsDrawerOpen, setDrawerContent } = useDrawercontext();

  const handleClick = () => {
    setIsDrawerOpen(true);
    setDrawerContent(content);
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
          <p>{content}</p>
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