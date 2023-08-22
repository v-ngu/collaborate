// import basics
import { useEffect, useState } from "react";
import { styled } from "styled-components";

// import custom hooks and contexts
import { useActiveFormContext } from "../../contexts/ActiveFormContext";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useSocketContext } from "../../contexts/SocketContext";

// NewTaskForm component
const NewTaskForm = ({ column, columnIndex }) => {
  // states
  const [formData, setFormData] = useState("");
  const { activeNewForm, setActiveNewForm } = useActiveFormContext();

  const { project } = useProjectContext();
  const { _id: projectId } = project || {};

  const socket = useSocketContext();

  // utils
  const handleChange = (event) => {
    const { value } = event.target;
    setFormData(value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      await socket.emit("projects:add-task", {
        projectId,
        column,
        columnIndex,
        data: formData,
      });

      setActiveNewForm("none");
    }
  };

  // effect to clear the form data
  useEffect(() => {
    if (activeNewForm === "none") {
      setFormData("");
    }
  }, [activeNewForm]);

  // rendering
  return (
    <Div>
      <Textarea
        autoFocus
        value={formData}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={(event) => event.stopPropagation()}
        placeholder="What needs to be done?"
      />
    </Div>
  );
};

export default NewTaskForm;
const Div = styled.div`
  display: flex;
`;
const Textarea = styled.textarea`
  border-radius: var(--large-radius);
  background-color: rgba(173, 103, 204, 0.2);
  margin: 0px;
  margin-top: var(--small-space);
  padding: var(--small-space);
  width: 100%;
  height: var(--task-height);
`;
