// import basics
import { useEffect, useState } from "react";

// import custom hooks and contexts
import useHeaders from "../../hooks/useHeaders";
import { useActiveFormContext } from "../../contexts/ActiveFormContext";
import { useProjectContext } from "../../contexts/ProjectContext";

// import utils
import makeFetchRequest from "../../utils/make-fetch-request";

// api
import { addTask } from "../../services/projects-api";

// NewTaskForm component
const NewTaskForm = ({ column, columnIndex }) => {
  // states
  const [formData, setFormData] = useState("");
  const { activeNewForm, setActiveNewForm } = useActiveFormContext();

  const { project, setProject } = useProjectContext();
  const { _id: projectId } = project || {};

  const [headers, isLoadingHeaders] = useHeaders();

  // utils
  const handleChange = (event) => {
    const { value } = event.target;
    setFormData(value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const newState = { ...project };
      newState.projectLists[columnIndex].tasks.unshift(formData);
      setProject(newState);
      setActiveNewForm("none");

      if (!isLoadingHeaders) {
        const result = await makeFetchRequest(() => (
          addTask(headers, projectId, {
            column,
            body: formData
          })
        ));
        console.log(result.msg)
      }
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