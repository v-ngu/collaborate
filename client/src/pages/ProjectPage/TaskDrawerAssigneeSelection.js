import Select from "../../components/Select";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useTaskDrawercontext } from "../../contexts/TaskDrawerContext";

const TaskDrawerAssigneeSelection = () => {
  const { teamMembers } = useProjectContext();
  const {
    drawerContent: { taskObject },
    handleContentChange,
    emitUpdate,
  } = useTaskDrawercontext();

  return (
    <Select
      value={taskObject.assignee}
      handleChange={(event) => {
        console.log("printing")
        handleContentChange(event, "assignee");
        emitUpdate("assignee");
      }}
    >
      <option value="">No assignee</option>
      {teamMembers.map((teamMember) => {
        const { _id, firstName, lastName, isOwner, isAuthorized } = teamMember;

        if (!isAuthorized && !isOwner) return null;

        return (
          <option key={`task-assignee${_id}`} value={_id}>
            {firstName} {lastName}
          </option>
        );
      })}
    </Select>
  );
};

export default TaskDrawerAssigneeSelection;
