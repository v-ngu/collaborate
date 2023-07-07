import { styled } from "styled-components";
import { useActiveFormContext } from "../../contexts/ActiveFormContext";
import { useProjectContext } from "../../contexts/ProjectContext";
import NewTaskForm from "./NewTaskForm";
import Task from "./Task";

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
      {tasks.map((task, index) => <Task key={`${column}-${index}`} task={task.content} />)}
    </Wrapper>
  );
};

export default TasksColumn;

const Wrapper = styled.div`
  padding: var(--standard-padding);
  width: 200px;
  border: solid 1px #DBDADB;
  margin: 10px;
`;