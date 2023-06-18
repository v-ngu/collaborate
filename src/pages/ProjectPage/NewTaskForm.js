import { useEffect, useState } from "react";
import { useActiveForm } from "../../contexts/ActiveFormContext";
import { useProject } from "./index";

const NewTaskForm = () => {
  const [formData, setFormData] = useState("");
  const { activeNewForm } = useActiveForm();
  const { setProject } = useProject();

  // utils
  const handleChange = (event) => {
    const { value } = event.target;
    setFormData(value);
  };

  const handleClick = (event) => {
    event.stopPropagation();
  }

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
        onClick={handleClick}
        placeholder="What needs to be done?"
      />
    </form>
  );
};

export default NewTaskForm;