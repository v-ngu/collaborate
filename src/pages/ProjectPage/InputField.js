import { useEffect, useState } from "react";
import Input from "../../components/Input";
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
    />
  )
};

export default InputField;