import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSocketContext } from "../../contexts/SocketContext";

const InputField = ({ data, projectId }) => {
  // state
  const field = Object.keys(data)[0];
  const originalData = data[field];
  const [formData, setFormData] = useState(originalData);

  const socket = useSocketContext();

  // utils
  const handleChange = (event) => {
    const { value } = event.target;
    setFormData(value);
  };

  const handleBlur = () => {
    if (formData === originalData) return;

    socket.emit("projects:update", {
      projectId,
      field,
      formData
    });
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  };

  // update original project state
  useEffect(() => {
    setFormData(originalData);
  }, [originalData])

  // rendering
  return (
    <Input 
      type="text"
      value={formData}
      size={formData.length + 1}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleEnter}
    />
  )
};

export default InputField;

const Input = styled.input`
  font-size: 1.375em;
  border: 1px solid transparent;
  padding: var(--tiny-padding);
  margin-left: var(--small-margin);

  &:hover {
    border: 1px solid grey;
    border-radius: 5px;
  }
`;