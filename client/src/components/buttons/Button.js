import { styled } from "styled-components";

const Button = ({ className, children, $color, handleClick }) => {
  return (
    <StyledButton onClick={handleClick} $color={$color} className={className}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
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