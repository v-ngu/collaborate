import Select from "../../components/Select";
import { useTaskDrawercontext } from "../../contexts/TaskDrawerContext";

const TaskDrawerPriority = () => {
  const {
    drawerContent: { taskObject },
    handleContentChange,
    emitUpdate,
  } = useTaskDrawercontext();

  return (
    <Select 
      value={taskObject.priority}
      handleChange={(event) => {
        handleContentChange(event, "priority");
        emitUpdate("priority");
      }}
    >
      <option value="">No priority</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </Select>
  );
};

export default TaskDrawerPriority;
