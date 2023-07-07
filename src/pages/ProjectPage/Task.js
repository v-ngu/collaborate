import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  const { taskId, content } = task;

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
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