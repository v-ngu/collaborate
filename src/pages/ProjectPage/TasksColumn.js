import { useActiveForm } from "../../contexts/ActiveFormContext";
import NewTaskForm from "./NewTaskForm";

const TasksColumn = ({ setProject }) => {
  const { activeNewForm, setActiveNewForm } = useActiveForm();
  
  // utils
  const showNewTaskForm = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setActiveNewForm(true);
  };

  return (
    <div>
      <p>Task Column</p>
      <button onClick={showNewTaskForm}>Add issue</button>
      {
        activeNewForm !== "none" &&
        <NewTaskForm
          setProject={setProject}
        />
      }
    </div>
  );
};

export default TasksColumn;