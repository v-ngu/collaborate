// import basics
import { useEffect, useState } from "react";

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
    if (event.key === 'Enter') {
      event.preventDefault();

      socket.emit("projects:add-task", {
        projectId,
        column,
        columnIndex,
        data: formData
      });

      setActiveNewForm("none");
    };
  };

  // effect to clear the form data
  useEffect(() => {
    if (activeNewForm === "none") {
      setFormData("");
    }
  }, [activeNewForm])

  // rendering
  return (
    <form>
      <textarea
        autoFocus
        value={formData}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={event => event.stopPropagation()}
        placeholder="What needs to be done?"
      />
    </form>
  );
};

export default NewTaskForm;