import { useActiveFormContext } from "../../contexts/ActiveFormContext";
import NewTaskForm from "./NewTaskForm";

const TasksColumn = ({ column, columnIndex }) => {
  const { activeNewForm, setActiveNewForm } = useActiveFormContext();

  // utils
  const showNewTaskForm = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setActiveNewForm(column);
  };

  return (
    <div>
      <h3>{column}</h3>
      <button onClick={showNewTaskForm}>Add issue</button>
      {
        activeNewForm === column &&
        <NewTaskForm column={column} columnIndex={columnIndex}/>
      }
    </div>
  );
};

export default TasksColumn;