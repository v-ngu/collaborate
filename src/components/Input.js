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
  padding: var(--tiny-padding);
  margin-left: var(--small-margin);
  margin-bottom: var(--small-margin);

  &:hover {
    border: 1px solid grey;
    border-radius: 5px;
  }
`;

const Textarea = styled.textarea`
  border: 1px solid transparent;
  padding: var(--tiny-padding);
  margin-left: var(--small-margin);
  resize: none;

  &:hover {
    border: 1px solid grey;
    border-radius: 5px;
  }
`;