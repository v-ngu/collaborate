import { styled } from "styled-components";

const Input = ({ type, ...props }) => {

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  };

  if (type === "textarea") {
    return (
      <Textarea
        {...props}
        onKeyDown={handleEnter}
      />
    );
  };

  return (
    <CustomInput
      {...props}
      type={type}
      onKeyDown={handleEnter}
    />
  );
};

export default Input;

const CustomInput = styled.input`
  font-size: 1.375em;
  border: 1px solid transparent;
  padding: var(--tiny-space);
  margin-left: var(--small-space);

  &:hover {
    border: var(--standard-border);
    border-radius: var(--border-radius);
  }
`;

const Textarea = styled.textarea`
  border: 1px solid transparent;
  padding: var(--tiny-space);
  margin-left: var(--small-space);
  resize: none;
  width: 93%;

  &:hover {
    border: var(--standard-border);
    border-radius: var(--border-radius);
  }
`;