import { styled } from "styled-components";

const Task = ({ task }) => {
 return (
    <Wrapper>
      <p>{task}</p>
    </Wrapper>
  );
};

export default Task;

const Wrapper = styled.div`
  border: solid 1px #DBDADB;
  background-color: white;
  margin: 10px 0px;
  padding: 5px;

  &.dragging {
    opacity: 0.5;
  }
`;