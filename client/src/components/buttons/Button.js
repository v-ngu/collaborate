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
  padding: 10px var(--standard-space);
  border: none;
  border-radius: var(--border-radius);
  color: var(--main-gray);
  background-color: ${({$color}) => $color ? $color : "var(--main-yellow)"};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;