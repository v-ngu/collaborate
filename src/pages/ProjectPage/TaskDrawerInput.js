import { useTaskDrawercontext } from '../../contexts/TaskDrawerContext';
import { useProjectContext } from '../../contexts/ProjectContext';
import { useSocketContext } from '../../contexts/SocketContext';
import Input from "../../components/Input"

const TaskDrawerInput = ({ type, field }) => {
  const { project: { _id: projectId, projectLists } } = useProjectContext();

  const { drawerContent, setDrawerContent } = useTaskDrawercontext();
  const { taskIndex, columnIndex, taskObject } = drawerContent;

  const originalContent = (
    projectLists[columnIndex].tasks[taskIndex][field]
  );

  const socket = useSocketContext();

  const handleChange = (event) => {
    const { value } = event.target;
    const newState = { ...drawerContent };
    newState.taskObject[field] = value;
    setDrawerContent(newState);
  };

  const handleBlur = () => {
    if (originalContent === taskObject[field]) return;
    
    // !! projectLists is an array and not an object
    const data = [ ...projectLists ]; 
    data[columnIndex].tasks[taskIndex] = taskObject;

    socket.emit("projects:update", {
      projectId,
      field: "projectLists",
      formData: data
    });
  };

  return (
    <Input
      type={type}
      value={taskObject[field]}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default TaskDrawerInput;