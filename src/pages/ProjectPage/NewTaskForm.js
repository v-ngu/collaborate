import { useEffect, useState } from "react";

const NewTaskForm = ({ setProject, taskFormIsActive }) => {
  const [formData, setFormData] = useState("");

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
    if (!taskFormIsActive) {
      setFormData("");
    }
  }, [taskFormIsActive])

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