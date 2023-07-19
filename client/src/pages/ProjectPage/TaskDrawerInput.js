import { useTaskDrawercontext } from '../../contexts/TaskDrawerContext';
import Input from "../../components/Input"

const TaskDrawerInput = ({ type, field }) => {
  const {
    drawerContent: { taskObject },
    handleContentChange,
    emitUpdate
  } = useTaskDrawercontext();


  return (
    <Input
      type={type}
      value={taskObject[field]}
      onChange={(event) => handleContentChange(event, field)}
      onBlur={() => emitUpdate(field)}
    />
  );
};

export default TaskDrawerInput;