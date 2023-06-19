import { useActiveForm } from "../../contexts/ActiveFormContext";
import NewTaskForm from "./NewTaskForm";

const TasksColumn = ({ column }) => {
  const { activeNewForm, setActiveNewForm } = useActiveForm();

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
        <NewTaskForm />
      }
    </div>
  );
};

export default TasksColumn;