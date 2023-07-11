import { styled } from "styled-components";

const Button = ({ children, $color, handleClick }) => {
  return (
    <StyledButton onClick={handleClick} $color={$color}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  align-self: flex-start;
  padding: var(--small-padding) var(--standard-padding);
  border: none;
  border-radius: 5px;
  color: var(--gray-blue);
  background-color: ${({$color}) => $color ? $color : "var(--light-green)"};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;