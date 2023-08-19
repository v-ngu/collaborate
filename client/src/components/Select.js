import { styled } from "styled-components";

const Select = ({ children, value, handleChange }) => {
  return (
    <CustomSelect value={value} onChange={handleChange}>
      {children}
    </CustomSelect>
  );
};

export default Select;

const CustomSelect = styled.select`
  box-sizing: border-box;
  margin-left: var(--small-space);
  padding: var(--tiny-space);
  width: 175px;
  border-radius: var(--large-radius);
  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    border: var(--standard-border);
  }
`;
