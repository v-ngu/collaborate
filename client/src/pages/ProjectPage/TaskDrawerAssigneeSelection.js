import { styled } from "styled-components";
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
      onChange={(event) => {
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

const Select = styled.select`
  box-sizing: border-box;
  margin-left: var(--small-space);
  padding: var(--tiny-space);
  width: 175px;
  border-radius: var(--large-radius);
  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    border: var(--standard-border);
  }
`;
