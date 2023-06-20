import { styled } from "styled-components";
import { useActiveFormContext } from "../../contexts/ActiveFormContext";
import { useProjectContext } from "./index";
import NewTaskForm from "./NewTaskForm";

const TasksColumn = ({ column, columnIndex }) => {
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
      {tasks.map((task, index) => <p key={`${column}-${index}`}>{task}</p>)}
    </Wrapper>
  );
};

export default TasksColumn;

const Wrapper = styled.div`
  padding: var(--standard-padding);
`;