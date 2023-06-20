import { useEffect, useState } from "react";
import { useActiveForm } from "../../contexts/ActiveFormContext";
import { useProject } from "./index";

const NewTaskForm = ({ column, columnIndex }) => {
  const [formData, setFormData] = useState("");
  const { activeNewForm, setActiveNewForm } = useActiveForm();
  const { project, setProject } = useProject();

  // utils
  const handleChange = (event) => {
    const { value } = event.target;
    setFormData(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newState = {...project};
      newState.projectLists[columnIndex].tasks.unshift(formData);
      setProject(newState);
      setActiveNewForm("none");
    };
  };

  // effects
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