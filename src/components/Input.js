import { styled } from "styled-components";

const Input = (props) => {

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  };

  return (
    <CustomInput
      {...props}
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

  &:hover {
    border: 1px solid grey;
    border-radius: 5px;
  }
`;